import { Check } from "lucide-react";

interface Activity {
  id: string;
  xp_awarded: number;
  completed_at: string;
  chores: {
    title: string;
  } | null;
}

interface RecentActivityProps {
  activities: Activity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  if (activities.length === 0) {
    return (
      <div className="py-8 text-center text-xs text-white/30">
        No recent activity
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-white/[0.03]"
        >
          <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-400/20">
            <Check className="h-2.5 w-2.5 text-emerald-400" />
          </div>
          <span className="flex-1 truncate text-xs text-white/60">
            {activity.chores?.title || "Unknown"}
          </span>
          <span className="font-mono text-[10px] text-emerald-400/50">
            +{activity.xp_awarded}
          </span>
        </div>
      ))}
    </div>
  );
}
