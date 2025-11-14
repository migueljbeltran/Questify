"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

type Chore = {
  id: string;
  title: string;
  description: string | null;
  base_xp: number;
};

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [xp, setXp] = useState(0);
  const [chores, setChores] = useState<Chore[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [baseXp, setBaseXp] = useState(10);
  const [message, setMessage] = useState<string | null>(null);

  async function fetchChores() {
    const { data, error } = await supabase
      .from("chores")
      .select("id, title, description, base_xp")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }
    setChores(data || []);
  }

  useEffect(() => {
    async function init() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.replace("/");
        return;
      }

      // ensure profile exists
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (!profile) {
        const { data } = await supabase
          .from("profiles")
          .insert({ id: user.id, display_name: user.email, xp: 0 })
          .select()
          .single();
        setXp(data?.xp ?? 0);
      } else {
        setXp(profile.xp ?? 0);
      }

      await fetchChores();
      setLoading(false);
    }

    init();
  }, [router]);

  function computeLevel(xp: number): number {
    return Math.floor(Math.sqrt(xp / 10)) + 1;
  }

  async function handleAddChore(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("chores")
      .insert({
        user_id: user.id,
        title: title.trim(),
        description: description.trim() || null,
        base_xp: baseXp,
      })
      .select("id, title, description, base_xp")
      .single();

    if (error) {
      console.error(error);
      setMessage("Error creating chore.");
      return;
    }

    setChores((prev) => [data, ...prev]);
    setTitle("");
    setDescription("");
    setBaseXp(10);
    setMessage("Chore added.");
  }

  async function handleCompleteChore(chore: Chore) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const xpAwarded = chore.base_xp;

    const { error: completionError } = await supabase
      .from("chore_completions")
      .insert({
        chore_id: chore.id,
        user_id: user.id,
        xp_awarded: xpAwarded,
      });

    if (completionError) {
      console.error(completionError);
      setMessage("Error completing chore.");
      return;
    }

    const { data: updatedProfile, error: xpError } = await supabase
      .from("profiles")
      .update({ xp: xp + xpAwarded })
      .eq("id", user.id)
      .select("xp")
      .single();

    if (xpError || !updatedProfile) {
      console.error(xpError);
      setMessage("Error updating XP.");
      return;
    }

    setXp(updatedProfile.xp);
    setMessage(`Completed "${chore.title}"! +${xpAwarded} XP`);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/");
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-50">
        <p>Loading your chores...</p>
      </main>
    );
  }

  const level = computeLevel(xp);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900">
        <div>
          <h1 className="text-xl font-bold">ChoreQuest</h1>
          <p className="text-xs text-slate-400">
            Turn your chores into XP and levels.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm font-semibold">Level {level}</div>
            <div className="text-xs text-slate-400">XP: {xp}</div>
          </div>
          <button
            onClick={handleLogout}
            className="text-xs px-3 py-1 rounded-md border border-slate-700 hover:bg-slate-800"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {message && (
          <div className="text-xs rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-slate-300">
            {message}
          </div>
        )}

        <section className="space-y-3 border border-slate-800 bg-slate-900 rounded-xl p-4">
          <h2 className="text-sm font-semibold">Add a new chore</h2>
          <form onSubmit={handleAddChore} className="space-y-2">
            <input
              className="w-full rounded-md bg-slate-950 border border-slate-700 px-3 py-2 text-sm outline-none focus:border-sky-500"
              placeholder="Chore title (e.g., Wash dishes)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="w-full rounded-md bg-slate-950 border border-slate-700 px-3 py-2 text-sm outline-none focus:border-sky-500"
              placeholder="Optional description..."
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex items-center gap-2">
              <label className="text-xs text-slate-400">Base XP:</label>
              <input
                type="number"
                min={1}
                max={1000}
                className="w-20 rounded-md bg-slate-950 border border-slate-700 px-2 py-1 text-sm outline-none focus:border-sky-500"
                value={baseXp}
                onChange={(e) => setBaseXp(Number(e.target.value) || 0)}
              />
            </div>
            <button
              type="submit"
              className="rounded-md bg-sky-600 hover:bg-sky-500 px-4 py-2 text-sm font-medium"
            >
              Add chore
            </button>
          </form>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold">Your chores</h2>
          {chores.length === 0 ? (
            <p className="text-xs text-slate-500">
              No chores yet. Add one above to get started.
            </p>
          ) : (
            <ul className="space-y-2">
              {chores.map((chore) => (
                <li
                  key={chore.id}
                  className="flex items-center justify-between border border-slate-800 bg-slate-900 rounded-lg px-3 py-2"
                >
                  <div>
                    <p className="text-sm font-medium">{chore.title}</p>
                    {chore.description && (
                      <p className="text-xs text-slate-400">
                        {chore.description}
                      </p>
                    )}
                    <p className="text-[10px] text-slate-500 mt-1">
                      {chore.base_xp} XP
                    </p>
                  </div>
                  <button
                    onClick={() => handleCompleteChore(chore)}
                    className="text-xs px-3 py-1 rounded-md bg-emerald-600 hover:bg-emerald-500"
                  >
                    Complete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
