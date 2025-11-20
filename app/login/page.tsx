// app/login/page.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        router.replace("/dashboard");
      }
    });
  }, [router]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Sending magic link...");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });
    if (error) setStatus(`Error: ${error.message}`);
    else setStatus("Check your email for a login link.");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-50">
      <div className="w-full max-w-md space-y-4 border border-slate-800 rounded-xl p-6 bg-slate-900">
        <h1 className="text-2xl font-bold text-center">ChoreQuest</h1>
        <p className="text-sm text-slate-400 text-center">
          Log in with your email to start earning XP from chores.
        </p>
        <form onSubmit={handleLogin} className="space-y-3">
          <input
            type="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-md bg-slate-950 border border-slate-700 px-3 py-2 text-sm outline-none focus:border-sky-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="w-full rounded-md bg-sky-600 hover:bg-sky-500 px-3 py-2 text-sm font-medium"
          >
            Send magic link
          </button>
        </form>
        {status && (
          <p className="text-xs text-slate-400 text-center">{status}</p>
        )}
      </div>
    </main>
  );
}
