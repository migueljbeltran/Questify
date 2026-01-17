"use client";

import { LogOut } from "lucide-react";
import { logout } from "@/app/login/actions";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  email: string;
}

export function DashboardHeader({ email }: DashboardHeaderProps) {
  return (
    <header className="flex flex-col gap-4 rounded-2xl border border-slate-900 bg-slate-950/70 p-4 shadow-lg shadow-slate-950/40 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        <p className="text-xs font-semibold tracking-[0.12em] text-slate-400 uppercase">
          Quest Board
        </p>
        <h1 className="text-xl font-semibold tracking-tight text-slate-50">
          Your quests, XP, and streaks
        </h1>
        <p className="text-sm text-slate-400">
          Logged in as <span className="font-medium">{email}</span>
        </p>
      </div>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => logout()}
        aria-label="Sign out of your account"
      >
        <LogOut className="h-4 w-4" aria-hidden="true" />
        Sign out
      </Button>
    </header>
  );
}
