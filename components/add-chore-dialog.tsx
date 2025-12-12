"use client";

import { useState } from "react";
import { Plus, Loader2, X } from "lucide-react";
import { addChore } from "@/app/dashboard/actions";

export function AddChore() {
        const [isOpen, setIsOpen] = useState(false);
        const [isLoading, setIsLoading] = useState(false);

        async function handleSubmit(formData: FormData) {
                setIsLoading(true);
                await addChore(formData);
                setIsLoading(false);
                setIsOpen(false);
        }

        if (!isOpen) {
                return (
                        <button
                                onClick={() => setIsOpen(true)}
                                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-sky-500 to-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-900/40 transition hover:from-sky-400 hover:to-emerald-300"
                        >
                                <Plus className="h-4 w-4" />
                                New quest
                        </button>
                );
        }

        return (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-8 backdrop-blur-sm">
                        <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-900 bg-slate-950/80 p-6 shadow-2xl shadow-slate-950/50 backdrop-blur">
                                <div className="absolute -left-12 -top-16 h-48 w-48 rounded-full bg-sky-500/15 blur-3xl" />
                                <div className="absolute -right-12 -bottom-12 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />

                                <div className="relative mb-6 flex items-center justify-between">
                                        <div>
                                                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                                                        New quest
                                                </p>
                                                <h3 className="text-lg font-semibold text-slate-50">
                                                        Add to your board
                                                </h3>
                                        </div>
                                        <button
                                                onClick={() => setIsOpen(false)}
                                                className="rounded-lg border border-slate-800 bg-slate-900 p-2 text-slate-400 transition hover:border-slate-700 hover:text-slate-100"
                                        >
                                                <X className="h-4 w-4" />
                                        </button>
                                </div>

                                <form
                                        action={handleSubmit}
                                        className="relative space-y-4"
                                >
                                        <div className="space-y-2">
                                                <label
                                                        htmlFor="title"
                                                        className="text-xs font-medium text-slate-300"
                                                >
                                                        Quest title
                                                </label>
                                                <input
                                                        id="title"
                                                        name="title"
                                                        required
                                                        placeholder="e.g. Wash the dishes"
                                                        className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                                />
                                        </div>

                                        <div className="space-y-2">
                                                <label
                                                        htmlFor="description"
                                                        className="text-xs font-medium text-slate-300"
                                                >
                                                        Description (optional)
                                                </label>
                                                <textarea
                                                        id="description"
                                                        name="description"
                                                        rows={3}
                                                        placeholder="Details about the quest..."
                                                        className="w-full resize-none rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                                />
                                        </div>

                                        <div className="space-y-2">
                                                <label
                                                        htmlFor="xp"
                                                        className="text-xs font-medium text-slate-300"
                                                >
                                                        XP reward
                                                </label>
                                                <select
                                                        id="xp"
                                                        name="xp"
                                                        className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                                >
                                                        <option value="10">
                                                                10 XP (Easy)
                                                        </option>
                                                        <option value="20">
                                                                20 XP (Medium)
                                                        </option>
                                                        <option value="50">
                                                                50 XP (Hard)
                                                        </option>
                                                        <option value="100">
                                                                100 XP (Epic)
                                                        </option>
                                                </select>
                                        </div>

                                        <div className="flex gap-3 pt-2">
                                                <button
                                                        type="button"
                                                        onClick={() =>
                                                                setIsOpen(false)
                                                        }
                                                        className="flex-1 rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-700 hover:bg-slate-800/70"
                                                >
                                                        Cancel
                                                </button>
                                                <button
                                                        type="submit"
                                                        disabled={isLoading}
                                                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-sky-500 to-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-900/40 transition hover:from-sky-400 hover:to-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
                                                >
                                                        {isLoading && (
                                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                        )}
                                                        Create quest
                                                </button>
                                        </div>
                                </form>
                        </div>
                </div>
        );
}
