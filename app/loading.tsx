export default function Loading() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      <div className="flex items-center gap-3">
        <div className="border-surface-2 border-t-primary h-6 w-6 animate-spin rounded-full border-2" />
        <span className="text-muted-foreground text-sm">Loading...</span>
      </div>
    </div>
  );
}
