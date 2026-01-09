import { z } from "zod";

export const addChoreSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  description: z.string().max(500, "Description is too long").optional(),
  xp: z.coerce
    .number()
    .int()
    .min(1, "XP must be at least 1")
    .max(100, "XP cannot exceed 100"),
});

export const choreIdSchema = z.object({
  choreId: z.string().uuid("Invalid chore ID"),
});

export const completeChoreSchema = z.object({
  choreId: z.string().uuid("Invalid chore ID"),
  xp: z.number().int().min(1).max(100),
});

export type AddChoreInput = z.infer<typeof addChoreSchema>;
export type ChoreIdInput = z.infer<typeof choreIdSchema>;
export type CompleteChoreInput = z.infer<typeof completeChoreSchema>;
