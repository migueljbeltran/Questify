import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Database } from "@/lib/database.types";
import { Check } from "lucide-react";

type CompletionWithChore =
  Database["public"]["Tables"]["chore_completions"]["Row"] & {
    chores: { title: string } | null;
  };

export default async function CompletedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  // Fetch all completions with chore details
  const { data: completions } = await supabase
    .from("chore_completions")
    .select("*, chores(title)")
    .eq("user_id", user.id)
    .order("completed_at", { ascending: false })
    .limit(50);

  const typedCompletions = (completions || []) as CompletionWithChore[];

  // Group completions by date
  const groupedByDate = typedCompletions.reduce(
    (acc, completion) => {
      const date = new Date(completion.completed_at).toLocaleDateString(
        "en-US",
        {
          weekday: "short",
          month: "short",
          day: "numeric",
        }
      );
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(completion);
      return acc;
    },
    {} as Record<string, CompletionWithChore[]>
  );

  const totalXp = typedCompletions.reduce(
    (sum, c) => sum + (c.xp_awarded || 0),
    0
  );

  return (
    <div className="min-h-screen p-6 pt-16 md:pt-6">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">Completed</h1>
          <div className="mt-4 flex items-center gap-6">
            <p className="text-sm text-white/40">
              <span className="font-mono text-white/60">
                {typedCompletions.length}
              </span>{" "}
              quests
            </p>
            <p className="text-sm text-white/40">
              <span className="font-mono text-emerald-400">{totalXp}</span> XP
              earned
            </p>
          </div>
        </header>

        {/* Completion list */}
        {Object.keys(groupedByDate).length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-white/30">No completed quests yet</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedByDate).map(([date, items]) => (
              <section key={date}>
                <h3 className="mb-3 text-xs text-white/30">{date}</h3>
                <ul className="space-y-1">
                  {items.map((completion) => (
                    <li
                      key={completion.id}
                      className="group flex items-center gap-4 rounded-lg px-3 py-3 transition-colors hover:bg-white/[0.03]"
                    >
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400/20">
                        <Check className="h-3 w-3 text-emerald-400" />
                      </div>
                      <span className="flex-1 text-sm">
                        {completion.chores?.title || "Unknown quest"}
                      </span>
                      <span className="font-mono text-xs text-emerald-400/60">
                        +{completion.xp_awarded}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
