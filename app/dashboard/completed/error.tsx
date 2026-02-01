"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

export default function CompletedError({
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
    <div className="min-h-screen p-6 pt-16 md:pt-6">
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="max-w-sm space-y-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
            <span className="text-xl text-red-400">!</span>
          </div>
          <div className="space-y-2">
            <h1 className="text-lg font-semibold">
              Could not load completion history
            </h1>
            <p className="text-sm text-white/40">
              Something went wrong fetching your completed quests. This is
              likely temporary.
            </p>
          </div>
          <button
            onClick={reset}
            className="rounded-full bg-violet-500/20 px-6 py-2 text-sm font-medium text-violet-300 transition-all hover:scale-105 hover:bg-violet-500/30"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
