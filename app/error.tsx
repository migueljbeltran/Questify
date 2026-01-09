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
      <body className="min-h-screen bg-slate-950 text-slate-50">
        <div className="flex min-h-screen items-center justify-center px-4">
          <div className="max-w-md space-y-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/20">
              <span className="text-3xl text-red-400">!</span>
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold">Something went wrong</h1>
              <p className="text-sm text-slate-400">
                We encountered an unexpected error. Please try again.
              </p>
            </div>
            <button
              onClick={reset}
              className="rounded-lg bg-gradient-to-r from-sky-500 to-emerald-400 px-6 py-2.5 text-sm font-semibold text-slate-950 transition hover:from-sky-400 hover:to-emerald-300"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
