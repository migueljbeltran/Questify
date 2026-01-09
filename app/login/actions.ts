"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { loginSchema, signupSchema } from "@/lib/validations/auth";
import { env } from "@/lib/env";
import { rateLimit } from "@/lib/rate-limit";

async function getClientIdentifier(): Promise<string> {
  const headersList = await headers();
  // Use forwarded IP or fall back to a generic identifier
  return (
    headersList.get("x-forwarded-for")?.split(",")[0] ||
    headersList.get("x-real-ip") ||
    "unknown"
  );
}

export type AuthResult =
  | { error: string; fieldErrors?: Record<string, string[]> }
  | { message: string }
  | void;

export async function login(formData: FormData): Promise<AuthResult> {
  // Rate limiting: 5 login attempts per minute per IP
  const clientId = await getClientIdentifier();
  const { success: withinLimit } = rateLimit(`login:${clientId}`, {
    maxRequests: 5,
    windowMs: 60000,
  });

  if (!withinLimit) {
    return { error: "Too many login attempts. Please try again later." };
  }

  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      error: "Validation failed",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    console.error("[login] Auth error:", error);
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signup(formData: FormData): Promise<AuthResult> {
  // Rate limiting: 3 signup attempts per minute per IP
  const clientId = await getClientIdentifier();
  const { success: withinLimit } = rateLimit(`signup:${clientId}`, {
    maxRequests: 3,
    windowMs: 60000,
  });

  if (!withinLimit) {
    return { error: "Too many signup attempts. Please try again later." };
  }

  const parsed = signupSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      error: "Validation failed",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      emailRedirectTo: `${env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
    },
  });

  if (error) {
    console.error("[signup] Auth error:", error);
    return { error: error.message };
  }

  return { message: "Check your email to continue sign in process" };
}

export async function logout(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}
