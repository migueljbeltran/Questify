"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function addChore(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Unauthorized" };

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const base_xp = parseInt(formData.get("xp") as string) || 10;

  const { error } = await supabase.from("chores").insert({
    user_id: user.id,
    title,
    description,
    base_xp,
  });

  if (error) return { error: error.message };

  revalidatePath("/dashboard");
  return { success: true };
}

export async function deleteChore(choreId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Unauthorized" };

  const { error } = await supabase
    .from("chores")
    .delete()
    .eq("id", choreId)
    .eq("user_id", user.id);

  if (error) return { error: error.message };

  revalidatePath("/dashboard");
  return { success: true };
}

export async function completeChore(choreId: string, xp: number) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Unauthorized" };

  // 1. Log completion
  const { error: completionError } = await supabase
    .from("chore_completions")
    .insert({
      user_id: user.id,
      chore_id: choreId,
      xp_awarded: xp,
    });

  if (completionError) return { error: completionError.message };

  // 2. Update user XP
  // We fetch current XP first to be safe, or use an RPC if we had one.
  // For now, simple update.
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("xp")
    .eq("id", user.id)
    .single();

  if (userError) return { error: userError.message };

  const newXp = (userData?.xp || 0) + xp;

  const { error: updateError } = await supabase
    .from("users")
    .update({ xp: newXp })
    .eq("id", user.id);

  if (updateError) return { error: updateError.message };

  // 3. Mark chore as inactive (completed)
  const { error: choreError } = await supabase
    .from("chores")
    .update({ is_active: false })
    .eq("id", choreId)
    .eq("user_id", user.id);

  if (choreError) return { error: choreError.message };

  revalidatePath("/dashboard");
  return { success: true };
}
