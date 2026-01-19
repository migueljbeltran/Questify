import { test, expect } from "@playwright/test";

test.describe("Landing Page", () => {
  test("should display the hero section", async ({ page }) => {
    await page.goto("/");

    // Check for main heading
    await expect(page.locator("h1")).toBeVisible();

    // Check for CTA button
    await expect(
      page.getByRole("link", { name: /get started/i })
    ).toBeVisible();
  });

  test("should navigate to login page", async ({ page }) => {
    await page.goto("/");

    // Find and click the get started link
    await page.getByRole("link", { name: /get started/i }).click();

    // Should navigate to login page
    await expect(page).toHaveURL(/\/login/);
  });

  test("should have header with logo and sign in link", async ({ page }) => {
    await page.goto("/");

    // Check header exists with logo and sign in
    await expect(page.locator("header")).toBeVisible();
    await expect(page.getByRole("link", { name: /sign in/i })).toBeVisible();
  });

  test("should be responsive", async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Hero should still be visible
    await expect(page.locator("h1")).toBeVisible();

    // Test desktop viewport
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    await expect(page.locator("h1")).toBeVisible();
  });
});
