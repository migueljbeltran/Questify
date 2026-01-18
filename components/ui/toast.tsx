"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  forwardRef,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const toastVariants = cva(
  "pointer-events-auto relative flex w-full max-w-sm items-center gap-3 overflow-hidden rounded-lg border p-4 transition-all duration-300",
  {
    variants: {
      variant: {
        default: "border-border bg-surface-1 text-foreground",
        success: "border-xp/30 bg-xp/10 text-foreground",
        error: "border-red-500/30 bg-red-500/10 text-foreground",
        info: "border-primary/30 bg-primary/10 text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: "default" | "success" | "error" | "info";
  duration?: number;
}

interface ToastContextValue {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).slice(2);
    const newToast = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);

    const duration = toast.duration ?? 5000;
    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div
      className="pointer-events-none fixed right-0 bottom-0 z-50 flex max-h-screen w-full flex-col gap-2 p-4 sm:max-w-sm"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}

interface ToastItemProps extends VariantProps<typeof toastVariants> {
  toast: Toast;
  onClose: () => void;
}

const ToastItem = forwardRef<HTMLDivElement, ToastItemProps>(
  ({ toast, onClose }, ref) => {
    const Icon =
      toast.variant === "success"
        ? CheckCircle
        : toast.variant === "error"
          ? AlertCircle
          : toast.variant === "info"
            ? Info
            : null;

    return (
      <div
        ref={ref}
        className={cn(toastVariants({ variant: toast.variant }))}
        role="alert"
      >
        {Icon && (
          <Icon
            className={cn(
              "h-5 w-5 shrink-0",
              toast.variant === "success" && "text-xp",
              toast.variant === "error" && "text-red-400",
              toast.variant === "info" && "text-primary"
            )}
            aria-hidden="true"
          />
        )}
        <div className="flex-1 space-y-1">
          <p className="text-sm font-semibold">{toast.title}</p>
          {toast.description && (
            <p className="text-muted-foreground text-xs">{toast.description}</p>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:bg-surface-2 hover:text-foreground shrink-0 rounded-md p-1 transition"
          aria-label="Dismiss notification"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    );
  }
);

ToastItem.displayName = "ToastItem";

export { toastVariants };
