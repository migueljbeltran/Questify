"use client";

import Link from "next/link";
import { Check } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="bg-background text-foreground relative min-h-screen overflow-hidden">
      {/* Ambient background orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] translate-x-1/2 translate-y-1/2 rounded-full bg-emerald-500/8 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-[80px]" />
      </div>

      {/* Header */}
      <header className="relative z-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <div className="flex items-center gap-2.5">
            <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-white">
              Q
            </div>
            <span className="text-lg font-semibold tracking-tight">
              Questify
            </span>
          </div>
          <Link
            href="/login"
            className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
          >
            Sign in
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-6">
        <div className="flex max-w-4xl flex-col items-center text-center">
          {/* Tagline */}
          <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            Tasks become{" "}
            <span className="bg-gradient-to-r from-violet-400 via-violet-500 to-purple-500 bg-clip-text text-transparent">
              quests
            </span>
          </h1>

          <p className="text-muted-foreground mt-6 max-w-md text-lg">
            Earn XP. Level up. Stay motivated.
          </p>

          {/* CTA */}
          <Link
            href="/login"
            className="bg-primary hover:bg-primary/90 mt-10 rounded-full px-8 py-3 text-sm font-medium text-white transition-all hover:scale-[1.02]"
          >
            Get started
          </Link>

          {/* Floating quest preview */}
          <div className="mt-20 w-full max-w-sm">
            <div className="space-y-3">
              {[
                { title: "Morning workout", xp: 30, done: true, delay: "0s" },
                {
                  title: "Review project docs",
                  xp: 20,
                  done: false,
                  delay: "0.1s",
                },
                { title: "Team standup", xp: 10, done: false, delay: "0.2s" },
              ].map((quest) => (
                <div
                  key={quest.title}
                  className="animate-float group flex items-center gap-4 rounded-2xl bg-white/[0.03] px-5 py-4 backdrop-blur-sm transition-all hover:bg-white/[0.06]"
                  style={{ animationDelay: quest.delay }}
                >
                  <div
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                      quest.done
                        ? "border-xp bg-xp"
                        : "border-white/20 group-hover:border-white/40"
                    }`}
                  >
                    {quest.done && <Check className="h-3 w-3 text-white" />}
                  </div>
                  <span
                    className={`flex-1 text-left text-sm ${
                      quest.done ? "text-muted-foreground line-through" : ""
                    }`}
                  >
                    {quest.title}
                  </span>
                  <span className="font-mono text-xs text-emerald-400/80">
                    +{quest.xp}
                  </span>
                </div>
              ))}
            </div>

            {/* Subtle stats */}
            <div className="mt-8 flex items-center justify-center gap-6 text-xs">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="text-muted-foreground">
                  <span className="font-mono text-emerald-400">2,450</span> XP
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                <span className="text-muted-foreground">
                  <span className="font-mono text-amber-400">7</span> day streak
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                <span className="text-muted-foreground">
                  Level <span className="font-mono text-blue-400">12</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-muted-foreground absolute right-0 bottom-0 left-0 py-6 text-center text-xs">
        Gamified productivity for the rest of us
      </footer>
    </main>
  );
}
