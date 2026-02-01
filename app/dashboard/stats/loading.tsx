export default function StatsLoading() {
  return (
    <div className="min-h-screen p-6 pt-16 md:pt-6">
      <div className="mx-auto max-w-2xl">
        {/* Header skeleton */}
        <header className="mb-12">
          <div className="h-8 w-20 animate-pulse rounded-md bg-white/[0.06]" />
        </header>

        {/* Level section skeleton */}
        <section className="mb-12">
          <div className="mb-4 flex items-baseline gap-3">
            <div className="h-12 w-16 animate-pulse rounded-md bg-white/[0.06]" />
            <div className="h-4 w-10 animate-pulse rounded bg-white/[0.04]" />
          </div>
          <div className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-2/5 animate-pulse rounded-full bg-white/[0.06]" />
          </div>
          <div className="h-4 w-32 animate-pulse rounded bg-white/[0.04]" />
        </section>

        {/* Stats grid skeleton */}
        <section className="mb-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <div className="h-7 w-16 animate-pulse rounded bg-white/[0.06]" />
              <div className="mt-1 h-3 w-14 animate-pulse rounded bg-white/[0.04]" />
            </div>
          ))}
        </section>

        {/* Top quest skeleton */}
        <section>
          <div className="mb-2 h-3 w-28 animate-pulse rounded bg-white/[0.04]" />
          <div className="h-5 w-48 animate-pulse rounded bg-white/[0.06]" />
          <div className="mt-1 h-4 w-16 animate-pulse rounded bg-white/[0.04]" />
        </section>
      </div>
    </div>
  );
}
