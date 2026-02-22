import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { UserStats } from "@/components/user-stats";
import { ChoreList } from "@/components/chore-list";
import { AddChore } from "@/components/add-chore-dialog";
import { RecentActivity } from "@/components/recent-activity";
import { Database } from "@/lib/database.types";

type CompletionWithChore =
  Database["public"]["Tables"]["chore_completions"]["Row"] & {
    chores: { title: string } | null;
  };

function getOrdinalDay(day: number): string {
  const suffix = ["th", "st", "nd", "rd"];
  const v = day % 100;
  return day + (suffix[(v - 20) % 10] || suffix[v] || suffix[0]);
}

function formatMedievalDate(date: Date): string {
  const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const day = date.getDate();
  return `${weekday}, the ${getOrdinalDay(day)} of ${month}`;
}

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const [
    profileResult,
    choresResult,
    completionsResult,
    todayCompletionsResult,
  ] = await Promise.all([
    supabase.from("users").select("*").eq("id", user.id).single(),
    supabase
      .from("chores")
      .select("*")
      .eq("user_id", user.id)
      .eq("is_active", true)
      .order("created_at", { ascending: false }),
    supabase
      .from("chore_completions")
      .select("*, chores(title)")
      .eq("user_id", user.id)
      .order("completed_at", { ascending: false })
      .limit(5),
    supabase
      .from("chore_completions")
      .select("id", { count: "exact" })
      .eq("user_id", user.id)
      .gte("completed_at", new Date().toISOString().split("T")[0]),
  ]);

  const profile = profileResult.data;
  const chores = choresResult.data || [];
  const completions = (completionsResult.data || []) as CompletionWithChore[];
  const todayCompleted = todayCompletionsResult.count || 0;

  const xp = profile?.xp || 0;
  const currentStreak = profile?.current_streak || 0;
  const lastCompletionDate = profile?.last_completion_date || null;
  const totalQuests = chores.length;
  const remaining = totalQuests - todayCompleted;

  const todayDate = formatMedievalDate(new Date());

  return (
    <div className="min-h-screen p-6 pt-16 md:pt-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <header className="mb-8">
          <h1 className="font-display text-cream text-3xl font-bold tracking-wide">
            Today&apos;s Bounties
          </h1>
          <p className="text-cream/50 mt-1 text-sm italic">{todayDate}</p>
          <div className="mt-4">
            <UserStats
              xp={xp}
              currentStreak={currentStreak}
              lastCompletionDate={lastCompletionDate}
            />
          </div>
        </header>

        {/* Main content */}
        <div className="grid gap-12 lg:grid-cols-[1fr_240px]">
          {/* Quest list section */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <span className="text-cream/40 text-sm">
                {todayCompleted} bounties fulfilled &middot; {remaining}{" "}
                remaining
              </span>
              <AddChore />
            </div>
            {/* Ornamental divider */}
            <hr className="ornament-divider mb-4" />
            <ChoreList chores={chores} />
          </section>

          {/* Recent activity */}
          <aside>
            <h3 className="text-cream/30 mb-4 text-xs font-medium tracking-widest uppercase">
              Recent Deeds
            </h3>
            <RecentActivity activities={completions} />
          </aside>
        </div>
      </div>
    </div>
  );
}
