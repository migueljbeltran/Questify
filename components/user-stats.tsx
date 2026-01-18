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
        <div className="bg-level/15 flex h-8 w-8 items-center justify-center rounded-md">
          <Trophy className="text-level h-4 w-4" aria-hidden="true" />
        </div>
        <div>
          <p className="text-muted-foreground text-xs">Level</p>
          <p className="text-foreground font-mono text-lg font-semibold">
            {level}
          </p>
        </div>
      </div>

      {/* XP with progress */}
      <div className="flex items-center gap-3">
        <div className="bg-xp/15 flex h-8 w-8 items-center justify-center rounded-md">
          <Star className="text-xp h-4 w-4" aria-hidden="true" />
        </div>
        <div className="w-32">
          <div className="flex items-baseline gap-1">
            <span className="text-xp font-mono text-sm font-semibold">
              {xp}
            </span>
            <span className="text-muted-foreground text-xs">XP</span>
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
        <div className="bg-streak/15 flex h-8 w-8 items-center justify-center rounded-md">
          <Zap className="text-streak h-4 w-4" aria-hidden="true" />
        </div>
        <div>
          <p className="text-muted-foreground text-xs">Streak</p>
          <p className="text-foreground font-mono text-lg font-semibold">
            1 day
          </p>
        </div>
      </div>
    </section>
  );
}
