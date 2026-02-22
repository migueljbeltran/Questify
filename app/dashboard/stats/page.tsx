import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Database } from "@/lib/database.types";
import { getRankName } from "@/lib/utils";

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
  const rankName = getRankName(level);
  const currentLevelXp = xpForLevel(level);
  const nextLevelXp = xpForLevel(level + 1);
  const progressToNextLevel = Math.round(
    ((xp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100
  );

  const totalCompletions = completions.length;
  const totalXpEarned = completions.reduce(
    (sum, c) => sum + (c.xp_awarded || 0),
    0
  );

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const weeklyCompletions = completions.filter(
    (c) => new Date(c.completed_at) >= sevenDaysAgo
  ).length;

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
          <h1 className="font-display text-cream text-3xl font-bold tracking-wide">
            Guild Record
          </h1>
        </header>

        {/* Rank + Level section */}
        <section className="mb-12">
          <div className="mb-1">
            <span className="font-display text-gold text-4xl font-bold tracking-widest uppercase">
              {rankName}
            </span>
          </div>
          <div className="mb-4 flex items-baseline gap-2">
            <span className="text-gold/70 font-mono text-2xl font-semibold">
              LV.{level}
            </span>
          </div>
          {/* Gold XP progress bar */}
          <div className="bg-surface-2 mb-2 h-1.5 w-full overflow-hidden rounded-full">
            <div
              className="bg-gold/70 h-full transition-all"
              style={{ width: `${progressToNextLevel}%` }}
            />
          </div>
          <p className="text-cream/40 text-sm">
            <span className="text-gold/80 font-mono">{xp}</span> /{" "}
            <span className="font-mono">{nextLevelXp}</span> gold
          </p>
        </section>

        {/* Stats grid */}
        <section className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            {
              value: totalXpEarned.toLocaleString(),
              label: "Gold Earned",
              color: "text-gold",
            },
            {
              value: String(totalCompletions),
              label: "Deeds Done",
              color: "text-cream",
            },
            {
              value: String(weeklyCompletions),
              label: "This Sennight",
              color: "text-amber-400",
            },
            {
              value: String(chores.length),
              label: "Open Bounties",
              color: "text-cream/60",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="border-gold/20 bg-surface-1 border px-4 py-4"
            >
              <p className={`font-mono text-2xl ${stat.color}`}>{stat.value}</p>
              <p className="text-cream/40 mt-1 text-xs">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* Top quest */}
        {topQuest && (
          <section>
            <p className="text-cream/40 mb-2 text-xs tracking-widest uppercase">
              Most Fulfilled
            </p>
            <p className="text-cream/80 text-lg">{topQuest[0]}</p>
            <p className="text-cream/40 mt-1 text-sm">
              {topQuest[1]} time{topQuest[1] !== 1 ? "s" : ""}
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
