"use client";

import { useState } from "react";
import { Check, Trash2, Loader2 } from "lucide-react";
import { completeChore, deleteChore } from "@/app/dashboard/actions";
import { Database } from "@/lib/database.types";

type Chore = Database["public"]["Tables"]["chores"]["Row"];

interface ChoreListProps {
  chores: Chore[];
}

export function ChoreList({ chores }: ChoreListProps) {
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>("");

  async function handleComplete(id: string, xp: number, title: string) {
    setProcessingId(id);
    setStatusMessage(`Completing quest: ${title}`);
    await completeChore(id, xp);
    setStatusMessage(`Quest completed: ${title}! +${xp} XP earned`);
    setProcessingId(null);
    // Clear status after announcement
    setTimeout(() => setStatusMessage(""), 3000);
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm("Are you sure you want to abandon this quest?")) return;
    setProcessingId(id);
    setStatusMessage(`Abandoning quest: ${title}`);
    await deleteChore(id);
    setStatusMessage(`Quest abandoned: ${title}`);
    setProcessingId(null);
    setTimeout(() => setStatusMessage(""), 3000);
  }

  if (chores.length === 0) {
    return (
      <div
        className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 px-4 py-10 text-center"
        role="status"
      >
        <p className="text-sm text-slate-400">
          No active quests. Create one to get started!
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Screen reader announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {statusMessage}
      </div>

      <ul className="space-y-3" aria-label="Active quests">
        {chores.map((chore) => (
          <li
            key={chore.id}
            className="group flex items-center justify-between rounded-2xl border border-slate-900 bg-slate-900/70 p-4 shadow-md shadow-slate-950/30 backdrop-blur transition hover:border-slate-800"
          >
            <div className="mr-4 min-w-0 flex-1">
              <div className="mb-1 flex items-center gap-3">
                <h4 className="truncate font-semibold text-slate-50">
                  {chore.title}
                </h4>
                <span
                  className="rounded-full border border-slate-800 bg-slate-800 px-2 py-0.5 text-[11px] font-semibold text-sky-300"
                  aria-label={`${chore.base_xp} experience points reward`}
                >
                  +{chore.base_xp} XP
                </span>
              </div>
              {chore.description && (
                <p className="truncate text-xs text-slate-400">
                  {chore.description}
                </p>
              )}
            </div>

            <div
              className="flex items-center gap-2"
              role="group"
              aria-label={`Actions for ${chore.title}`}
            >
              <button
                onClick={() => handleDelete(chore.id, chore.title)}
                disabled={processingId === chore.id}
                aria-label={`Abandon quest: ${chore.title}`}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-red-500/10 hover:text-red-300 disabled:opacity-50"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                onClick={() =>
                  handleComplete(chore.id, chore.base_xp, chore.title)
                }
                disabled={processingId === chore.id}
                aria-label={`Complete quest: ${chore.title} for ${chore.base_xp} XP`}
                aria-busy={processingId === chore.id}
                className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-300 transition hover:border-emerald-500/40 hover:bg-emerald-500/20 disabled:opacity-50"
              >
                {processingId === chore.id ? (
                  <Loader2
                    className="h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                ) : (
                  <Check className="h-4 w-4" aria-hidden="true" />
                )}
                Complete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
