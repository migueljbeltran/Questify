import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard-header";
import { Database } from "@/lib/database.types";
import { Trophy, Zap, Target, Calendar } from "lucide-react";

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
      <div className="mx-auto max-w-4xl">
        <DashboardHeader
          title="Stats"
          subtitle="Track your progress and achievements"
        />

        {/* Level progress */}
        <section className="border-border bg-surface-1 mb-8 rounded-lg border p-6">
          <div className="mb-4 flex items-center gap-3">
            <Trophy className="text-level h-6 w-6" />
            <h2 className="text-foreground text-lg font-semibold">
              Level {level}
            </h2>
          </div>
          <div className="bg-surface-2 mb-2 h-3 overflow-hidden rounded-full">
            <div
              className="bg-level h-full transition-all"
              style={{ width: `${progressToNextLevel}%` }}
            />
          </div>
          <p className="text-muted-foreground text-sm">
            <span className="text-foreground font-mono">{xp}</span> /{" "}
            <span className="font-mono">{nextLevelXp}</span> XP to level{" "}
            {level + 1}
          </p>
        </section>

        {/* Stats grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={Zap}
            label="Total XP"
            value={totalXpEarned.toLocaleString()}
            iconColor="text-xp"
          />
          <StatCard
            icon={Target}
            label="Quests Completed"
            value={totalCompletions.toString()}
            iconColor="text-primary"
          />
          <StatCard
            icon={Calendar}
            label="This Week"
            value={weeklyCompletions.toString()}
            iconColor="text-streak"
          />
          <StatCard
            icon={Trophy}
            label="Active Quests"
            value={chores.length.toString()}
            iconColor="text-level"
          />
        </div>

        {/* Top quest */}
        {topQuest && (
          <section className="border-border bg-surface-1 rounded-lg border p-6">
            <h3 className="text-muted-foreground mb-2 text-sm font-medium">
              Most Completed Quest
            </h3>
            <p className="text-foreground text-lg font-semibold">
              {topQuest[0]}
            </p>
            <p className="text-muted-foreground text-sm">
              Completed {topQuest[1]} time{topQuest[1] !== 1 ? "s" : ""}
            </p>
          </section>
        )}
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  iconColor,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  iconColor: string;
}) {
  return (
    <div className="border-border bg-surface-1 rounded-lg border p-4">
      <div className="mb-2 flex items-center gap-2">
        <Icon className={`h-5 w-5 ${iconColor}`} />
        <span className="text-muted-foreground text-sm">{label}</span>
      </div>
      <p className="text-foreground font-mono text-2xl font-semibold">
        {value}
      </p>
    </div>
  );
}
