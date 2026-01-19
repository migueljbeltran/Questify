"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const labelVariants = cva(
  "text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      variant: {
        default: "text-white/50",
        muted: "text-white/30",
        error: "text-red-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface LabelProps
  extends
    React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(labelVariants({ variant, className }))}
        {...props}
      />
    );
  }
);

Label.displayName = "Label";

export { Label, labelVariants };
