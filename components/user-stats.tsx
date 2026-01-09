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
  const xpToNextLevel = Math.max(0, Math.round(nextLevelXp - xp));

  return (
    <section
      aria-label="Player statistics"
      className="grid gap-4 md:grid-cols-3"
    >
      {/* Level Card */}
      <article className="relative overflow-hidden rounded-2xl border border-slate-900 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/40 backdrop-blur">
        <div
          className="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-sky-500/10 blur-2xl"
          aria-hidden="true"
        />
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-300">
          <Trophy className="h-4 w-4 text-sky-400" aria-hidden="true" />
          <span>Current level</span>
        </div>
        <p
          className="text-3xl font-bold text-slate-50"
          aria-label={`Level ${level}`}
        >
          {level}
        </p>
        <p className="text-xs text-slate-400">Adventurer</p>
      </article>

      {/* XP Card */}
      <article className="relative overflow-hidden rounded-2xl border border-slate-900 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/40 backdrop-blur">
        <div
          className="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-emerald-500/10 blur-2xl"
          aria-hidden="true"
        />
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-300">
          <Star className="h-4 w-4 text-emerald-300" aria-hidden="true" />
          <span>Experience</span>
        </div>
        <div className="flex items-end gap-2">
          <span className="text-3xl font-bold text-slate-50">{xp}</span>
          <span className="mb-1 text-sm text-slate-400">
            / {nextLevelXp} XP
          </span>
        </div>
        <div
          className="mt-3 h-2 w-full rounded-full bg-slate-800"
          role="progressbar"
          aria-valuenow={xpProgress}
          aria-valuemin={0}
          aria-valuemax={xpNeeded}
          aria-label={`XP progress: ${xpProgress} of ${xpNeeded} to next level`}
        >
          <div
            className="h-2 rounded-full bg-gradient-to-r from-sky-400 to-emerald-400 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-slate-400">
          {xpToNextLevel} XP to next level
        </p>
      </article>

      {/* Streak Card */}
      <article className="relative overflow-hidden rounded-2xl border border-slate-900 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/40 backdrop-blur">
        <div
          className="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-amber-500/10 blur-2xl"
          aria-hidden="true"
        />
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-300">
          <Zap className="h-4 w-4 text-amber-300" aria-hidden="true" />
          <span>Active streak</span>
        </div>
        <p
          className="text-3xl font-bold text-slate-50"
          aria-label="1 day streak"
        >
          1 day
        </p>
        <p className="text-xs text-slate-400">Keep it alive today.</p>
      </article>
    </section>
  );
}
