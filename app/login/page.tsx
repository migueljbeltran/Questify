"use client";

import { useState } from "react";
import Link from "next/link";
import { login, signup } from "./actions";
import { Loader2, ArrowRight } from "lucide-react";

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
    <main className="bg-background text-foreground relative min-h-screen overflow-hidden">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/3 top-1/4 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/3 h-[300px] w-[300px] rounded-full bg-emerald-500/8 blur-[80px]" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
        {/* Logo */}
        <Link
          href="/"
          className="mb-12 flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <div className="bg-primary flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold text-white">
            Q
          </div>
          <span className="text-lg font-semibold tracking-tight">Questify</span>
        </Link>

        {/* Form container */}
        <div className="w-full max-w-xs">
          {/* Mode toggle */}
          <div className="mb-8 flex justify-center gap-6 text-sm">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setMessage(null);
              }}
              className={`transition-colors ${
                mode === "login"
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign in
            </button>
            <span className="text-muted-foreground/30">|</span>
            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setMessage(null);
              }}
              className={`transition-colors ${
                mode === "signup"
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Create account
            </button>
          </div>

          {/* Form */}
          <form action={handleSubmit} className="space-y-4">
            <div>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Email"
                className="placeholder:text-muted-foreground/50 focus:border-primary/50 w-full border-b border-white/10 bg-transparent py-3 text-sm outline-none transition-colors"
              />
            </div>

            <div>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Password"
                className="placeholder:text-muted-foreground/50 focus:border-primary/50 w-full border-b border-white/10 bg-transparent py-3 text-sm outline-none transition-colors"
              />
            </div>

            {message && (
              <div
                className={`rounded-lg py-3 text-center text-xs ${
                  message.includes("Check your email")
                    ? "text-xp"
                    : "text-red-400"
                }`}
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="bg-primary hover:bg-primary/90 mt-6 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-medium text-white transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              {mode === "login" ? "Sign in" : "Create account"}
              {!isLoading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>
        </div>

        {/* Back to home */}
        <Link
          href="/"
          className="text-muted-foreground hover:text-foreground mt-12 text-xs transition-colors"
        >
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
