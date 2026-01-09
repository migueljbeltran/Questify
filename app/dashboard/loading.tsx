export default function DashboardLoading() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-10">
        {/* Header skeleton */}
        <div className="h-32 animate-pulse rounded-3xl bg-slate-900/70" />

        {/* Content skeleton */}
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <div className="h-16 animate-pulse rounded-2xl bg-slate-900/70" />
            <div className="h-64 animate-pulse rounded-3xl bg-slate-900/70" />
          </div>
          <div className="space-y-6">
            <div className="h-48 animate-pulse rounded-3xl bg-slate-900/70" />
            <div className="h-48 animate-pulse rounded-3xl bg-slate-900/70" />
          </div>
        </div>
      </div>
    </main>
  );
}
