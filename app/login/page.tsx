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
    <main className="bg-background text-cream relative min-h-screen overflow-hidden">
      {/* Ambient background — gold + crimson */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/3 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-900/20 blur-[100px]" />
        <div className="absolute right-1/3 bottom-1/3 h-[300px] w-[300px] rounded-full bg-red-900/15 blur-[80px]" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
        {/* Logo */}
        <Link
          href="/"
          className="mb-10 flex flex-col items-center gap-2 transition-opacity hover:opacity-80"
        >
          <span className="text-gold text-3xl">⚜</span>
          <span className="font-display text-gold text-sm font-bold tracking-widest">
            QUESTIFY
          </span>
        </Link>

        {/* Form container */}
        <div className="border-gold/20 bg-surface-1 w-full max-w-xs rounded-sm border p-8">
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
                  ? "text-gold font-semibold"
                  : "text-cream/40 hover:text-cream/70"
              }`}
            >
              Enter the Guild
            </button>
            <span className="text-cream/20">|</span>
            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setMessage(null);
              }}
              className={`transition-colors ${
                mode === "signup"
                  ? "text-gold font-semibold"
                  : "text-cream/40 hover:text-cream/70"
              }`}
            >
              Found Your Chapter
            </button>
          </div>

          {/* Form */}
          <form action={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Email"
                className="border-cream/10 text-cream placeholder:text-cream/30 focus:border-gold/50 w-full border-b bg-transparent py-3 text-sm transition-colors outline-none"
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Password"
                className="border-cream/10 text-cream placeholder:text-cream/30 focus:border-gold/50 w-full border-b bg-transparent py-3 text-sm transition-colors outline-none"
              />
            </div>

            {message && (
              <div
                className={`py-3 text-center text-xs ${
                  message.includes("Check your email")
                    ? "text-gold"
                    : "text-red-400"
                }`}
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="border-gold bg-gold text-background hover:bg-gold/90 mt-6 flex w-full items-center justify-center gap-2 rounded-sm border py-3 text-sm font-medium transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              {mode === "login" ? "Enter" : "Create Chapter"}
              {!isLoading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>
        </div>

        {/* Back to home */}
        <Link
          href="/"
          className="text-cream/30 hover:text-cream/60 mt-10 text-xs transition-colors"
        >
          ← Return to the Gates
        </Link>
      </div>
    </main>
  );
}
