import { test, expect } from '@playwright/test';

// First run: npm run test:update-snapshots  (creates baselines)
// Subsequent runs: npm run test:visual      (compares against baselines)

test('desktop full page', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveScreenshot('desktop.png', { fullPage: true });
});

test('mobile full page', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveScreenshot('mobile.png', { fullPage: true });
});

test('hero section', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('section').first()).toHaveScreenshot('hero.png');
});
