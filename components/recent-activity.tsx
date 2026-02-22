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
      <div className="text-cream/30 py-8 text-center text-xs">
        No deeds recorded
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="hover:bg-surface-1 flex items-center gap-3 px-2 py-2 transition-colors"
        >
          <div className="bg-gold/20 flex h-4 w-4 shrink-0 items-center justify-center rounded-full">
            <Check className="text-gold h-2.5 w-2.5" />
          </div>
          <span className="text-cream/60 flex-1 truncate text-xs">
            {activity.chores?.title || "Unknown"}
          </span>
          <span className="text-gold/50 font-mono text-[10px]">
            +{activity.xp_awarded}g
          </span>
        </div>
      ))}
    </div>
  );
}
