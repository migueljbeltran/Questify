// app/page.tsx
"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      {/* Top nav */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-xl bg-gradient-to-tr from-sky-500 to-emerald-400 flex items-center justify-center text-xs font-bold">
              QF
            </div>
            <span className="text-sm font-semibold tracking-tight">
              Questify
            </span>
          </div>
          <nav className="flex items-center gap-4 text-xs">
            <a href="#features" className="text-slate-300 hover:text-slate-100">
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-slate-300 hover:text-slate-100"
            >
              How it works
            </a>
            <Link
              href="/login"
              className="rounded-md border border-slate-700 px-3 py-1 hover:bg-slate-800"
            >
              Log in
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1">
        <div className="max-w-5xl mx-auto px-4 py-12 lg:py-16 grid gap-10 lg:grid-cols-2 items-center">
          <div className="space-y-5">
            <p className="inline-flex items-center rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-[10px] font-medium text-slate-300">
              New • Turn chores into XP
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
              Make your chores
              <span className="block text-sky-400">feel like a game.</span>
            </h1>
            <p className="text-sm leading-relaxed text-slate-300 max-w-md">
              Questify turns your household tasks into quests with XP, levels,
              streaks, and AI-generated chore plans. Share a board with your
              roommates and finally keep the apartment under control.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/login"
                className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-sky-400"
              >
                Start your first quest
              </Link>
              <a
                href="#features"
                className="text-xs text-slate-300 hover:text-slate-100 underline-offset-4 hover:underline"
              >
                Explore features
              </a>
            </div>

            <div className="flex flex-wrap gap-4 text-[10px] text-slate-400">
              <div className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                XP & level system
              </div>
              <div className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                AI chore assistant
              </div>
              <div className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                Built for roommates
              </div>
            </div>
          </div>

          {/* Mockup card */}
          <div className="relative">
            <div className="absolute -inset-6 bg-sky-500/10 blur-3xl rounded-3xl" />
            <div className="relative rounded-3xl border border-slate-800 bg-slate-900/80 p-4 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-[11px] text-slate-400">Household</p>
                  <p className="text-sm font-semibold">Room 42 — Quest Board</p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] text-slate-400">Level</p>
                  <p className="text-base font-semibold text-sky-400">7</p>
                </div>
              </div>

              {/* XP bar */}
              <div className="mb-4">
                <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                  <span>XP: 340 / 400</span>
                  <span>60 to next level</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-sky-400 to-emerald-400"
                    style={{ width: "85%" }}
                  />
                </div>
              </div>

              {/* Chores list mock */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2">
                  <div>
                    <p className="font-medium">Wash dishes</p>
                    <p className="text-[10px] text-slate-400">+10 XP • Daily</p>
                  </div>
                  <button className="rounded-full bg-emerald-500 px-3 py-1 text-[10px] font-semibold text-slate-950">
                    Complete
                  </button>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2">
                  <div>
                    <p className="font-medium">Vacuum living room</p>
                    <p className="text-[10px] text-slate-400">
                      +20 XP • Weekly
                    </p>
                  </div>
                  <button className="rounded-full border border-emerald-500/40 px-3 py-1 text-[10px] text-emerald-300">
                    In progress
                  </button>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2">
                  <div>
                    <p className="font-medium">Take out trash</p>
                    <p className="text-[10px] text-slate-400">
                      +8 XP • Assign to Miguel
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-500">Waiting…</span>
                </div>
              </div>

              {/* Tiny footer inside card */}
              <div className="mt-4 flex items-center justify-between text-[10px] text-slate-400">
                <span>🔥 4-day streak active</span>
                <span>Top this week: You</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="border-t border-slate-800 bg-slate-950"
      >
        <div className="max-w-5xl mx-auto px-4 py-10 space-y-4">
          <h2 className="text-sm font-semibold text-slate-100">
            How Questify works
          </h2>
          <p className="text-xs text-slate-400 max-w-md">
            Built for roommates, couples, and shared spaces that want less
            nagging and more accountability.
          </p>

          <div className="grid gap-4 sm:grid-cols-3 text-xs">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
              <p className="text-[10px] font-semibold text-sky-400 mb-1">
                1 • Create your household
              </p>
              <p className="text-slate-300">
                Spin up a shared board for your apartment and invite your
                roommates in one link.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
              <p className="text-[10px] font-semibold text-sky-400 mb-1">
                2 • Add (or generate) chores
              </p>
              <p className="text-slate-300">
                Define tasks manually or let the AI assistant create a tailored
                cleaning plan for your space.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
              <p className="text-[10px] font-semibold text-sky-400 mb-1">
                3 • Complete quests, earn XP
              </p>
              <p className="text-slate-300">
                Every completed chore gives XP, streak progress, and a clearer
                space. Leaderboards keep it fun.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-5xl mx-auto px-4 py-10 space-y-4">
          <h2 className="text-sm font-semibold text-slate-100">
            Features built for shared spaces
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-xs">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 space-y-1">
              <p className="font-semibold text-slate-100">
                XP, levels & streaks
              </p>
              <p className="text-slate-300">
                Every quest adds XP. Track streaks and unlock milestones to make
                progress visible.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 space-y-1">
              <p className="font-semibold text-slate-100">AI chore assistant</p>
              <p className="text-slate-300">
                Auto-generate chore lists and fair distributions so you
                don&apos;t argue about who does what.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 space-y-1">
              <p className="font-semibold text-slate-100">
                Roommate leaderboard
              </p>
              <p className="text-slate-300">
                See who&apos;s been carrying the house this week and who&apos;s
                due for a quest.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 space-y-1">
              <p className="font-semibold text-slate-100">Weekly AI reports</p>
              <p className="text-slate-300">
                Get playful summaries of what your household accomplished,
                delivered to your inbox.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 space-y-1">
              <p className="font-semibold text-slate-100">
                Calendar & reminders
              </p>
              <p className="text-slate-300">
                Sync recurring chores to your calendar so trash day and
                deep-clean sessions never sneak up.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 space-y-1">
              <p className="font-semibold text-slate-100">Mobile-friendly</p>
              <p className="text-slate-300">
                Designed to work beautifully on phones, tablets, and laptops for
                everyone in the house.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <footer className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            <p className="font-semibold text-slate-100">
              Ready to turn chores into quests?
            </p>
            <p className="text-slate-400">
              Create your first household and start earning XP today.
            </p>
          </div>
          <Link
            href="/login"
            className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-sky-400"
          >
            Get started
          </Link>
        </div>
      </footer>
    </main>
  );
}
