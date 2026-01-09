import { z } from "zod";

const isCI = process.env.CI === "true";

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url("Invalid Supabase URL"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z
    .string()
    .min(1, "Supabase anon key is required"),
  NEXT_PUBLIC_BASE_URL: z.string().url().default("http://localhost:3000"),
  SENTRY_DSN: z.string().optional(),
});

// CI-safe schema with placeholder defaults
const ciEnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z
    .string()
    .url()
    .default("https://placeholder.supabase.co"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().default("placeholder-key"),
  NEXT_PUBLIC_BASE_URL: z.string().url().default("http://localhost:3000"),
  SENTRY_DSN: z.string().optional(),
});

function validateEnv() {
  const schema = isCI ? ciEnvSchema : envSchema;

  const parsed = schema.safeParse({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    SENTRY_DSN: process.env.SENTRY_DSN,
  });

  if (!parsed.success) {
    console.error(
      "Invalid environment variables:",
      parsed.error.flatten().fieldErrors
    );
    throw new Error("Invalid environment variables");
  }

  return parsed.data;
}

export const env = validateEnv();
