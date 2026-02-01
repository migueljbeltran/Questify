"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import {
  addChoreSchema,
  choreIdSchema,
  completeChoreSchema,
} from "@/lib/validations/chore";
import { rateLimit } from "@/lib/rate-limit";

export type ActionResult =
  | { success: true }
  | { error: string; fieldErrors?: Record<string, string[]> };

export async function addChore(formData: FormData): Promise<ActionResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Unauthorized" };

  // Rate limiting: 20 chores per minute per user
  const { success: withinLimit } = rateLimit(`addChore:${user.id}`, {
    maxRequests: 20,
    windowMs: 60000,
  });

  if (!withinLimit) {
    return { error: "Too many requests. Please slow down." };
  }

  const parsed = addChoreSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description") || undefined,
    xp: formData.get("xp"),
  });

  if (!parsed.success) {
    return {
      error: "Validation failed",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const { error } = await supabase.from("chores").insert({
    user_id: user.id,
    title: parsed.data.title,
    description: parsed.data.description || null,
    base_xp: parsed.data.xp,
  });

  if (error) {
    console.error("[addChore] Database error:", error);
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  return { success: true };
}

export async function deleteChore(choreId: string): Promise<ActionResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Unauthorized" };

  // Rate limiting: 20 deletions per minute per user
  const { success: withinLimit } = rateLimit(`deleteChore:${user.id}`, {
    maxRequests: 20,
    windowMs: 60000,
  });

  if (!withinLimit) {
    return { error: "Too many requests. Please slow down." };
  }

  const parsed = choreIdSchema.safeParse({ choreId });
  if (!parsed.success) {
    return { error: "Invalid chore ID" };
  }

  const { error } = await supabase
    .from("chores")
    .delete()
    .eq("id", parsed.data.choreId)
    .eq("user_id", user.id);

  if (error) {
    console.error("[deleteChore] Database error:", error);
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  return { success: true };
}

export async function completeChore(
  choreId: string,
  xp: number
): Promise<ActionResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Unauthorized" };

  // Rate limiting: 30 completions per minute per user
  const { success: withinLimit } = rateLimit(`completeChore:${user.id}`, {
    maxRequests: 30,
    windowMs: 60000,
  });

  if (!withinLimit) {
    return { error: "Too many requests. Please slow down." };
  }

  const parsed = completeChoreSchema.safeParse({ choreId, xp });
  if (!parsed.success) {
    return { error: "Invalid input" };
  }

  // 1. Log completion
  const { error: completionError } = await supabase
    .from("chore_completions")
    .insert({
      user_id: user.id,
      chore_id: parsed.data.choreId,
      xp_awarded: parsed.data.xp,
    });

  if (completionError) {
    console.error("[completeChore] Completion error:", completionError);
    return { error: completionError.message };
  }

  // 2. Get current user data including streak info
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("xp, current_streak, longest_streak, last_completion_date")
    .eq("id", user.id)
    .single();

  if (userError) {
    console.error("[completeChore] User fetch error:", userError);
    return { error: userError.message };
  }

  // 3. Calculate streak
  const today = new Date().toISOString().split("T")[0];
  const lastCompletion = userData?.last_completion_date;
  let newStreak = userData?.current_streak || 0;
  let longestStreak = userData?.longest_streak || 0;

  if (lastCompletion !== today) {
    // Check if last completion was yesterday (streak continues) or earlier (streak resets)
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    if (lastCompletion === yesterdayStr) {
      // Streak continues
      newStreak += 1;
    } else if (!lastCompletion) {
      // First ever completion
      newStreak = 1;
    } else {
      // Streak broken, reset to 1
      newStreak = 1;
    }

    // Update longest streak if current exceeds it
    if (newStreak > longestStreak) {
      longestStreak = newStreak;
    }
  }
  // If already completed today, streak stays the same

  // 4. Update user XP and streak
  const newXp = (userData?.xp || 0) + parsed.data.xp;

  const { error: updateError } = await supabase
    .from("users")
    .update({
      xp: newXp,
      current_streak: newStreak,
      longest_streak: longestStreak,
      last_completion_date: today,
    })
    .eq("id", user.id);

  if (updateError) {
    console.error("[completeChore] XP update error:", updateError);
    return { error: updateError.message };
  }

  // 5. Mark chore as inactive (completed)
  const { error: choreError } = await supabase
    .from("chores")
    .update({ is_active: false })
    .eq("id", parsed.data.choreId)
    .eq("user_id", user.id);

  if (choreError) {
    console.error("[completeChore] Chore update error:", choreError);
    return { error: choreError.message };
  }

  revalidatePath("/dashboard");
  return { success: true };
}

export async function updateChore(
  choreId: string,
  formData: FormData
): Promise<ActionResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Unauthorized" };

  // Rate limiting: 20 updates per minute per user
  const { success: withinLimit } = rateLimit(`updateChore:${user.id}`, {
    maxRequests: 20,
    windowMs: 60000,
  });

  if (!withinLimit) {
    return { error: "Too many requests. Please slow down." };
  }

  // Validate chore ID
  const idParsed = choreIdSchema.safeParse({ choreId });
  if (!idParsed.success) {
    return { error: "Invalid chore ID" };
  }

  // Validate form data
  const parsed = addChoreSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description") || undefined,
    xp: formData.get("xp"),
  });

  if (!parsed.success) {
    return {
      error: "Validation failed",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  // Update the chore (only if user owns it)
  const { error } = await supabase
    .from("chores")
    .update({
      title: parsed.data.title,
      description: parsed.data.description || null,
      base_xp: parsed.data.xp,
    })
    .eq("id", idParsed.data.choreId)
    .eq("user_id", user.id);

  if (error) {
    console.error("[updateChore] Database error:", error);
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  return { success: true };
}
