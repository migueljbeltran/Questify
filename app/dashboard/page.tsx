import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { UserStats } from "@/components/user-stats";
import { ChoreList } from "@/components/chore-list";
import { AddChore } from "@/components/add-chore-dialog";
import { DashboardHeader } from "@/components/dashboard-header";
import { CompletionProgress } from "@/components/completion-progress";
import { RecentActivity } from "@/components/recent-activity";
import { Database } from "@/lib/database.types";

type CompletionWithChore =
  Database["public"]["Tables"]["chore_completions"]["Row"] & {
    chores: { title: string } | null;
  };

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  // Fetch user profile, chores, and recent completions in parallel
  const [profileResult, choresResult, completionsResult, todayCompletionsResult] = await Promise.all([
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
    // Get today's completions count
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

  // If profile doesn't exist (e.g. old user), use default
  const xp = profile?.xp || 0;
  const totalQuests = chores.length;

  return (
    <div className="min-h-screen p-6 pt-16 md:pt-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <DashboardHeader
          title="Today"
          subtitle="Your daily quests and progress"
        />

        {/* Stats bar */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
          <UserStats xp={xp} />
        </div>

        {/* Main content grid */}
        <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
          {/* Quest list section */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold text-foreground">
                  Active Quests
                </h2>
                <CompletionProgress
                  completed={todayCompleted}
                  total={totalQuests}
                />
              </div>
              <AddChore />
            </div>
            <ChoreList chores={chores} />
          </section>

          {/* Recent activity sidebar */}
          <aside>
            <h3 className="mb-4 text-sm font-medium text-muted-foreground">
              Recent Activity
            </h3>
            <RecentActivity activities={completions} />
          </aside>
        </div>
      </div>
    </div>
  );
}
