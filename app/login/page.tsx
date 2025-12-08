"use client";

import { useState } from "react";
import Link from "next/link";
import { login, signup } from "./actions";
import { Loader2, Mail, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [mode, setMode] = useState<"login" | "signup">("login");

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setMessage(null);

    try {
      const action = mode === "login" ? login : signup;
      const result = await action(formData);

      if (result && "error" in result && result.error) {
        setMessage(result.error);
      } else if (result && "message" in result && result.message) {
        setMessage(result.message);
      }
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-50">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-20 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="absolute right-0 top-10 h-64 w-64 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
      </div>

      <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-3 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/70 px-3 py-2 text-sm font-semibold text-slate-50 shadow-md shadow-slate-950/40 hover:border-slate-700 hover:bg-slate-900"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-500 to-emerald-400 text-sm font-black text-slate-950 shadow-lg shadow-sky-900/40">
                QF
              </div>
              Questify
            </Link>
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {mode === "login" ? "Welcome back" : "Create your account"}
              </h1>
              <p className="text-sm text-slate-300">
                {mode === "login"
                  ? "Pick up your quests and keep the streak alive."
                  : "Start turning tasks into XP, levels, and rewards."}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-900 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/40 backdrop-blur">
            <div className="mb-5 flex items-center rounded-xl border border-slate-800 bg-slate-950/70 p-1 text-xs font-semibold text-slate-200">
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setMessage(null);
                }}
                className={`flex-1 rounded-lg px-3 py-2 transition ${
                  mode === "login"
                    ? "bg-gradient-to-r from-sky-500 to-emerald-400 text-slate-950 shadow-md shadow-sky-900/30"
                    : "text-slate-300 hover:text-slate-100"
                }`}
              >
                Sign in
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("signup");
                  setMessage(null);
                }}
                className={`flex-1 rounded-lg px-3 py-2 transition ${
                  mode === "signup"
                    ? "bg-gradient-to-r from-sky-500 to-emerald-400 text-slate-950 shadow-md shadow-sky-900/30"
                    : "text-slate-300 hover:text-slate-100"
                }`}
              >
                Create account
              </button>
            </div>

            <form action={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label
                  className="text-xs font-medium text-slate-300"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="name@example.com"
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 pl-10 py-2 text-sm text-white placeholder:text-slate-600 outline-none transition-colors focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  className="text-xs font-medium text-slate-300"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 pl-10 py-2 text-sm text-white placeholder:text-slate-600 outline-none transition-colors focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  />
                </div>
              </div>

              {message && (
                <div
                  className={`rounded-lg border p-3 text-xs ${
                    message.includes("Check your email")
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                      : "border-red-500/30 bg-red-500/10 text-red-300"
                  }`}
                >
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-sky-500 to-emerald-400 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-900/40 transition hover:from-sky-400 hover:to-emerald-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                {mode === "login" ? "Sign in" : "Create account"}
                {!isLoading && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>

            <div className="mt-6 text-center text-xs text-slate-400">
              {mode === "login"
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                onClick={() => {
                  setMode(mode === "login" ? "signup" : "login");
                  setMessage(null);
                }}
                className="font-semibold text-sky-300 underline-offset-4 hover:text-sky-200 hover:underline"
              >
                {mode === "login" ? "Sign up" : "Sign in"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
