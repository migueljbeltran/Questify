import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Database } from "@/lib/database.types";
import { Check } from "lucide-react";

type CompletionWithChore =
  Database["public"]["Tables"]["chore_completions"]["Row"] & {
    chores: { title: string } | null;
  };

function getOrdinalDay(day: number): string {
  const suffix = ["th", "st", "nd", "rd"];
  const v = day % 100;
  return day + (suffix[(v - 20) % 10] || suffix[v] || suffix[0]);
}

function formatGroupDate(dateStr: string): string {
  const date = new Date(dateStr);
  const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const day = date.getDate();
  return `${weekday}, ${getOrdinalDay(day)} ${month}`;
}

export default async function CompletedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

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
      const date = new Date(completion.completed_at)
        .toISOString()
        .split("T")[0];
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
          <h1 className="font-display text-cream text-3xl font-bold tracking-wide">
            Chronicles
          </h1>
          <p className="text-cream/50 mt-1 text-sm italic">
            A record of all deeds fulfilled
          </p>
          <div className="mt-4 flex items-center gap-6">
            <p className="text-cream/40 text-sm">
              <span className="text-cream/60 font-mono">
                {typedCompletions.length}
              </span>{" "}
              deeds
            </p>
            <p className="text-cream/40 text-sm">
              <span className="text-gold font-mono">{totalXp}</span> gold earned
            </p>
          </div>
        </header>

        {/* Completion list */}
        {Object.keys(groupedByDate).length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-cream/30">No deeds recorded yet</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedByDate).map(([date, items]) => (
              <section key={date}>
                {/* Ornamental date header */}
                <div className="mb-3 flex items-center gap-3">
                  <hr className="border-gold/20 flex-1 border-0 border-t" />
                  <span className="text-cream/40 text-xs italic">
                    ~ {formatGroupDate(date)} ~
                  </span>
                  <hr className="border-gold/20 flex-1 border-0 border-t" />
                </div>
                <ul className="space-y-1">
                  {items.map((completion) => (
                    <li
                      key={completion.id}
                      className="group hover:border-gold/20 hover:bg-surface-1 flex items-center gap-4 border border-transparent px-3 py-3 transition-all"
                    >
                      <div className="bg-gold/20 flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                        <Check className="text-gold h-3 w-3" />
                      </div>
                      <span className="text-cream/80 flex-1 text-sm">
                        {completion.chores?.title || "Unknown deed"}
                      </span>
                      <span className="text-gold/60 font-mono text-xs">
                        +{completion.xp_awarded}g
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
