"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "w-full rounded-md border bg-background px-3 py-2 text-sm transition-colors outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-border focus:border-primary focus:ring-1 focus:ring-primary",
        error:
          "border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface InputProps
  extends
    React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, icon, type, ...props }, ref) => {
    if (icon) {
      return (
        <div className="relative">
          <div className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 -translate-y-1/2">
            {icon}
          </div>
          <input
            type={type}
            className={cn(inputVariants({ variant, className }), "pl-10")}
            ref={ref}
            {...props}
          />
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input, inputVariants };
