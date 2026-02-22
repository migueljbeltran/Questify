"use client";

import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
  variant?: "default" | "xp" | "level" | "streak" | "primary" | "gold";
  size?: "sm" | "md" | "lg";
}

const variantStyles = {
  default: "bg-gold",
  primary: "bg-gold",
  gold: "bg-gold",
  xp: "bg-gold",
  level: "bg-gold",
  streak: "bg-amber-400",
};

const sizeStyles = {
  sm: "h-1",
  md: "h-2",
  lg: "h-3",
};

export function Progress({
  value,
  max = 100,
  className,
  showLabel = false,
  variant = "xp",
  size = "md",
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "bg-surface-2 relative overflow-hidden rounded-full",
          sizeStyles[size]
        )}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-300 ease-out",
            variantStyles[variant]
          )}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
      {showLabel && (
        <div className="text-cream/60 mt-1 flex justify-between font-mono text-xs">
          <span className="text-gold">{value}</span>
          <span>{max}</span>
        </div>
      )}
    </div>
  );
}
