import { CheckCircle2 } from 'lucide-react'

interface Activity {
    id: string
    xp_awarded: number
    completed_at: string
    chores: {
        title: string
    } | null
}

interface RecentActivityProps {
    activities: Activity[]
}

export function RecentActivity({ activities }: RecentActivityProps) {
    if (activities.length === 0) {
        return (
            <div className="text-center py-8 text-xs text-slate-500">
                No recent activity to show.
                <br />
                Complete a quest to see it here!
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {activities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                    <div className="mt-0.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-300">
                            Completed <span className="font-medium text-white">{activity.chores?.title || 'Unknown Quest'}</span>
                        </p>
                        <p className="text-xs text-slate-500">
                            +{activity.xp_awarded} XP • {new Date(activity.completed_at).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}
