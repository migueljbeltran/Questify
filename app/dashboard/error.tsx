"use client";

import { useEffect } from "react";
import Link from "next/link";
import * as Sentry from "@sentry/nextjs";

export default function DashboardError({
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
    <div className="min-h-screen p-6">
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="max-w-md space-y-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg bg-red-500/15">
            <span className="text-2xl text-red-400">!</span>
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-semibold">Dashboard Error</h1>
            <p className="text-muted-foreground text-sm">
              We could not load your dashboard. This might be a temporary issue.
            </p>
          </div>
          <div className="flex justify-center gap-3">
            <button
              onClick={reset}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-5 py-2 text-sm font-medium"
            >
              Try again
            </button>
            <Link
              href="/"
              className="border-border bg-surface-1 hover:bg-surface-2 rounded-md border px-5 py-2 text-sm font-medium"
            >
              Go home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
