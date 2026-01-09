export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-700 border-t-sky-500" />
        <span className="text-slate-400">Loading...</span>
      </div>
    </div>
  );
}
