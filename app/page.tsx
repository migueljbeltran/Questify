// app/page.tsx
"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="relative overflow-hidden">
        {/* Background glows */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-sky-500/20 blur-3xl" />
          <div className="absolute top-24 right-0 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        </div>

        <header className="relative border-b border-slate-900/60 bg-slate-950/70 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-tr from-sky-500 to-emerald-400 text-sm font-black text-slate-950 shadow-lg shadow-sky-900/40">
                QF
              </div>
              <div className="leading-tight">
                <p className="text-sm font-semibold tracking-tight">Questify</p>
                <p className="text-[11px] text-slate-400">Productivity RPG</p>
              </div>
            </div>
            <nav className="hidden items-center gap-4 text-xs text-slate-200 sm:flex">
              <a href="#how-it-works" className="hover:text-sky-100">
                How it works
              </a>
              <a href="#features" className="hover:text-sky-100">
                Features
              </a>
              <a href="#rewards" className="hover:text-sky-100">
                Rewards
              </a>
              <Link
                href="/login"
                className="rounded-lg border border-slate-800 px-3 py-1.5 font-medium hover:border-slate-700 hover:bg-slate-900"
              >
                Log in
              </Link>
            </nav>
          </div>
        </header>

        {/* Hero */}
        <section className="relative">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 pt-10 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-16">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/70 px-3 py-1 text-[11px] font-medium text-slate-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                New season: turn your day into quests
              </span>

              <div className="space-y-3">
                <h1 className="text-3xl leading-tight font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                  Make productivity feel like an RPG.
                  <span className="block text-sky-400">
                    Quests, XP, streaks, and rewards.
                  </span>
                </h1>
                <p className="max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
                  Questify turns tasks into quests with XP, levels, and streaks.
                  Sync your calendar, get suggested quests, and unlock cosmetic
                  rewards as you level up.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/login"
                  className="rounded-xl bg-gradient-to-r from-sky-500 to-emerald-400 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-900/40 transition hover:from-sky-400 hover:to-emerald-300"
                >
                  Start your first quest
                </Link>
                <a
                  href="#how-it-works"
                  className="text-sm font-semibold text-slate-200 underline-offset-4 hover:text-sky-100 hover:underline"
                >
                  See how it works
                </a>
              </div>

              <div className="flex flex-wrap gap-3 text-[11px] text-slate-200">
                <div className="flex items-center gap-2 rounded-full border border-slate-900 bg-slate-900/80 px-3 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                  Level 7 • 340 / 400 XP
                </div>
                <div className="flex items-center gap-2 rounded-full border border-slate-900 bg-slate-900/80 px-3 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Streak: 4 days
                </div>
                <div className="flex items-center gap-2 rounded-full border border-slate-900 bg-slate-900/80 px-3 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  Calendar sync active
                </div>
              </div>
            </div>

            {/* Mock panel */}
            <div className="relative">
              <div className="absolute -inset-8 rounded-[28px] bg-gradient-to-tr from-sky-500/15 via-emerald-400/10 to-transparent blur-3xl" />
              <div className="relative space-y-4 rounded-[28px] border border-slate-900 bg-slate-900/80 p-5 shadow-2xl shadow-sky-900/30 backdrop-blur">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] tracking-[0.12em] text-slate-400 uppercase">
                      Quest Board
                    </p>
                    <p className="text-sm font-semibold text-slate-100">
                      Today
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="rounded-full bg-slate-800 px-2 py-1 text-slate-200">
                      Streak: 4
                    </span>
                    <span className="rounded-full bg-slate-800 px-2 py-1 text-emerald-300">
                      +60 XP
                    </span>
                  </div>
                </div>

                <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-950/70 p-3">
                  <div className="mb-1 flex items-center justify-between text-[11px] text-slate-300">
                    <span>XP 340 / 400</span>
                    <span>60 to level 8</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-800">
                    <div className="h-2 w-[85%] rounded-full bg-gradient-to-r from-sky-400 to-emerald-400" />
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  {[
                    {
                      title: "Finish design outline",
                      meta: "+20 XP • Due 3 PM",
                      pill: "In progress",
                    },
                    {
                      title: "Daily review",
                      meta: "+10 XP • Streak bonus",
                      pill: "Complete",
                    },
                    {
                      title: "Prep for demo",
                      meta: "+40 XP • Hard",
                      pill: "Ready",
                    },
                  ].map((quest) => (
                    <div
                      key={quest.title}
                      className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/70 px-3 py-3"
                    >
                      <div className="space-y-1">
                        <p className="font-semibold text-slate-50">
                          {quest.title}
                        </p>
                        <p className="text-[12px] text-slate-400">
                          {quest.meta}
                        </p>
                      </div>
                      <span className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-[11px] text-slate-100">
                        {quest.pill}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-3">
                    <p className="text-[11px] font-semibold text-emerald-300">
                      Suggested quests
                    </p>
                    <p className="text-[12px] text-slate-300">
                      Syncs from your Google Calendar. Accept to convert to
                      quests.
                    </p>
                    <div className="mt-2 space-y-2 text-[12px]">
                      <div className="rounded-xl border border-slate-800 bg-slate-900 px-2 py-2">
                        Design review — Today 3:00 PM
                      </div>
                      <div className="rounded-xl border border-slate-800 bg-slate-900 px-2 py-2">
                        Grocery run — Tomorrow 6:00 PM
                      </div>
                    </div>
                    <button className="mt-3 w-full rounded-lg bg-slate-100 px-3 py-2 text-[12px] font-semibold text-slate-950 hover:bg-white">
                      Sync now
                    </button>
                  </div>
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-3">
                    <p className="text-[11px] font-semibold text-sky-300">
                      Rewards
                    </p>
                    <p className="text-[12px] text-slate-300">
                      Spend coins on themes, icons, and titles as you level up.
                    </p>
                    <div className="mt-2 space-y-2 text-[12px]">
                      <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 px-2 py-2">
                        <span>Neon grid theme</span>
                        <span className="rounded-full bg-slate-800 px-2 py-1 text-[11px] text-amber-200">
                          120 coins
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 px-2 py-2">
                        <span>Crystal title</span>
                        <span className="rounded-full bg-slate-800 px-2 py-1 text-[11px] text-amber-200">
                          90 coins
                        </span>
                      </div>
                    </div>
                    <button className="mt-3 w-full rounded-lg border border-slate-800 px-3 py-2 text-[12px] font-semibold text-slate-100 hover:border-slate-700 hover:bg-slate-900">
                      View shop
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section
          id="how-it-works"
          className="relative border-t border-slate-900/60 bg-slate-950/90"
        >
          <div className="mx-auto max-w-6xl space-y-6 px-4 py-12">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.12em] text-slate-400 uppercase">
                  How Questify works
                </p>
                <h2 className="text-2xl font-semibold tracking-tight text-slate-50">
                  Ship quests, earn XP, keep momentum.
                </h2>
              </div>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-800 px-3 py-2 text-sm font-semibold text-slate-100 hover:border-slate-700 hover:bg-slate-900"
              >
                Jump in
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  title: "Create quests fast",
                  body: "Add tasks with difficulty, due dates, and categories. Calendar suggestions keep your list fresh.",
                },
                {
                  title: "Earn XP and streaks",
                  body: "Complete at least one quest per day to keep your streak. Leveling unlocks coins and rewards.",
                },
                {
                  title: "Customize your world",
                  body: "Shop for themes, titles, and icons. Build a space that feels like your own RPG hub.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-900 bg-slate-950/70 p-4 shadow-lg shadow-slate-950/40"
                >
                  <p className="text-sm font-semibold text-slate-50">
                    {item.title}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features grid */}
        <section
          id="features"
          className="relative border-t border-slate-900/60 bg-slate-950/95"
        >
          <div className="mx-auto max-w-6xl space-y-6 px-4 py-12">
            <div className="space-y-2">
              <p className="text-[11px] font-semibold tracking-[0.12em] text-slate-400 uppercase">
                Built for momentum
              </p>
              <h2 className="text-2xl font-semibold text-slate-50">
                Everything you need to stay on track.
              </h2>
            </div>

            <div className="grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "XP, levels, streaks",
                  body: "Progress that feels tangible with milestones at 7 / 30 / 100 days.",
                },
                {
                  title: "Calendar suggestions",
                  body: "Import events for the next 7 days. Accept to convert to quests in one tap.",
                },
                {
                  title: "Difficulty & rewards",
                  body: "Easy / Medium / Hard with matching XP. Earn coins and shop cosmetics.",
                },
                {
                  title: "Analytics at a glance",
                  body: "Weekly XP chart, streak status, and completion rate in one dashboard.",
                },
                {
                  title: "Reminders that fit you",
                  body: "Daily quest nudges, due date warnings, and streak freeze alerts.",
                },
                {
                  title: "Mobile-first",
                  body: "Responsive layouts with generous touch targets and clear contrast.",
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-slate-900 bg-slate-950/70 p-4 shadow-md shadow-slate-950/40"
                >
                  <p className="font-semibold text-slate-50">{feature.title}</p>
                  <p className="mt-2 text-sm text-slate-300">{feature.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Rewards / Insights */}
        <section
          id="rewards"
          className="relative border-t border-slate-900/60 bg-slate-950"
        >
          <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-3">
              <p className="text-[11px] font-semibold tracking-[0.12em] text-slate-400 uppercase">
                Rewards that feel earned
              </p>
              <h2 className="text-2xl font-semibold text-slate-50">
                Level up to unlock themes, titles, and icons.
              </h2>
              <p className="text-sm text-slate-300">
                Coins drop from leveling and streak milestones. Spend them on
                cosmetic upgrades that make your workspace feel like your world.
              </p>
              <div className="flex flex-wrap gap-3 text-[11px] text-slate-200">
                <span className="rounded-full border border-slate-900 bg-slate-900/80 px-3 py-1">
                  Themes and app skins
                </span>
                <span className="rounded-full border border-slate-900 bg-slate-900/80 px-3 py-1">
                  Profile icons
                </span>
                <span className="rounded-full border border-slate-900 bg-slate-900/80 px-3 py-1">
                  Custom titles
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 rounded-[26px] bg-gradient-to-br from-amber-400/15 via-sky-500/10 to-transparent blur-3xl" />
              <div className="relative space-y-3 rounded-[26px] border border-slate-900 bg-slate-950/80 p-4 shadow-xl shadow-slate-950/50">
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-[11px] tracking-[0.12em] text-slate-400 uppercase">
                      Inventory
                    </p>
                    <p className="font-semibold text-slate-100">
                      Unlocked rewards
                    </p>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-[11px] text-amber-200">
                    240 coins
                  </div>
                </div>

                <div className="space-y-2">
                  {[
                    {
                      name: "Aurora theme",
                      status: "Equipped",
                    },
                    {
                      name: "Navigator title",
                      status: "Owned",
                    },
                    {
                      name: "Crystal sigil icon",
                      status: "Owned",
                    },
                  ].map((reward) => (
                    <div
                      key={reward.name}
                      className="flex items-center justify-between rounded-2xl border border-slate-900 bg-slate-900/80 px-3 py-3"
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-slate-50">
                          {reward.name}
                        </p>
                        <p className="text-[12px] text-slate-400">
                          Cosmetic reward
                        </p>
                      </div>
                      <span className="rounded-full border border-slate-800 bg-slate-800 px-3 py-1 text-[11px] text-emerald-300">
                        {reward.status}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl border border-slate-900 bg-slate-900/70 p-3 text-sm text-slate-300">
                  Level up to unlock new cosmetics every season. Preview before
                  you buy and swap anytime without losing coins.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="relative border-t border-slate-900/60 bg-slate-950">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-12 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <p className="text-lg font-semibold text-slate-50">
                Ready to turn your day into quests?
              </p>
              <p className="text-sm text-slate-300">
                Create a quest, complete one, and feel the level-up in under
                five minutes.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/login"
                className="rounded-xl bg-gradient-to-r from-sky-500 to-emerald-400 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-900/40 transition hover:from-sky-400 hover:to-emerald-300"
              >
                Get started
              </Link>
              <a
                href="#features"
                className="rounded-xl border border-slate-800 px-4 py-2.5 text-sm font-semibold text-slate-100 hover:border-slate-700 hover:bg-slate-900"
              >
                View features
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
