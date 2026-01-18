"use client";

interface DashboardHeaderProps {
  title?: string;
  subtitle?: string;
}

export function DashboardHeader({
  title = "Today",
  subtitle,
}: DashboardHeaderProps) {
  return (
    <header className="mb-6">
      <h1 className="text-foreground text-2xl font-semibold">{title}</h1>
      {subtitle && (
        <p className="text-muted-foreground mt-1 text-sm">{subtitle}</p>
      )}
    </header>
  );
}
