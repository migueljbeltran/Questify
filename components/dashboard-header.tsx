'use client'

import { LogOut } from 'lucide-react'
import { logout } from '@/app/login/actions'

interface DashboardHeaderProps {
    email: string
}

export function DashboardHeader({ email }: DashboardHeaderProps) {
    return (
        <header className="flex items-center justify-between mb-8">
            <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Quest Board</h1>
                <p className="text-sm text-slate-400">Logged in as {email}</p>
            </div>
            <button
                onClick={() => logout()}
                className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
                <LogOut className="w-4 h-4" />
                Sign Out
            </button>
        </header>
    )
}
