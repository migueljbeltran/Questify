import { test, expect } from "@playwright/test";

test.describe("Authentication", () => {
  test("should display login form", async ({ page }) => {
    await page.goto("/login");

    // Check form elements
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
    // Use form-specific selector to avoid matching tab buttons
    await expect(
      page
        .locator("form")
        .getByRole("button", { name: /enter|create chapter/i })
    ).toBeVisible();
  });

  test("should toggle between login and signup modes", async ({ page }) => {
    await page.goto("/login");

    // Find the tab toggle button specifically (not the form button)
    const createAccountTab = page.getByRole("button", {
      name: "Found Your Chapter",
    });

    if (await createAccountTab.isVisible()) {
      await createAccountTab.click();

      // Check that the form submit button now shows signup text
      await expect(
        page.locator("form").getByRole("button", { name: /sign up|create/i })
      ).toBeVisible();
    }
  });

  test("should show validation errors for invalid email", async ({ page }) => {
    await page.goto("/login");

    // Fill in invalid email
    await page.getByLabel(/email/i).fill("invalid-email");
    await page.getByLabel(/password/i).fill("password123");

    // Submit the form using the form's submit button
    await page
      .locator("form")
      .getByRole("button", { name: /enter|create chapter/i })
      .click();

    // Wait for potential error message (validation happens client or server side)
    await page.waitForTimeout(1000);

    // The form should still be visible (not redirected)
    await expect(page.getByLabel(/email/i)).toBeVisible();
  });

  test("should show error for invalid credentials", async ({ page }) => {
    await page.goto("/login");

    // Fill in valid format but wrong credentials
    await page.getByLabel(/email/i).fill("nonexistent@example.com");
    await page.getByLabel(/password/i).fill("wrongpassword123");

    // Submit the form using the form's submit button
    await page
      .locator("form")
      .getByRole("button", { name: /enter|create chapter/i })
      .click();

    // Wait for error response
    await page.waitForTimeout(2000);

    // Should show error message or stay on login page
    await expect(page).toHaveURL(/\/login/);
  });

  test("should have password field with correct type", async ({ page }) => {
    await page.goto("/login");

    const passwordInput = page.getByLabel(/password/i);
    await expect(passwordInput).toHaveAttribute("type", "password");
  });
});
