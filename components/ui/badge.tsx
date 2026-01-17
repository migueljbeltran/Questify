"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full font-semibold transition-all duration-200",
  {
    variants: {
      variant: {
        default: "border border-border/50 bg-surface-2 text-foreground",
        xp: "border border-xp/30 bg-xp/10 text-xp shadow-[0_0_10px_rgba(52,211,153,0.15)]",
        level:
          "border border-level/30 bg-level/10 text-level shadow-[0_0_10px_rgba(96,165,250,0.15)]",
        streak:
          "border border-streak/30 bg-streak/10 text-streak shadow-[0_0_10px_rgba(251,191,36,0.15)]",
        primary:
          "border border-violet-500/30 bg-violet-500/10 text-violet-400 shadow-[0_0_10px_rgba(139,92,246,0.15)]",
        success:
          "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
        warning: "border border-amber-500/30 bg-amber-500/10 text-amber-400",
        danger: "border border-red-500/30 bg-red-500/10 text-red-400",
      },
      size: {
        sm: "px-2 py-0.5 text-[10px]",
        md: "px-2.5 py-1 text-[11px]",
        lg: "px-3 py-1.5 text-xs",
      },
      glow: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "xp",
        glow: true,
        className: "shadow-[0_0_15px_rgba(52,211,153,0.3)]",
      },
      {
        variant: "level",
        glow: true,
        className: "shadow-[0_0_15px_rgba(96,165,250,0.3)]",
      },
      {
        variant: "streak",
        glow: true,
        className: "shadow-[0_0_15px_rgba(251,191,36,0.3)]",
      },
      {
        variant: "primary",
        glow: true,
        className: "shadow-[0_0_15px_rgba(139,92,246,0.3)]",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
      glow: false,
    },
  }
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, glow, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, size, glow, className }))}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
