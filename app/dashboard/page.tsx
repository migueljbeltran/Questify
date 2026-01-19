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

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  // Fetch user profile, chores, and recent completions in parallel
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
        <header className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">Today</h1>
          <div className="mt-4">
            <UserStats xp={xp} />
          </div>
        </header>

        {/* Main content */}
        <div className="grid gap-12 lg:grid-cols-[1fr_240px]">
          {/* Quest list section */}
          <section>
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm text-white/40">
                  {todayCompleted}/{totalQuests} completed
                </span>
              </div>
              <AddChore />
            </div>
            <ChoreList chores={chores} />
          </section>

          {/* Recent activity */}
          <aside>
            <h3 className="mb-4 text-xs font-medium tracking-wider text-white/30 uppercase">
              Recent
            </h3>
            <RecentActivity activities={completions} />
          </aside>
        </div>
      </div>
    </div>
  );
}
