import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
      <div className="border-border text-muted-foreground rounded-lg border border-dashed px-4 py-8 text-center text-xs">
        No recent activity yet. Complete a quest to see it here.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="hover:bg-surface-1 flex items-start gap-3 rounded-md px-3 py-2 transition-colors"
        >
          <div className="mt-0.5">
            <CheckCircle2 className="text-xp h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-foreground truncate text-sm">
              {activity.chores?.title || "Unknown Quest"}
            </p>
            <div className="text-muted-foreground mt-1 flex items-center gap-2 text-xs">
              <Badge variant="xp" size="sm">
                +{activity.xp_awarded} XP
              </Badge>
              <span>
                {new Date(activity.completed_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
