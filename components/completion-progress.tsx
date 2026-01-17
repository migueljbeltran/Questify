"use client";

import { cn } from "@/lib/utils";

interface CompletionProgressProps {
  completed: number;
  total: number;
  className?: string;
}

export function CompletionProgress({
  completed,
  total,
  className,
}: CompletionProgressProps) {
  const isAllComplete = completed === total && total > 0;

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span
        className={cn(
          "text-xs font-medium uppercase tracking-wider",
          isAllComplete ? "text-xp" : "text-muted-foreground"
        )}
      >
        Completed
      </span>
      <span
        className={cn(
          "font-mono text-sm font-semibold",
          isAllComplete ? "text-xp" : "text-foreground"
        )}
      >
        {completed}/{total}
      </span>
      {isAllComplete && (
        <span className="text-xs text-xp">All done!</span>
      )}
    </div>
  );
}
