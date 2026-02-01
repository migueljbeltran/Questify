"use client";

import { useRef, useState } from "react";
import { Trash2, Loader2, Pencil } from "lucide-react";
import { completeChore, deleteChore } from "@/app/dashboard/actions";
import { Database } from "@/lib/database.types";
import { CircleCheckbox } from "@/components/ui/circle-checkbox";
import { ChoreDialog } from "@/components/add-chore-dialog";

type Chore = Database["public"]["Tables"]["chores"]["Row"];

interface ChoreListProps {
  chores: Chore[];
}

interface XpFloat {
  id: string;
  xp: number;
  choreId: string;
}

export function ChoreList({ chores }: ChoreListProps) {
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [editingChore, setEditingChore] = useState<Chore | null>(null);
  const [xpFloats, setXpFloats] = useState<XpFloat[]>([]);
  const floatCounter = useRef(0);

  async function handleComplete(id: string, xp: number, title: string) {
    setProcessingId(id);
    setStatusMessage(`Completing quest: ${title}`);

    // Trigger XP float animation
    floatCounter.current += 1;
    const floatId = `${id}-${floatCounter.current}`;
    setXpFloats((prev) => [...prev, { id: floatId, xp, choreId: id }]);
    setTimeout(() => {
      setXpFloats((prev) => prev.filter((f) => f.id !== floatId));
    }, 1000);

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
              className="group relative flex items-center gap-4 rounded-xl px-3 py-3 transition-colors hover:bg-white/[0.03]"
            >
              {/* XP float animation */}
              {xpFloats
                .filter((f) => f.choreId === chore.id)
                .map((f) => (
                  <span
                    key={f.id}
                    className="animate-xp-float absolute top-0 left-3 z-10 font-mono text-sm font-semibold text-emerald-400"
                  >
                    +{f.xp} XP
                  </span>
                ))}

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

              {/* Edit button (hover) */}
              <button
                onClick={() => setEditingChore(chore)}
                disabled={isProcessing}
                aria-label={`Edit quest: ${chore.title}`}
                className="rounded-md p-1.5 text-white/0 transition-all group-hover:text-white/20 hover:bg-white/5 hover:text-white/60"
              >
                <Pencil className="h-4 w-4" aria-hidden="true" />
              </button>

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

      {/* Edit dialog */}
      <ChoreDialog
        chore={editingChore || undefined}
        open={!!editingChore}
        onOpenChange={(open) => {
          if (!open) setEditingChore(null);
        }}
      />
    </>
  );
}
