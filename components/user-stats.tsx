"use client";

import { Zap, Trophy, Star } from "lucide-react";

interface UserStatsProps {
  xp: number;
}

export function UserStats({ xp }: UserStatsProps) {
  // Level = floor(sqrt(xp/100))
  const level = Math.floor(Math.sqrt(xp / 100)) || 1;
  const currentLevelXp = Math.pow(level, 2) * 100;
  const nextLevelXp = Math.pow(level + 1, 2) * 100;
  const xpNeeded = nextLevelXp - currentLevelXp;
  const xpProgress = xp - currentLevelXp;
  const progressPercent = Math.min(
    100,
    Math.max(0, (xpProgress / xpNeeded) * 100)
  );

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="relative overflow-hidden rounded-2xl border border-slate-900 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/40 backdrop-blur">
        <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-sky-500/10 blur-2xl" />
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-300">
          <Trophy className="h-4 w-4 text-sky-400" />
          Current level
        </div>
        <p className="text-3xl font-bold text-slate-50">{level}</p>
        <p className="text-xs text-slate-400">Adventurer</p>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-slate-900 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/40 backdrop-blur">
        <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-emerald-500/10 blur-2xl" />
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-300">
          <Star className="h-4 w-4 text-emerald-300" />
          Experience
        </div>
        <div className="flex items-end gap-2">
          <span className="text-3xl font-bold text-slate-50">{xp}</span>
          <span className="mb-1 text-sm text-slate-400">/ {nextLevelXp} XP</span>
        </div>
        <div className="mt-3 h-2 w-full rounded-full bg-slate-800">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-sky-400 to-emerald-400 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-slate-400">
          {Math.max(0, Math.round(nextLevelXp - xp))} XP to next level
        </p>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-slate-900 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/40 backdrop-blur">
        <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-amber-500/10 blur-2xl" />
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-300">
          <Zap className="h-4 w-4 text-amber-300" />
          Active streak
        </div>
        <p className="text-3xl font-bold text-slate-50">1 day</p>
        <p className="text-xs text-slate-400">Keep it alive today.</p>
      </div>
    </div>
  );
}
