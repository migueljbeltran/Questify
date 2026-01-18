import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard-header";
import { ChoreList } from "@/components/chore-list";
import { AddChore } from "@/components/add-chore-dialog";

export default async function QuestsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  // Fetch all active chores
  const { data: chores } = await supabase
    .from("chores")
    .select("*")
    .eq("user_id", user.id)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen p-6 pt-16 md:pt-6">
      <div className="mx-auto max-w-4xl">
        <DashboardHeader
          title="All Quests"
          subtitle="Manage your recurring quests"
        />

        <section>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-muted-foreground text-sm">
              {chores?.length || 0} active quest
              {chores?.length !== 1 ? "s" : ""}
            </p>
            <AddChore />
          </div>
          <ChoreList chores={chores || []} />
        </section>
      </div>
    </div>
  );
}
