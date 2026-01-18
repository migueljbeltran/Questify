"use client";

import Link from "next/link";
import {
  CheckCircle2,
  Calendar,
  Trophy,
  Zap,
  Star,
  ArrowRight,
} from "lucide-react";

export default function LandingPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* Header */}
      <header className="border-border border-b">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold">
              Q
            </div>
            <span className="font-semibold">Questify</span>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <a
              href="#features"
              className="text-muted-foreground hover:text-foreground"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-muted-foreground hover:text-foreground"
            >
              How it works
            </a>
            <Link
              href="/login"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-3 py-1.5 text-sm font-medium"
            >
              Get started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="border-border border-b">
        <div className="mx-auto grid max-w-5xl gap-12 px-4 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
          <div className="space-y-6">
            <div className="bg-xp/10 text-xp inline-flex items-center gap-2 rounded-md px-3 py-1 text-xs font-medium">
              <span className="bg-xp h-1.5 w-1.5 rounded-full" />
              Gamified productivity
            </div>

            <h1 className="text-4xl font-semibold tracking-tight lg:text-5xl">
              Turn your tasks into quests.
              <span className="text-muted-foreground block">
                Earn XP, level up, stay motivated.
              </span>
            </h1>

            <p className="text-muted-foreground max-w-md">
              Questify transforms your to-do list into an RPG experience.
              Complete quests, maintain streaks, and watch your progress grow.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/login"
                className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium"
              >
                Start your first quest
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#how-it-works"
                className="text-muted-foreground hover:text-foreground text-sm font-medium"
              >
                Learn more
              </a>
            </div>

            <div className="text-muted-foreground flex flex-wrap gap-4 text-xs">
              <div className="flex items-center gap-2">
                <Star className="text-xp h-4 w-4" />
                <span>Earn XP for every task</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="text-streak h-4 w-4" />
                <span>Build daily streaks</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="text-level h-4 w-4" />
                <span>Level up over time</span>
              </div>
            </div>
          </div>

          {/* Preview card */}
          <div className="border-border bg-surface-1 rounded-lg border p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-xs tracking-wide uppercase">
                  Today
                </p>
                <p className="font-semibold">Active Quests</p>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="bg-xp/15 text-xp rounded-md px-2 py-1">
                  Level 7
                </span>
                <span className="bg-streak/15 text-streak rounded-md px-2 py-1">
                  4 day streak
                </span>
              </div>
            </div>

            <div className="bg-surface-2 mb-4 rounded-md p-3">
              <div className="text-muted-foreground mb-2 flex items-center justify-between text-xs">
                <span>340 / 400 XP</span>
                <span>60 to level 8</span>
              </div>
              <div className="bg-surface-3 h-2 w-full rounded-full">
                <div className="bg-xp h-2 w-[85%] rounded-full" />
              </div>
            </div>

            <div className="space-y-2">
              {[
                {
                  title: "Finish design outline",
                  xp: 20,
                  status: "in-progress",
                },
                { title: "Daily review", xp: 10, status: "complete" },
                { title: "Prep for demo", xp: 40, status: "pending" },
              ].map((quest) => (
                <div
                  key={quest.title}
                  className="bg-surface-2 flex items-center gap-3 rounded-md px-3 py-2.5"
                >
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                      quest.status === "complete"
                        ? "border-xp bg-xp"
                        : "border-border"
                    }`}
                  >
                    {quest.status === "complete" && (
                      <CheckCircle2 className="h-3 w-3 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p
                      className={`text-sm ${quest.status === "complete" ? "text-muted-foreground line-through" : ""}`}
                    >
                      {quest.title}
                    </p>
                  </div>
                  <span className="bg-xp/15 text-xp rounded-md px-2 py-0.5 text-[10px] font-medium">
                    +{quest.xp} XP
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-border border-b">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <div className="mb-8">
            <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
              How it works
            </p>
            <h2 className="mt-2 text-2xl font-semibold">
              Simple steps to stay productive
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Calendar,
                title: "Create quests",
                description:
                  "Add tasks with difficulty levels. Easy, medium, or hard — each with matching XP rewards.",
              },
              {
                icon: CheckCircle2,
                title: "Complete & earn",
                description:
                  "Check off quests to earn XP. Complete at least one per day to maintain your streak.",
              },
              {
                icon: Trophy,
                title: "Level up",
                description:
                  "Watch your level grow as you accumulate XP. Track your progress over time.",
              },
            ].map((step) => (
              <div
                key={step.title}
                className="border-border bg-surface-1 rounded-lg border p-5"
              >
                <div className="bg-primary/10 mb-3 flex h-10 w-10 items-center justify-center rounded-md">
                  <step.icon className="text-primary h-5 w-5" />
                </div>
                <h3 className="font-semibold">{step.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-border border-b">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <div className="mb-8">
            <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
              Features
            </p>
            <h2 className="mt-2 text-2xl font-semibold">
              Everything you need to stay on track
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "XP & Levels",
                description:
                  "Earn experience points for every completed quest and level up.",
              },
              {
                title: "Daily Streaks",
                description:
                  "Complete quests daily to build and maintain your streak.",
              },
              {
                title: "Difficulty Levels",
                description:
                  "Easy, medium, hard, and epic quests with scaling XP.",
              },
              {
                title: "Progress Tracking",
                description:
                  "See your XP progress, level, and completion stats.",
              },
              {
                title: "Quick Actions",
                description: "Complete or delete quests with minimal clicks.",
              },
              {
                title: "Clean Interface",
                description: "Distraction-free design that keeps you focused.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="border-border rounded-lg border p-4"
              >
                <h3 className="font-medium">{feature.title}</h3>
                <p className="text-muted-foreground mt-1 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-border border-b">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-16 text-center">
          <h2 className="text-2xl font-semibold">Ready to start?</h2>
          <p className="text-muted-foreground">
            Create your first quest and experience productive gaming.
          </p>
          <Link
            href="/login"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-md px-5 py-2.5 font-medium"
          >
            Get started free
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-muted-foreground py-6 text-center text-xs">
        <p>Questify — Gamified productivity</p>
      </footer>
    </main>
  );
}
