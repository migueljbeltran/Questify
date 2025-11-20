'use client'

import { useState } from 'react'
import { Plus, Loader2, X } from 'lucide-react'
import { addChore } from '@/app/dashboard/actions'

export function AddChore() {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(formData: FormData) {
        setIsLoading(true)
        await addChore(formData)
        setIsLoading(false)
        setIsOpen(false)
    }

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 rounded-lg font-medium text-sm transition-colors"
            >
                <Plus className="w-4 h-4" />
                New Quest
            </button>
        )
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-white">New Quest</h3>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-slate-400 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form action={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="title" className="text-xs font-medium text-slate-300">
                            Quest Title
                        </label>
                        <input
                            id="title"
                            name="title"
                            required
                            placeholder="e.g. Wash the dishes"
                            className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="description" className="text-xs font-medium text-slate-300">
                            Description (Optional)
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows={3}
                            placeholder="Details about the quest..."
                            className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none resize-none"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="xp" className="text-xs font-medium text-slate-300">
                            XP Reward
                        </label>
                        <select
                            id="xp"
                            name="xp"
                            className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none"
                        >
                            <option value="10">10 XP (Easy)</option>
                            <option value="20">20 XP (Medium)</option>
                            <option value="50">50 XP (Hard)</option>
                            <option value="100">100 XP (Epic)</option>
                        </select>
                    </div>

                    <div className="flex gap-3 mt-6">
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-medium text-sm transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 rounded-lg font-medium text-sm transition-colors disabled:opacity-50"
                        >
                            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                            Create Quest
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
