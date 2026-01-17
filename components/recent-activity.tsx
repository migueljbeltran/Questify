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
      <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 px-4 py-8 text-center text-xs text-slate-400">
        No recent activity yet. Complete a quest to see it here.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="flex items-start gap-3 rounded-xl border border-slate-900 bg-slate-900/60 px-3 py-3 shadow-sm shadow-slate-950/30"
        >
          <div className="mt-0.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-slate-200">
              Completed{" "}
              <span className="font-semibold text-slate-50">
                {activity.chores?.title || "Unknown Quest"}
              </span>
            </p>
            <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
              <Badge variant="success" size="sm">
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
