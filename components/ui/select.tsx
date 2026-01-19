"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const selectVariants = cva(
  "w-full appearance-none border-b bg-transparent px-0 py-3 pr-8 text-sm transition-colors outline-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
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

export interface SelectProps
  extends
    React.SelectHTMLAttributes<HTMLSelectElement>,
    VariantProps<typeof selectVariants> {}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(selectVariants({ variant, className }))}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          className="pointer-events-none absolute top-1/2 right-0 h-4 w-4 -translate-y-1/2 text-white/30"
          aria-hidden="true"
        />
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select, selectVariants };
