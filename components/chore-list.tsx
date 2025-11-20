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

  async function handleComplete(id: string, xp: number) {
    setProcessingId(id);
    await completeChore(id, xp);
    setProcessingId(null);
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to abandon this quest?")) return;
    setProcessingId(id);
    await deleteChore(id);
    setProcessingId(null);
  }

  if (chores.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed border-slate-800 rounded-2xl">
        <p className="text-slate-500">
          No active quests. Create one to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {chores.map((chore) => (
        <div
          key={chore.id}
          className="group flex items-center justify-between p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all"
        >
          <div className="flex-1 min-w-0 mr-4">
            <div className="flex items-center gap-3 mb-1">
              <h4 className="font-medium text-slate-200 truncate">
                {chore.title}
              </h4>
              <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] font-medium text-sky-400 border border-slate-700">
                +{chore.base_xp} XP
              </span>
            </div>
            {chore.description && (
              <p className="text-xs text-slate-500 truncate">
                {chore.description}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleDelete(chore.id)}
              disabled={processingId === chore.id}
              className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
              title="Abandon Quest"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleComplete(chore.id, chore.base_xp)}
              disabled={processingId === chore.id}
              className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-lg transition-colors disabled:opacity-50"
            >
              {processingId === chore.id ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Check className="w-4 h-4" />
              )}
              <span className="text-xs font-medium">Complete</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
