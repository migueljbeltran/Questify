"use client";

import {
  forwardRef,
  useEffect,
  useRef,
  createContext,
  useContext,
} from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DialogContextValue {
  onClose: () => void;
}

const DialogContext = createContext<DialogContextValue | null>(null);

function useDialogContext() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("Dialog components must be used within a Dialog");
  }
  return context;
}

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

function Dialog({ open, onOpenChange, children }: DialogProps) {
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape" && open) {
        onOpenChange(false);
      }
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      previousFocusRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <DialogContext.Provider value={{ onClose: () => onOpenChange(false) }}>
      {children}
    </DialogContext.Provider>
  );
}

const DialogOverlay = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { onClose } = useDialogContext();

  return (
    <div
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-sm",
        className
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      {...props}
    />
  );
});

DialogOverlay.displayName = "DialogOverlay";

const DialogContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const firstInput = contentRef.current?.querySelector<HTMLElement>(
      "input, button, textarea, select, [tabindex]:not([tabindex='-1'])"
    );
    setTimeout(() => firstInput?.focus(), 50);
  }, []);

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      className={cn(
        "relative w-full max-w-sm rounded-2xl bg-white/[0.03] p-6 backdrop-blur-xl",
        className
      )}
      {...props}
    >
      <div ref={contentRef} className="relative">
        {children}
      </div>
    </div>
  );
});

DialogContent.displayName = "DialogContent";

const DialogHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mb-6 flex items-center justify-between", className)}
    {...props}
  />
));

DialogHeader.displayName = "DialogHeader";

const DialogTitle = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-lg font-semibold", className)} {...props} />
));

DialogTitle.displayName = "DialogTitle";

type DialogCloseProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ className, children, ...props }, ref) => {
    const { onClose } = useDialogContext();

    if (children) {
      return (
        <button ref={ref} onClick={onClose} className={className} {...props}>
          {children}
        </button>
      );
    }

    return (
      <button
        ref={ref}
        onClick={onClose}
        aria-label="Close dialog"
        className={cn(
          "rounded-full p-1.5 text-white/40 transition-colors hover:bg-white/10 hover:text-white",
          className
        )}
        {...props}
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    );
  }
);

DialogClose.displayName = "DialogClose";

const DialogFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex gap-3 pt-6", className)} {...props} />
));

DialogFooter.displayName = "DialogFooter";

export {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
};
