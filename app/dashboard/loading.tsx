export default function DashboardLoading() {
  return (
    <div className="min-h-screen p-6 pt-16 md:pt-6">
      <div className="mx-auto max-w-4xl">
        {/* Header skeleton */}
        <div className="mb-6">
          <div className="h-8 w-24 animate-pulse rounded-md bg-surface-2" />
          <div className="mt-2 h-4 w-48 animate-pulse rounded-md bg-surface-2" />
        </div>

        {/* Stats skeleton */}
        <div className="mb-8 flex gap-6 border-b border-border pb-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 animate-pulse rounded-md bg-surface-2" />
            <div className="space-y-1">
              <div className="h-3 w-10 animate-pulse rounded bg-surface-2" />
              <div className="h-5 w-8 animate-pulse rounded bg-surface-2" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 animate-pulse rounded-md bg-surface-2" />
            <div className="w-32 space-y-1">
              <div className="h-4 w-16 animate-pulse rounded bg-surface-2" />
              <div className="h-2 w-full animate-pulse rounded-full bg-surface-2" />
            </div>
          </div>
        </div>

        {/* Content skeleton */}
        <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-6 w-32 animate-pulse rounded bg-surface-2" />
              <div className="h-8 w-24 animate-pulse rounded-md bg-surface-2" />
            </div>
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3 rounded-md px-2 py-2.5">
                  <div className="h-5 w-5 animate-pulse rounded-full bg-surface-2" />
                  <div className="flex-1 space-y-1">
                    <div className="h-4 w-3/4 animate-pulse rounded bg-surface-2" />
                    <div className="h-3 w-1/2 animate-pulse rounded bg-surface-2" />
                  </div>
                  <div className="h-5 w-12 animate-pulse rounded-md bg-surface-2" />
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-4 w-24 animate-pulse rounded bg-surface-2" />
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3 py-2">
                  <div className="h-4 w-4 animate-pulse rounded-full bg-surface-2" />
                  <div className="flex-1 space-y-1">
                    <div className="h-3 w-2/3 animate-pulse rounded bg-surface-2" />
                    <div className="h-2 w-1/3 animate-pulse rounded bg-surface-2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
