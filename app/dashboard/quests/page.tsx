import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
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
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">All Quests</h1>
          <p className="mt-2 text-sm text-white/40">
            {chores?.length || 0} active
          </p>
        </header>

        {/* Actions */}
        <div className="mb-6 flex justify-end">
          <AddChore />
        </div>

        {/* Quest list */}
        <ChoreList chores={chores || []} />
      </div>
    </div>
  );
}
