import { test, expect } from "@playwright/test";

test.describe("Landing Page", () => {
  test("should display the hero section", async ({ page }) => {
    await page.goto("/");

    // Check for main heading
    await expect(page.locator("h1")).toBeVisible();

    // Check for CTA button (use first() since there are multiple get started links)
    await expect(
      page.getByRole("link", { name: /get started/i }).first()
    ).toBeVisible();
  });

  test("should navigate to login page", async ({ page }) => {
    await page.goto("/");

    // Find and click the login/get started link
    await page
      .getByRole("link", { name: /get started/i })
      .first()
      .click();

    // Should navigate to login page
    await expect(page).toHaveURL(/\/login/);
  });

  test("should have working navigation links", async ({ page }) => {
    await page.goto("/");

    // Check navigation links exist
    const nav = page.locator("nav");
    await expect(nav).toBeVisible();
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
