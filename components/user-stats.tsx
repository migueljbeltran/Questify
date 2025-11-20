"use client";

import { Zap, Trophy, Star } from "lucide-react";

interface UserStatsProps {
  xp: number;
}

export function UserStats({ xp }: UserStatsProps) {
  // Level = floor(sqrt(xp/100))
  // Inverse: XP = level^2 * 100
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
    <div className="grid gap-4 md:grid-cols-3 mb-8">
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Trophy className="w-16 h-16 text-sky-500" />
        </div>
        <h3 className="text-sm font-medium text-slate-400 flex items-center gap-2">
          <Trophy className="w-4 h-4 text-sky-500" />
          Current Level
        </h3>
        <p className="text-3xl font-bold mt-2 text-white">{level}</p>
        <p className="text-xs text-slate-500 mt-1">Adventurer</p>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Star className="w-16 h-16 text-emerald-500" />
        </div>
        <h3 className="text-sm font-medium text-slate-400 flex items-center gap-2">
          <Star className="w-4 h-4 text-emerald-500" />
          Experience
        </h3>
        <div className="mt-2">
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-white">{xp}</span>
            <span className="text-sm text-slate-500 mb-1">
              / {nextLevelXp} XP
            </span>
          </div>
          <div className="mt-3 h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 mt-2">
            {Math.round(nextLevelXp - xp)} XP to next level
          </p>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Zap className="w-16 h-16 text-amber-500" />
        </div>
        <h3 className="text-sm font-medium text-slate-400 flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-500" />
          Active Streak
        </h3>
        <p className="text-3xl font-bold mt-2 text-white">1 Day</p>
        <p className="text-xs text-slate-500 mt-1">Keep it up!</p>
      </div>
    </div>
  );
}
