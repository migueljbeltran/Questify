"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Loader2, X } from "lucide-react";
import { addChore } from "@/app/dashboard/actions";

export function AddChore() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Handle escape key to close dialog
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      // Focus the first input after a short delay
      setTimeout(() => {
        const firstInput = dialogRef.current?.querySelector("input");
        firstInput?.focus();
      }, 50);
    } else if (previousFocusRef.current) {
      previousFocusRef.current.focus();
    }
  }, [isOpen]);

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
        aria-label="Create new quest"
        className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-sky-500 to-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-900/40 transition hover:from-sky-400 hover:to-emerald-300"
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
        New quest
      </button>
    );
  }

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-8 backdrop-blur-sm"
      onClick={(e) => {
        // Close on backdrop click
        if (e.target === e.currentTarget) {
          setIsOpen(false);
        }
      }}
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-900 bg-slate-950/80 p-6 shadow-2xl shadow-slate-950/50 backdrop-blur">
        <div
          className="absolute -top-16 -left-12 h-48 w-48 rounded-full bg-sky-500/15 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute -right-12 -bottom-12 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.12em] text-slate-400 uppercase">
              New quest
            </p>
            <h3
              id="dialog-title"
              className="text-lg font-semibold text-slate-50"
            >
              Add to your board
            </h3>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close dialog"
            className="rounded-lg border border-slate-800 bg-slate-900 p-2 text-slate-400 transition hover:border-slate-700 hover:text-slate-100"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <form action={handleSubmit} className="relative space-y-4">
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
              aria-required="true"
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white transition outline-none placeholder:text-slate-600 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
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
              className="w-full resize-none rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white transition outline-none placeholder:text-slate-600 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="xp" className="text-xs font-medium text-slate-300">
              XP reward
            </label>
            <select
              id="xp"
              name="xp"
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white transition outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            >
              <option value="10">10 XP (Easy)</option>
              <option value="20">20 XP (Medium)</option>
              <option value="50">50 XP (Hard)</option>
              <option value="100">100 XP (Epic)</option>
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex-1 rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-700 hover:bg-slate-800/70"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              aria-busy={isLoading}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-sky-500 to-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-900/40 transition hover:from-sky-400 hover:to-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading && (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              )}
              {isLoading ? "Creating..." : "Create quest"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
