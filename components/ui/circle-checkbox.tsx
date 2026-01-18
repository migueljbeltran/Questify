"use client";

import { forwardRef } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CircleCheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
}

const CircleCheckbox = forwardRef<HTMLButtonElement, CircleCheckboxProps>(
  (
    { checked = false, onChange, disabled = false, className, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        role="checkbox"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-150",
          checked
            ? "border-xp bg-xp text-white"
            : "border-border hover:border-xp/60 hover:bg-xp/10 bg-transparent",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
        {...props}
      >
        {checked && (
          <Check className="animate-check h-3 w-3" aria-hidden="true" />
        )}
      </button>
    );
  }
);

CircleCheckbox.displayName = "CircleCheckbox";

export { CircleCheckbox };
