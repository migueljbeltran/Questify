"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={cn("bg-surface-2 animate-pulse rounded-md", className)} />
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
        "border-border bg-surface-1 rounded-lg border p-4",
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
    <div className={cn("rounded-md px-2 py-2.5", className)}>
      <div className="flex items-center gap-3">
        <Skeleton className="h-5 w-5 rounded-full" />
        <div className="flex-1 space-y-1">
          <SkeletonText className="h-4 w-3/4" />
          <SkeletonText className="h-3 w-1/2" />
        </div>
        <Skeleton className="h-5 w-12 rounded-md" />
      </div>
    </div>
  );
}

export function SkeletonActivityItem({ className }: SkeletonProps) {
  return (
    <div className={cn("flex items-center gap-3 py-2", className)}>
      <SkeletonCircle className="h-5 w-5" />
      <div className="flex-1 space-y-1">
        <SkeletonText className="h-3 w-2/3" />
        <SkeletonText className="h-2 w-1/3" />
      </div>
    </div>
  );
}
