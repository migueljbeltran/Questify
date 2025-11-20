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
    } catch (e) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-sky-500 to-emerald-400 flex items-center justify-center text-sm font-bold text-white">
              QF
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              Questify
            </span>
          </Link>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            {mode === "login" ? "Welcome back" : "Create an account"}
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            {mode === "login"
              ? "Enter your credentials to access your quests"
              : "Start your journey to productivity today"}
          </p>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
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
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 pl-10 py-2 text-sm text-white placeholder:text-slate-600 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-colors"
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
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 pl-10 py-2 text-sm text-white placeholder:text-slate-600 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-colors"
                />
              </div>
            </div>

            {message && (
              <div
                className={`p-3 rounded-lg text-xs ${
                  message.includes("Check your email")
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-red-500/10 text-red-400 border border-red-500/20"
                }`}
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-sky-500 py-2 text-sm font-medium text-slate-950 hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              {mode === "login" ? "Sign in" : "Create account"}
              {!isLoading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>

          <div className="mt-6 text-center text-xs">
            <span className="text-slate-400">
              {mode === "login"
                ? "Don't have an account? "
                : "Already have an account? "}
            </span>
            <button
              onClick={() => {
                setMode(mode === "login" ? "signup" : "login");
                setMessage(null);
              }}
              className="text-sky-400 hover:text-sky-300 font-medium hover:underline"
            >
              {mode === "login" ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
