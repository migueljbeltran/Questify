import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { UserStats } from "@/components/user-stats";
import { ChoreList } from "@/components/chore-list";
import { AddChore } from "@/components/add-chore-dialog";
import { DashboardHeader } from "@/components/dashboard-header";
import { RecentActivity } from "@/components/recent-activity";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  // Fetch user profile, chores, and recent completions in parallel
  const [profileResult, choresResult, completionsResult] = await Promise.all([
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
  ]);

  const profile = profileResult.data;
  const chores = choresResult.data || [];
  // @ts-ignore - Supabase types join inference can be tricky, casting for now
  const completions = (completionsResult.data || []) as any[];

  // If profile doesn't exist (e.g. old user), use default
  const xp = profile?.xp || 0;

  const email = user.email || "";

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-50">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-24 h-80 w-80 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-10 space-y-8">
        <div className="rounded-3xl border border-slate-900 bg-slate-900/70 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-sky-500 to-emerald-400 text-sm font-black text-slate-950 shadow-lg shadow-sky-900/40">
                QF
              </div>
              <div className="leading-tight">
                <p className="text-sm font-semibold tracking-tight">Questify</p>
                <p className="text-[12px] text-slate-300">
                  Keep your streak alive and ship quests.
                </p>
              </div>
            </div>
            <div className="text-right text-[12px] text-slate-300">
              <p className="font-semibold text-slate-100">Signed in</p>
              <p>{email}</p>
            </div>
          </div>

          <div className="mt-6">
            <DashboardHeader email={email} />
          </div>

          <div className="mt-4">
            <UserStats xp={xp} />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4 rounded-3xl border border-slate-900 bg-slate-900/70 p-5 shadow-xl shadow-slate-950/30 backdrop-blur">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                  Active quests
                </p>
                <h2 className="text-xl font-semibold text-slate-50">
                  Today&apos;s board
                </h2>
              </div>
              <AddChore />
            </div>
            <ChoreList chores={chores} />
          </div>

          <div className="space-y-4 rounded-3xl border border-slate-900 bg-slate-900/70 p-5 shadow-xl shadow-slate-950/30 backdrop-blur">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                  Recent activity
                </p>
                <h3 className="text-lg font-semibold text-slate-50">
                  Latest completions
                </h3>
              </div>
            </div>
            <RecentActivity activities={completions} />
          </div>
        </div>
      </div>
    </main>
  );
}
