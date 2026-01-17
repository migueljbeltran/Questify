"use client";

import { Trophy, Star, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";

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
  const xpToNextLevel = Math.max(0, Math.round(nextLevelXp - xp));

  return (
    <section
      aria-label="Player statistics"
      className="flex flex-wrap items-center gap-6"
    >
      {/* Level */}
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-level/15">
          <Trophy className="h-4 w-4 text-level" aria-hidden="true" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Level</p>
          <p className="font-mono text-lg font-semibold text-foreground">
            {level}
          </p>
        </div>
      </div>

      {/* XP with progress */}
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-xp/15">
          <Star className="h-4 w-4 text-xp" aria-hidden="true" />
        </div>
        <div className="w-32">
          <div className="flex items-baseline gap-1">
            <span className="font-mono text-sm font-semibold text-xp">{xp}</span>
            <span className="text-xs text-muted-foreground">XP</span>
          </div>
          <Progress
            value={xpProgress}
            max={xpNeeded}
            variant="xp"
            size="sm"
            className="mt-1"
            aria-label={`${xpToNextLevel} XP to next level`}
          />
        </div>
      </div>

      {/* Streak */}
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-streak/15">
          <Zap className="h-4 w-4 text-streak" aria-hidden="true" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Streak</p>
          <p className="font-mono text-lg font-semibold text-foreground">
            1 day
          </p>
        </div>
      </div>
    </section>
  );
}
