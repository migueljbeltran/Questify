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
          <h1 className="font-display text-cream text-3xl font-bold tracking-wide">
            Quest Board
          </h1>
          <p className="text-cream/50 mt-2 text-sm italic">
            Active bounties posted to the guild
          </p>
        </header>

        {/* Actions */}
        <div className="mb-4 flex justify-end">
          <AddChore />
        </div>

        {/* Ornamental divider */}
        <hr className="ornament-divider mb-4" />

        {/* Quest list */}
        <ChoreList chores={chores || []} />
      </div>
    </div>
  );
}
