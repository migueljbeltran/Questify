"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "w-full border-b bg-transparent px-0 py-3 text-sm transition-colors outline-none placeholder:text-white/30 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-white/10 focus:border-white/30",
        error: "border-red-500/50 focus:border-red-500",
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
          <div className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 text-white/30">
            {icon}
          </div>
          <input
            type={type}
            className={cn(inputVariants({ variant, className }), "pl-8")}
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
