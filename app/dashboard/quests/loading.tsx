export default function QuestsLoading() {
  return (
    <div className="min-h-screen p-6 pt-16 md:pt-6">
      <div className="mx-auto max-w-2xl">
        {/* Header skeleton */}
        <header className="mb-8">
          <div className="h-8 w-36 animate-pulse rounded-md bg-white/[0.06]" />
          <div className="mt-2 h-4 w-20 animate-pulse rounded-md bg-white/[0.04]" />
        </header>

        {/* Action button skeleton */}
        <div className="mb-6 flex justify-end">
          <div className="h-9 w-28 animate-pulse rounded-full bg-white/[0.06]" />
        </div>

        {/* Quest list skeleton */}
        <div className="space-y-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex items-center gap-4 rounded-xl px-3 py-3"
            >
              <div className="h-5 w-5 animate-pulse rounded-full bg-white/[0.06]" />
              <div className="min-w-0 flex-1 space-y-1.5">
                <div
                  className="h-4 animate-pulse rounded bg-white/[0.06]"
                  style={{ width: `${60 + ((i * 17) % 30)}%` }}
                />
                <div
                  className="h-3 animate-pulse rounded bg-white/[0.03]"
                  style={{ width: `${40 + ((i * 13) % 25)}%` }}
                />
              </div>
              <div className="h-4 w-10 animate-pulse rounded bg-white/[0.04]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
