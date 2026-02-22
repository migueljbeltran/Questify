"use client";

import { getRankName } from "@/lib/utils";

interface UserStatsProps {
  xp: number;
  currentStreak: number;
  lastCompletionDate: string | null;
}

export function UserStats({
  xp,
  currentStreak,
  lastCompletionDate,
}: UserStatsProps) {
  const level = Math.floor(Math.sqrt(xp / 100)) || 1;
  const currentLevelXp = Math.pow(level, 2) * 100;
  const nextLevelXp = Math.pow(level + 1, 2) * 100;
  const xpProgress = xp - currentLevelXp;
  const xpNeeded = nextLevelXp - currentLevelXp;
  const progressPercent = Math.round((xpProgress / xpNeeded) * 100);
  const rankName = getRankName(level);

  const today = new Date().toISOString().split("T")[0];
  const streakAtRisk = lastCompletionDate !== today && currentStreak > 0;

  return (
    <div className="flex items-center gap-8" aria-label="Player statistics">
      {/* Rank / Level */}
      <div className="flex flex-col items-center gap-0.5">
        <div className="flex items-center gap-1.5">
          <span className="text-cream/40 text-xs">LV.</span>
          <span className="text-gold font-mono text-lg font-semibold">
            {level}
          </span>
        </div>
        <span className="font-display text-gold/60 text-[10px] tracking-widest uppercase">
          {rankName}
        </span>
      </div>

      {/* XP with mini progress */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-gold font-mono text-sm">{xp}</span>
          <span className="text-cream/40 text-xs">Gold</span>
        </div>
        <div className="bg-surface-2 h-1 w-20 overflow-hidden rounded-full">
          <div
            className="bg-gold/60 h-full transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Vigilance (streak) */}
      <div className="flex items-center gap-2">
        <span
          className={`font-mono text-sm ${streakAtRisk ? "animate-pulse text-amber-500" : "text-amber-400"}`}
        >
          {currentStreak}
        </span>
        <span className="text-cream/40 text-xs">
          Vigilance{streakAtRisk && " ⚠️"}
        </span>
      </div>
    </div>
  );
}
