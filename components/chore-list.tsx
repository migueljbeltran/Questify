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
                if (!confirm("Are you sure you want to abandon this quest?"))
                        return;
                setProcessingId(id);
                await deleteChore(id);
                setProcessingId(null);
        }

        if (chores.length === 0) {
                return (
                        <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 px-4 py-10 text-center">
                                <p className="text-sm text-slate-400">
                                        No active quests. Create one to get
                                        started!
                                </p>
                        </div>
                );
        }

        return (
                <div className="space-y-3">
                        {chores.map((chore) => (
                                <div
                                        key={chore.id}
                                        className="group flex items-center justify-between rounded-2xl border border-slate-900 bg-slate-900/70 p-4 shadow-md shadow-slate-950/30 backdrop-blur transition hover:border-slate-800"
                                >
                                        <div className="mr-4 min-w-0 flex-1">
                                                <div className="mb-1 flex items-center gap-3">
                                                        <h4 className="truncate font-semibold text-slate-50">
                                                                {chore.title}
                                                        </h4>
                                                        <span className="rounded-full border border-slate-800 bg-slate-800 px-2 py-0.5 text-[11px] font-semibold text-sky-300">
                                                                +{chore.base_xp}{" "}
                                                                XP
                                                        </span>
                                                </div>
                                                {chore.description && (
                                                        <p className="truncate text-xs text-slate-400">
                                                                {
                                                                        chore.description
                                                                }
                                                        </p>
                                                )}
                                        </div>

                                        <div className="flex items-center gap-2">
                                                <button
                                                        onClick={() =>
                                                                handleDelete(
                                                                        chore.id
                                                                )
                                                        }
                                                        disabled={
                                                                processingId ===
                                                                chore.id
                                                        }
                                                        className="rounded-lg p-2 text-slate-500 transition hover:bg-red-500/10 hover:text-red-300 disabled:opacity-50"
                                                        title="Abandon quest"
                                                >
                                                        <Trash2 className="h-4 w-4" />
                                                </button>
                                                <button
                                                        onClick={() =>
                                                                handleComplete(
                                                                        chore.id,
                                                                        chore.base_xp
                                                                )
                                                        }
                                                        disabled={
                                                                processingId ===
                                                                chore.id
                                                        }
                                                        className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-300 transition hover:bg-emerald-500/20 hover:border-emerald-500/40 disabled:opacity-50"
                                                >
                                                        {processingId ===
                                                        chore.id ? (
                                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                        ) : (
                                                                <Check className="h-4 w-4" />
                                                        )}
                                                        Complete
                                                </button>
                                        </div>
                                </div>
                        ))}
                </div>
        );
}
