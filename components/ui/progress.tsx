"use client";

import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
  animate?: boolean;
  variant?: "default" | "xp" | "level" | "streak" | "primary";
  showShimmer?: boolean;
  size?: "sm" | "md" | "lg";
}

const variantStyles = {
  default: "from-indigo-500 via-violet-500 to-purple-500",
  primary: "from-indigo-500 via-violet-500 to-purple-500",
  xp: "from-emerald-500 to-teal-400",
  level: "from-blue-500 to-cyan-400",
  streak: "from-amber-500 to-orange-400",
};

const glowStyles = {
  default: "shadow-violet-500/30",
  primary: "shadow-violet-500/30",
  xp: "shadow-xp-glow/40",
  level: "shadow-level-glow/40",
  streak: "shadow-streak-glow/40",
};

const sizeStyles = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
};

export function Progress({
  value,
  max = 100,
  className,
  showLabel = false,
  animate = true,
  variant = "xp",
  showShimmer = true,
  size = "md",
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "relative overflow-hidden rounded-full bg-surface-2/80",
          sizeStyles[size]
        )}
      >
        {/* Glow under the bar */}
        <div
          className={cn(
            "absolute inset-0 rounded-full opacity-50 blur-sm",
            `bg-gradient-to-r ${variantStyles[variant]}`
          )}
          style={{ width: `${percentage}%` }}
        />
        {/* Main progress bar */}
        <div
          className={cn(
            "relative h-full rounded-full bg-gradient-to-r shadow-lg",
            variantStyles[variant],
            glowStyles[variant],
            animate && "transition-all duration-500 ease-out"
          )}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        >
          {/* Shimmer effect */}
          {showShimmer && percentage > 0 && (
            <div className="absolute inset-0 overflow-hidden rounded-full">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
          )}
        </div>
      </div>
      {showLabel && (
        <div className="mt-1.5 flex justify-between font-mono text-xs text-muted-foreground">
          <span className={cn(variant === "xp" && "text-xp")}>{value}</span>
          <span>{max}</span>
        </div>
      )}
    </div>
  );
}
