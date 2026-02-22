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
    setStatusMessage(`Fulfilling bounty: ${title}`);

    floatCounter.current += 1;
    const floatId = `${id}-${floatCounter.current}`;
    setXpFloats((prev) => [...prev, { id: floatId, xp, choreId: id }]);
    setTimeout(() => {
      setXpFloats((prev) => prev.filter((f) => f.id !== floatId));
    }, 1000);

    await completeChore(id, xp);
    setStatusMessage(`Bounty fulfilled: ${title}! +${xp} gold earned`);
    setProcessingId(null);
    setTimeout(() => setStatusMessage(""), 3000);
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm("Are you sure you want to remove this bounty?")) return;
    setProcessingId(id);
    setStatusMessage(`Removing bounty: ${title}`);
    await deleteChore(id);
    setStatusMessage(`Bounty removed: ${title}`);
    setProcessingId(null);
    setTimeout(() => setStatusMessage(""), 3000);
  }

  if (chores.length === 0) {
    return (
      <div className="py-12 text-center" role="status">
        <p className="text-cream/30 text-sm">No bounties posted yet</p>
      </div>
    );
  }

  return (
    <>
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {statusMessage}
      </div>

      <ul className="space-y-1" aria-label="Active bounties">
        {chores.map((chore) => {
          const isProcessing = processingId === chore.id;

          return (
            <li
              key={chore.id}
              className="group hover:border-gold/20 hover:bg-surface-1 relative flex items-center gap-4 border border-transparent px-3 py-3 transition-all"
            >
              {/* Gold XP float animation */}
              {xpFloats
                .filter((f) => f.choreId === chore.id)
                .map((f) => (
                  <span
                    key={f.id}
                    className="animate-gold-shimmer text-gold absolute top-0 left-3 z-10 font-mono text-sm font-semibold"
                  >
                    +{f.xp} gold
                  </span>
                ))}

              {/* Circular checkbox */}
              {isProcessing ? (
                <div className="flex h-5 w-5 items-center justify-center">
                  <Loader2 className="text-cream/30 h-4 w-4 animate-spin" />
                </div>
              ) : (
                <CircleCheckbox
                  checked={false}
                  onChange={() =>
                    handleComplete(chore.id, chore.base_xp, chore.title)
                  }
                  disabled={isProcessing}
                  aria-label={`Fulfill bounty: ${chore.title}`}
                />
              )}

              {/* Task content */}
              <div className="min-w-0 flex-1">
                <span className="text-cream/80 text-sm">{chore.title}</span>
                {chore.description && (
                  <p className="text-cream/30 mt-0.5 truncate text-xs">
                    {chore.description}
                  </p>
                )}
              </div>

              {/* Gold badge */}
              <span className="text-gold/70 font-mono text-xs">
                +{chore.base_xp}g
              </span>

              {/* Edit button (hover) */}
              <button
                onClick={() => setEditingChore(chore)}
                disabled={isProcessing}
                aria-label={`Edit bounty: ${chore.title}`}
                className="text-cream/0 group-hover:text-cream/20 hover:bg-gold/10 hover:text-gold/60 rounded-sm p-1.5 transition-all"
              >
                <Pencil className="h-4 w-4" aria-hidden="true" />
              </button>

              {/* Delete button (hover) */}
              <button
                onClick={() => handleDelete(chore.id, chore.title)}
                disabled={isProcessing}
                aria-label={`Remove bounty: ${chore.title}`}
                className="text-cream/0 group-hover:text-cream/20 hover:bg-crimson/15 rounded-sm p-1.5 transition-all hover:text-red-400"
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
