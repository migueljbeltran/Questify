"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { completeChore, deleteChore } from "@/app/dashboard/actions";
import { Database } from "@/lib/database.types";
import { CircleCheckbox } from "@/components/ui/circle-checkbox";

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
    setTimeout(() => setStatusMessage(""), 3000);
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm("Are you sure you want to delete this quest?")) return;
    setProcessingId(id);
    setStatusMessage(`Deleting quest: ${title}`);
    await deleteChore(id);
    setStatusMessage(`Quest deleted: ${title}`);
    setProcessingId(null);
    setTimeout(() => setStatusMessage(""), 3000);
  }

  if (chores.length === 0) {
    return (
      <div className="py-12 text-center" role="status">
        <p className="text-sm text-white/30">No quests yet</p>
      </div>
    );
  }

  return (
    <>
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {statusMessage}
      </div>

      <ul className="space-y-1" aria-label="Active quests">
        {chores.map((chore) => {
          const isProcessing = processingId === chore.id;

          return (
            <li
              key={chore.id}
              className="group flex items-center gap-4 rounded-xl px-3 py-3 transition-colors hover:bg-white/[0.03]"
            >
              {/* Circular checkbox */}
              {isProcessing ? (
                <div className="flex h-5 w-5 items-center justify-center">
                  <Loader2 className="h-4 w-4 animate-spin text-white/30" />
                </div>
              ) : (
                <CircleCheckbox
                  checked={false}
                  onChange={() =>
                    handleComplete(chore.id, chore.base_xp, chore.title)
                  }
                  disabled={isProcessing}
                  aria-label={`Complete quest: ${chore.title}`}
                />
              )}

              {/* Task content */}
              <div className="min-w-0 flex-1">
                <span className="text-sm">{chore.title}</span>
                {chore.description && (
                  <p className="mt-0.5 truncate text-xs text-white/30">
                    {chore.description}
                  </p>
                )}
              </div>

              {/* XP badge */}
              <span className="font-mono text-xs text-emerald-400/70">
                +{chore.base_xp}
              </span>

              {/* Delete button (hover) */}
              <button
                onClick={() => handleDelete(chore.id, chore.title)}
                disabled={isProcessing}
                aria-label={`Delete quest: ${chore.title}`}
                className="rounded-md p-1.5 text-white/0 transition-all group-hover:text-white/20 hover:bg-red-500/10 hover:text-red-400"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
