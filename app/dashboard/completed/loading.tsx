export default function CompletedLoading() {
  return (
    <div className="min-h-screen p-6 pt-16 md:pt-6">
      <div className="mx-auto max-w-2xl">
        {/* Header skeleton */}
        <header className="mb-8">
          <div className="h-8 w-40 animate-pulse rounded-md bg-white/[0.06]" />
          <div className="mt-4 flex items-center gap-6">
            <div className="h-4 w-20 animate-pulse rounded bg-white/[0.04]" />
            <div className="h-4 w-28 animate-pulse rounded bg-white/[0.04]" />
          </div>
        </header>

        {/* Date groups skeleton */}
        <div className="space-y-8">
          {[1, 2].map((group) => (
            <section key={group}>
              <div className="mb-3 h-3 w-24 animate-pulse rounded bg-white/[0.04]" />
              <ul className="space-y-1">
                {[1, 2, 3].map((i) => (
                  <li
                    key={i}
                    className="flex items-center gap-4 rounded-lg px-3 py-3"
                  >
                    <div className="h-5 w-5 animate-pulse rounded-full bg-white/[0.06]" />
                    <div
                      className="h-4 flex-1 animate-pulse rounded bg-white/[0.06]"
                      style={{ width: `${50 + ((i * 19) % 35)}%` }}
                    />
                    <div className="h-3 w-8 animate-pulse rounded bg-white/[0.04]" />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
