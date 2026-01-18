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
    <main className="bg-background text-foreground min-h-screen">
      <div className="flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm space-y-6">
          {/* Logo */}
          <div className="text-center">
            <Link
              href="/"
              className="text-foreground inline-flex items-center gap-2 hover:opacity-80"
            >
              <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold">
                Q
              </div>
              <span className="font-semibold">Questify</span>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center">
            <h1 className="text-xl font-semibold">
              {mode === "login" ? "Welcome back" : "Create your account"}
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              {mode === "login"
                ? "Sign in to continue your quests"
                : "Start turning tasks into XP"}
            </p>
          </div>

          {/* Card */}
          <div className="border-border bg-surface-1 rounded-lg border p-5">
            {/* Mode toggle */}
            <div className="bg-surface-2 mb-5 flex rounded-md p-1 text-sm">
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setMessage(null);
                }}
                className={`flex-1 rounded-md px-3 py-1.5 font-medium transition-colors ${
                  mode === "login"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
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
                className={`flex-1 rounded-md px-3 py-1.5 font-medium transition-colors ${
                  mode === "signup"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Create account
              </button>
            </div>

            {/* Form */}
            <form action={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label
                  className="text-muted-foreground text-xs font-medium"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="name@example.com"
                    className="border-border bg-background placeholder:text-muted-foreground focus:border-primary focus:ring-primary w-full rounded-md border py-2 pr-3 pl-10 text-sm transition-colors outline-none focus:ring-1"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  className="text-muted-foreground text-xs font-medium"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="••••••••"
                    className="border-border bg-background placeholder:text-muted-foreground focus:border-primary focus:ring-primary w-full rounded-md border py-2 pr-3 pl-10 text-sm transition-colors outline-none focus:ring-1"
                  />
                </div>
              </div>

              {message && (
                <div
                  className={`rounded-md p-3 text-xs ${
                    message.includes("Check your email")
                      ? "bg-xp/10 text-xp"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary focus:ring-offset-background flex w-full items-center justify-center gap-2 rounded-md py-2.5 text-sm font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                {mode === "login" ? "Sign in" : "Create account"}
                {!isLoading && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>

            <div className="text-muted-foreground mt-4 text-center text-xs">
              {mode === "login"
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                onClick={() => {
                  setMode(mode === "login" ? "signup" : "login");
                  setMessage(null);
                }}
                className="text-primary font-medium hover:underline"
              >
                {mode === "login" ? "Sign up" : "Sign in"}
              </button>
            </div>
          </div>

          {/* Back to home */}
          <div className="text-center">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground text-xs"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
