"use client";

import { LogOut } from "lucide-react";
import { logout } from "@/app/login/actions";

interface DashboardHeaderProps {
  email: string;
}

export function DashboardHeader({ email }: DashboardHeaderProps) {
  return (
    <header className="flex flex-col gap-4 rounded-2xl border border-slate-900 bg-slate-950/70 p-4 shadow-lg shadow-slate-950/40 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
          Quest Board
        </p>
        <h1 className="text-xl font-semibold tracking-tight text-slate-50">
          Your quests, XP, and streaks
        </h1>
        <p className="text-sm text-slate-400">Logged in as {email}</p>
      </div>
      <button
        onClick={() => logout()}
        className="inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-slate-700 hover:bg-slate-800/80 hover:text-slate-50"
      >
        <LogOut className="h-4 w-4" />
        Sign out
      </button>
    </header>
  );
}
