import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { UserStats } from '@/components/user-stats'
import { ChoreList } from '@/components/chore-list'
import { AddChore } from '@/components/add-chore-dialog'
import { DashboardHeader } from '@/components/dashboard-header'
import { RecentActivity } from '@/components/recent-activity'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  // Fetch user profile, chores, and recent completions in parallel
  const [profileResult, choresResult, completionsResult] = await Promise.all([
    supabase.from('users').select('*').eq('id', user.id).single(),
    supabase
      .from('chores')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false }),
    supabase
      .from('chore_completions')
      .select('*, chores(title)')
      .eq('user_id', user.id)
      .order('completed_at', { ascending: false })
      .limit(5),
  ])

  const profile = profileResult.data
  const chores = choresResult.data || []
  // @ts-ignore - Supabase types join inference can be tricky, casting for now
  const completions = (completionsResult.data || []) as any[]

  // If profile doesn't exist (e.g. old user), use default
  const xp = profile?.xp || 0

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <DashboardHeader email={user.email || ''} />

        <UserStats xp={xp} />

        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Active Quests</h2>
              <AddChore />
            </div>
            <ChoreList chores={chores} />
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <h3 className="text-sm font-medium text-slate-400 mb-4">Recent Activity</h3>
              <RecentActivity activities={completions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
