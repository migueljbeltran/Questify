"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-lg bg-slate-800/50", className)}
    />
  );
}

export function SkeletonText({ className }: SkeletonProps) {
  return <Skeleton className={cn("h-4 w-full", className)} />;
}

export function SkeletonCircle({ className }: SkeletonProps) {
  return <Skeleton className={cn("h-10 w-10 rounded-full", className)} />;
}

export function SkeletonCard({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-900 bg-slate-900/70 p-5",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <SkeletonCircle className="h-8 w-8" />
        <div className="flex-1 space-y-2">
          <SkeletonText className="h-3 w-16" />
          <SkeletonText className="h-5 w-24" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonChoreItem({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-900 bg-slate-900/60 p-4",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          <SkeletonText className="h-4 w-3/4" />
          <SkeletonText className="h-3 w-1/2" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-14 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-8 w-8 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonActivityItem({ className }: SkeletonProps) {
  return (
    <div className={cn("flex items-center gap-3 py-2", className)}>
      <SkeletonCircle className="h-6 w-6" />
      <div className="flex-1 space-y-1">
        <SkeletonText className="h-3 w-2/3" />
        <SkeletonText className="h-2 w-1/3" />
      </div>
    </div>
  );
}
