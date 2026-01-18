import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard-header";
import { Database } from "@/lib/database.types";
import { CheckCircle2 } from "lucide-react";

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
          weekday: "long",
          year: "numeric",
          month: "long",
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
      <div className="mx-auto max-w-4xl">
        <DashboardHeader
          title="Completed"
          subtitle="Your quest completion history"
        />

        {/* Summary */}
        <div className="border-border mb-8 flex gap-6 border-b pb-6">
          <div>
            <p className="text-foreground text-2xl font-semibold">
              {typedCompletions.length}
            </p>
            <p className="text-muted-foreground text-sm">Quests completed</p>
          </div>
          <div>
            <p className="text-xp text-2xl font-semibold">{totalXp}</p>
            <p className="text-muted-foreground text-sm">Total XP earned</p>
          </div>
        </div>

        {/* Completion list grouped by date */}
        {Object.keys(groupedByDate).length === 0 ? (
          <div className="py-12 text-center">
            <CheckCircle2 className="text-muted-foreground/50 mx-auto mb-4 h-12 w-12" />
            <p className="text-muted-foreground">
              No completed quests yet. Start completing some!
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedByDate).map(([date, items]) => (
              <section key={date}>
                <h3 className="text-muted-foreground mb-3 text-sm font-medium">
                  {date}
                </h3>
                <ul className="space-y-2">
                  {items.map((completion) => (
                    <li
                      key={completion.id}
                      className="border-border bg-surface-1 flex items-center justify-between rounded-lg border px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="text-xp h-5 w-5" />
                        <span className="text-foreground">
                          {completion.chores?.title || "Unknown quest"}
                        </span>
                      </div>
                      <span className="text-xp font-mono text-sm">
                        +{completion.xp_awarded} XP
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
