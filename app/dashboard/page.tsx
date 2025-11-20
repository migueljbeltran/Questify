"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

type Chore = {
  id: string;
  title: string;
  description: string | null;
  base_xp: number;
  is_active?: boolean;
};

type Completion = {
  id: string;
  xp_awarded: number;
  completed_at: string;
  chores?: {
    title: string;
  } | null;
};

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [xp, setXp] = useState(0);
  const [chores, setChores] = useState<Chore[]>([]);
  const [recentCompletions, setRecentCompletions] = useState<Completion[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [baseXp, setBaseXp] = useState(10);
  const [message, setMessage] = useState<string | null>(null);

  function computeLevel(xp: number): number {
    return Math.floor(Math.sqrt(xp / 10)) + 1;
  }

  function xpForLevel(level: number): number {
    return level * level * 20;
  }

  async function fetchChores(userId: string) {
    const { data, error } = await supabase
      .from("chores")
      .select("id, title, description, base_xp")
      .eq("user_id", userId)
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }
    setChores(data || []);
  }

  async function fetchRecentCompletions(userId: string) {
    const { data, error } = await supabase
      .from("chore_completions")
      .select(
        `
      id,
      xp_awarded,
      completed_at,
      chores:chore_id (
        title
      )
    `
      )
      .eq("user_id", userId)
      .order("completed_at", { ascending: false })
      .limit(5);

    if (error) {
      console.error(error);
      // Consider throwing the error or returning an empty array to handle it in the calling code
      return;
    }

    // Map the data to flatten the nested 'chores' object for easier use
    // Map the data to flatten the nested 'chores' object for easier use
    const formattedData =
      data?.map((completion) => ({
        id: completion.id,
        xp_awarded: completion.xp_awarded,
        completed_at: completion.completed_at,
        chores:
          completion.chores && completion.chores.length > 0
            ? { title: completion.chores[0].title }
            : null,
      })) ?? [];

    setRecentCompletions(formattedData);

    setRecentCompletions(formattedData);
  }

  useEffect(() => {
    async function init() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (!profile) {
        const { data: created, error: insertError } = await supabase
          .from("profiles")
          .insert({
            id: user.id,
            display_name: user.email,
            xp: 0,
          })
          .select()
          .single();

        // FIX: Log the readable message property
        if (insertError) {
          console.error("Supabase Insert Error:", insertError.message);
          // Optional: Log the full object for deep debugging
          console.error(insertError);
        }
        setXp(created?.xp ?? 0);
      } else {
        setXp(profile.xp ?? 0);
      }

      await fetchChores(user.id);
      await fetchRecentCompletions(user.id);

      setLoading(false);
    }

    init();
  }, [router]);

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
        is_active: true,
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

  // app/dashboard/page.tsx

  async function handleCompleteChore(chore: Chore) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const xpAwarded = chore.base_xp;

    // 1. INSERT the completion record (You already had this)
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

    // 🔑 2. FIX: Deactivate the chore in the 'chores' table
    const { error: deactivateError } = await supabase
      .from("chores")
      .update({ is_active: false }) // <--- THIS IS THE CRITICAL LINE
      .eq("id", chore.id);

    if (deactivateError) {
      console.error(deactivateError);
      // Note: You might want to revert the completion insert here for robustness
      setMessage("Error deactivating chore.");
      return;
    }

    // 3. Update the user's XP (You already had this)
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

    // 4. Update local state
    setXp(updatedProfile.xp);
    setMessage(`Completed "${chore.title}"! +${xpAwarded} XP`);

    // This line is correct: it removes the chore from the UI immediately.
    setChores((prev) => prev.filter((c) => c.id !== chore.id));

    // This line is correct: it updates the Recent Completions list.
    await fetchRecentCompletions(user.id);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/");
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-50">
        <p>Loading your quests...</p>
      </main>
    );
  }

  const level = computeLevel(xp);
  const currentLevelXpFloor = xpForLevel(level - 1);
  const nextLevelXpRequired = xpForLevel(level);
  const xpInLevel = xp - currentLevelXpFloor;
  const xpLevelSpan = Math.max(nextLevelXpRequired - currentLevelXpFloor, 1);
  const progressPercent = Math.min(
    100,
    Math.max(0, (xpInLevel / xpLevelSpan) * 100)
  );
  const xpToNext = Math.max(0, nextLevelXpRequired - xp);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900">
        <div>
          <h1 className="text-xl font-bold">Questify</h1>
          <p className="text-xs text-slate-400">
            Turn your chores into XP and levels.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="space-y-1 text-right">
            <div className="text-sm font-semibold">Level {level}</div>
            <div className="text-xs text-slate-400">
              XP: {xp} ({xpToNext} to next)
            </div>
            <div className="w-40 h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-1.5 rounded-full bg-gradient-to-r from-sky-400 to-emerald-400"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-xs px-3 py-1 rounded-md border border-slate-700 hover:bg-slate-800"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {message && (
          <div className="text-xs rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-slate-300">
            {message}
          </div>
        )}

        <section className="space-y-3 border border-slate-800 bg-slate-900 rounded-xl p-4">
          <h2 className="text-sm font-semibold">Add a new quest</h2>
          <form onSubmit={handleAddChore} className="space-y-2">
            <input
              className="w-full rounded-md bg-slate-950 border border-slate-700 px-3 py-2 text-sm outline-none focus:border-sky-500"
              placeholder="Quest title (e.g., Wash dishes)"
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
              Add quest
            </button>
          </form>
        </section>

        <div className="grid gap-6 md:grid-cols-3">
          <section className="space-y-3 md:col-span-2">
            <h2 className="text-sm font-semibold">Your active quests</h2>
            {chores.length === 0 ? (
              <p className="text-xs text-slate-500">
                No quests yet. Add one above to get started.
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

          <section className="space-y-3">
            <h2 className="text-sm font-semibold">Recent completions</h2>
            {recentCompletions.length === 0 ? (
              <p className="text-xs text-slate-500">
                Complete a quest to see it here.
              </p>
            ) : (
              <ul className="space-y-2 text-xs">
                {recentCompletions.map((c) => (
                  <li
                    key={c.id}
                    className="border border-slate-800 bg-slate-900 rounded-lg px-3 py-2"
                  >
                    <p className="font-medium">
                      {c.chores?.title ?? "Quest completed"}
                    </p>
                    <p className="text-slate-400">
                      +{c.xp_awarded} XP •{" "}
                      {new Date(c.completed_at).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
