import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Database } from "@/lib/database.types";

type CompletionWithChore =
  Database["public"]["Tables"]["chore_completions"]["Row"] & {
    chores: { title: string } | null;
  };

function calculateLevel(xp: number): number {
  return Math.floor(Math.sqrt(xp / 100)) || 1;
}

function xpForLevel(level: number): number {
  return level * level * 100;
}

export default async function StatsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  // Fetch user profile and completions
  const [profileResult, choresResult, completionsResult] = await Promise.all([
    supabase.from("users").select("*").eq("id", user.id).single(),
    supabase
      .from("chores")
      .select("id")
      .eq("user_id", user.id)
      .eq("is_active", true),
    supabase
      .from("chore_completions")
      .select("*, chores(title)")
      .eq("user_id", user.id)
      .order("completed_at", { ascending: false }),
  ]);

  const profile = profileResult.data;
  const chores = choresResult.data || [];
  const completions = (completionsResult.data || []) as CompletionWithChore[];

  const xp = profile?.xp || 0;
  const level = calculateLevel(xp);
  const currentLevelXp = xpForLevel(level);
  const nextLevelXp = xpForLevel(level + 1);
  const progressToNextLevel = Math.round(
    ((xp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100
  );

  // Calculate stats
  const totalCompletions = completions.length;
  const totalXpEarned = completions.reduce(
    (sum, c) => sum + (c.xp_awarded || 0),
    0
  );

  // Get completions from last 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const recentCompletions = completions.filter(
    (c) => new Date(c.completed_at) >= sevenDaysAgo
  );
  const weeklyCompletions = recentCompletions.length;

  // Find most completed quest
  const questCounts = completions.reduce(
    (acc, c) => {
      const title = c.chores?.title || "Unknown";
      acc[title] = (acc[title] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
  const topQuest = Object.entries(questCounts).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="min-h-screen p-6 pt-16 md:pt-6">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-3xl font-semibold tracking-tight">Stats</h1>
        </header>

        {/* Level section */}
        <section className="mb-12">
          <div className="mb-4 flex items-baseline gap-3">
            <span className="font-mono text-5xl font-bold text-blue-400">
              {level}
            </span>
            <span className="text-sm text-white/40">level</span>
          </div>
          <div className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full bg-blue-400/60 transition-all"
              style={{ width: `${progressToNextLevel}%` }}
            />
          </div>
          <p className="text-sm text-white/40">
            <span className="font-mono text-white/60">{xp}</span> /{" "}
            <span className="font-mono">{nextLevelXp}</span> XP
          </p>
        </section>

        {/* Stats grid */}
        <section className="mb-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div>
            <p className="font-mono text-2xl text-emerald-400">
              {totalXpEarned.toLocaleString()}
            </p>
            <p className="mt-1 text-xs text-white/40">Total XP</p>
          </div>
          <div>
            <p className="font-mono text-2xl text-white">{totalCompletions}</p>
            <p className="mt-1 text-xs text-white/40">Completed</p>
          </div>
          <div>
            <p className="font-mono text-2xl text-amber-400">
              {weeklyCompletions}
            </p>
            <p className="mt-1 text-xs text-white/40">This week</p>
          </div>
          <div>
            <p className="font-mono text-2xl text-violet-400">
              {chores.length}
            </p>
            <p className="mt-1 text-xs text-white/40">Active quests</p>
          </div>
        </section>

        {/* Top quest */}
        {topQuest && (
          <section>
            <p className="mb-2 text-xs text-white/40">Most completed</p>
            <p className="text-lg">{topQuest[0]}</p>
            <p className="mt-1 text-sm text-white/40">
              {topQuest[1]} time{topQuest[1] !== 1 ? "s" : ""}
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
