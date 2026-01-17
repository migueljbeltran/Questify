"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "relative overflow-hidden rounded-2xl border backdrop-blur transition-all duration-200",
  {
    variants: {
      variant: {
        default:
          "border-border/50 bg-surface-1 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset,0_4px_24px_rgba(0,0,0,0.4)]",
        elevated:
          "border-border/50 bg-gradient-to-br from-surface-1 to-surface-2 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset,0_4px_24px_rgba(0,0,0,0.4)]",
        interactive:
          "border-border/50 bg-gradient-to-br from-surface-1 to-surface-2 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset,0_4px_24px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(139,92,246,0.2)_inset,0_8px_32px_rgba(139,92,246,0.15)]",
        dashed:
          "border-dashed border-border/70 bg-surface-1/40 shadow-none",
        ghost: "border-transparent bg-transparent shadow-none",
      },
      padding: {
        none: "",
        sm: "p-4",
        md: "p-5",
        lg: "p-6",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
    },
  }
);

export interface CardProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  glow?: "primary" | "xp" | "streak" | "level" | "none";
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, glow = "none", children, ...props }, ref) => {
    return (
      <div
        className={cn(cardVariants({ variant, padding, className }))}
        ref={ref}
        {...props}
      >
        {glow !== "none" && (
          <div
            className={cn(
              "pointer-events-none absolute -top-6 -right-6 h-24 w-24 rounded-full blur-3xl",
              {
                "bg-violet-500/20": glow === "primary",
                "bg-xp/20": glow === "xp",
                "bg-streak/20": glow === "streak",
                "bg-level/20": glow === "level",
              }
            )}
            aria-hidden="true"
          />
        )}
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

const CardHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-lg font-semibold text-slate-50", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-slate-400", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

const CardContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-4", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants,
};
