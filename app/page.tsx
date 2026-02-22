"use client";

import Link from "next/link";
import { Check } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="bg-background text-cream relative min-h-screen overflow-hidden">
      {/* Ambient background orbs — gold + crimson */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-1/4 h-[500px] w-[500px] translate-x-1/2 rounded-full bg-yellow-900/20 blur-[150px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-red-900/15 blur-[120px]" />
        <div className="absolute top-1/2 right-0 h-[300px] w-[300px] rounded-full bg-blue-900/20 blur-[100px]" />
      </div>

      {/* Header */}
      <header className="relative z-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <div className="flex items-center gap-2.5">
            <span className="text-gold text-xl">⚜</span>
            <span className="font-display text-gold text-sm font-bold tracking-widest">
              QUESTIFY
            </span>
          </div>
          <Link
            href="/login"
            className="text-cream/50 hover:text-gold text-sm transition-colors"
          >
            Enter the Guild
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-6">
        <div className="flex max-w-4xl flex-col items-center text-center">
          {/* Guild emblem */}
          <span className="text-gold animate-ornament-fade mb-6 text-5xl select-none">
            ⚜
          </span>

          {/* Tagline */}
          <h1 className="font-display text-cream text-4xl font-bold tracking-wide sm:text-5xl lg:text-6xl">
            Where Household Quests
            <br />
            <span className="text-gold">Become Legend</span>
          </h1>

          <p className="text-cream/60 mt-6 max-w-md text-lg italic">
            Earn gold. Claim your rank. Rule the household.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href="/login?mode=signup"
              className="border-gold bg-gold text-background hover:bg-gold/90 rounded-sm border px-8 py-3 text-sm font-medium transition-all hover:scale-[1.02]"
            >
              Join the Guild
            </Link>
            <Link
              href="/login"
              className="border-gold/40 text-cream/70 hover:border-gold/70 hover:text-cream rounded-sm border px-8 py-3 text-sm font-medium transition-all"
            >
              Enter the Guild
            </Link>
          </div>

          {/* Floating bounty preview */}
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
                {
                  title: "Team standup",
                  xp: 10,
                  done: false,
                  delay: "0.2s",
                },
              ].map((quest) => (
                <div
                  key={quest.title}
                  className="animate-float border-gold/20 bg-surface-1 hover:border-gold/40 flex items-center gap-4 border px-5 py-4 transition-all"
                  style={{ animationDelay: quest.delay }}
                >
                  <div
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                      quest.done
                        ? "border-gold bg-gold"
                        : "border-cream/20 hover:border-gold/40"
                    }`}
                  >
                    {quest.done && (
                      <Check className="text-background h-3 w-3" />
                    )}
                  </div>
                  <span
                    className={`flex-1 text-left text-sm ${
                      quest.done
                        ? "text-cream/30 line-through"
                        : "text-cream/80"
                    }`}
                  >
                    {quest.title}
                  </span>
                  <span className="text-gold/70 font-mono text-xs">
                    +{quest.xp}g
                  </span>
                </div>
              ))}
            </div>

            {/* Subtle stats */}
            <div className="mt-8 flex items-center justify-center gap-6 text-xs">
              <div className="flex items-center gap-2">
                <div className="bg-gold h-1.5 w-1.5 rounded-full" />
                <span className="text-cream/40">
                  <span className="text-gold font-mono">2,450</span> gold
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                <span className="text-cream/40">
                  <span className="font-mono text-amber-400">7</span> vigilance
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-gold/60 h-1.5 w-1.5 rounded-full" />
                <span className="text-cream/40">
                  Rank{" "}
                  <span className="font-display text-gold/80 text-xs">
                    Veteran
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-cream/30 absolute right-0 bottom-0 left-0 py-6 text-center text-xs">
        A guild for the household
      </footer>
    </main>
  );
}
