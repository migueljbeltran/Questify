"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-background text-foreground min-h-screen">
        <div className="flex min-h-screen items-center justify-center px-4">
          <div className="max-w-md space-y-6 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg bg-red-500/15">
              <span className="text-2xl text-red-400">!</span>
            </div>
            <div className="space-y-2">
              <h1 className="text-xl font-semibold">Something went wrong</h1>
              <p className="text-muted-foreground text-sm">
                We encountered an unexpected error. Please try again.
              </p>
            </div>
            <button
              onClick={reset}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-5 py-2 text-sm font-medium"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
