import { describe, it, expect } from "vitest";
import { addChoreSchema, choreIdSchema, completeChoreSchema } from "../chore";

describe("addChoreSchema", () => {
  it("validates a correct chore input", () => {
    const result = addChoreSchema.safeParse({
      title: "Wash dishes",
      description: "Clean all the dishes in the sink",
      xp: "20",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.title).toBe("Wash dishes");
      expect(result.data.xp).toBe(20);
    }
  });

  it("validates input without description", () => {
    const result = addChoreSchema.safeParse({
      title: "Take out trash",
      xp: "15",
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty title", () => {
    const result = addChoreSchema.safeParse({
      title: "",
      xp: "10",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.title).toBeDefined();
    }
  });

  it("rejects title that is too long", () => {
    const result = addChoreSchema.safeParse({
      title: "a".repeat(101),
      xp: "10",
    });
    expect(result.success).toBe(false);
  });

  it("rejects XP below minimum", () => {
    const result = addChoreSchema.safeParse({
      title: "Test",
      xp: "0",
    });
    expect(result.success).toBe(false);
  });

  it("rejects XP above maximum", () => {
    const result = addChoreSchema.safeParse({
      title: "Test",
      xp: "101",
    });
    expect(result.success).toBe(false);
  });

  it("coerces string XP to number", () => {
    const result = addChoreSchema.safeParse({
      title: "Test",
      xp: "50",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(typeof result.data.xp).toBe("number");
      expect(result.data.xp).toBe(50);
    }
  });
});

describe("choreIdSchema", () => {
  it("validates a valid UUID", () => {
    const result = choreIdSchema.safeParse({
      choreId: "550e8400-e29b-41d4-a716-446655440000",
    });
    expect(result.success).toBe(true);
  });

  it("rejects an invalid UUID", () => {
    const result = choreIdSchema.safeParse({
      choreId: "not-a-valid-uuid",
    });
    expect(result.success).toBe(false);
  });

  it("rejects an empty string", () => {
    const result = choreIdSchema.safeParse({
      choreId: "",
    });
    expect(result.success).toBe(false);
  });
});

describe("completeChoreSchema", () => {
  it("validates correct completion data", () => {
    const result = completeChoreSchema.safeParse({
      choreId: "550e8400-e29b-41d4-a716-446655440000",
      xp: 25,
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid chore ID", () => {
    const result = completeChoreSchema.safeParse({
      choreId: "invalid",
      xp: 25,
    });
    expect(result.success).toBe(false);
  });

  it("rejects XP below minimum", () => {
    const result = completeChoreSchema.safeParse({
      choreId: "550e8400-e29b-41d4-a716-446655440000",
      xp: 0,
    });
    expect(result.success).toBe(false);
  });

  it("rejects XP above maximum", () => {
    const result = completeChoreSchema.safeParse({
      choreId: "550e8400-e29b-41d4-a716-446655440000",
      xp: 101,
    });
    expect(result.success).toBe(false);
  });
});
