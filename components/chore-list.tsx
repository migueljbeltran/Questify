"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { completeChore, deleteChore } from "@/app/dashboard/actions";
import { Database } from "@/lib/database.types";
import { CircleCheckbox } from "@/components/ui/circle-checkbox";
import { Badge } from "@/components/ui/badge";

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
      <div
        className="border-border rounded-lg border border-dashed bg-transparent px-4 py-10 text-center"
        role="status"
      >
        <p className="text-muted-foreground text-sm">
          No quests yet. Create one to get started!
        </p>
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
              className="task-item group hover:bg-surface-1 flex items-center gap-3 rounded-md px-2 py-2.5 transition-colors"
            >
              {/* Circular checkbox */}
              {isProcessing ? (
                <div className="flex h-5 w-5 items-center justify-center">
                  <Loader2 className="text-muted-foreground h-4 w-4 animate-spin" />
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
                <div className="flex items-center gap-2">
                  <span className="text-foreground truncate text-sm">
                    {chore.title}
                  </span>
                  <Badge variant="xp" size="sm">
                    +{chore.base_xp} XP
                  </Badge>
                </div>
                {chore.description && (
                  <p className="text-muted-foreground truncate text-xs">
                    {chore.description}
                  </p>
                )}
              </div>

              {/* Hover actions */}
              <div
                className="task-actions flex items-center gap-1"
                role="group"
                aria-label={`Actions for ${chore.title}`}
              >
                <button
                  onClick={() => handleDelete(chore.id, chore.title)}
                  disabled={isProcessing}
                  aria-label={`Delete quest: ${chore.title}`}
                  className="text-muted-foreground rounded-md p-1.5 transition-colors hover:bg-red-500/10 hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
