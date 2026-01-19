"use client";

interface UserStatsProps {
  xp: number;
}

export function UserStats({ xp }: UserStatsProps) {
  // Level = floor(sqrt(xp/100))
  const level = Math.floor(Math.sqrt(xp / 100)) || 1;
  const currentLevelXp = Math.pow(level, 2) * 100;
  const nextLevelXp = Math.pow(level + 1, 2) * 100;
  const xpProgress = xp - currentLevelXp;
  const xpNeeded = nextLevelXp - currentLevelXp;
  const progressPercent = Math.round((xpProgress / xpNeeded) * 100);

  return (
    <div className="flex items-center gap-8" aria-label="Player statistics">
      {/* Level */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-white/40">LVL</span>
        <span className="font-mono text-lg font-semibold text-blue-400">
          {level}
        </span>
      </div>

      {/* XP with mini progress */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm text-emerald-400">{xp}</span>
          <span className="text-xs text-white/40">XP</span>
        </div>
        <div className="h-1 w-20 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full bg-emerald-400/60 transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Streak */}
      <div className="flex items-center gap-2">
        <span className="font-mono text-sm text-amber-400">1</span>
        <span className="text-xs text-white/40">day streak</span>
      </div>
    </div>
  );
}
