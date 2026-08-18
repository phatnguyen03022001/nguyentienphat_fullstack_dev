import { test, expect } from '@playwright/test';

test('homepage matches light visual baseline', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await expect(page).toHaveScreenshot('homepage-light.png', {
    fullPage: true,
    animations: 'disabled',
    caret: 'hide',
  });
});

test('homepage matches dark visual baseline', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: /Switch to dark theme/i }).click();
  await page.evaluate(() => document.fonts.ready);
  await expect(page).toHaveScreenshot('homepage-dark.png', {
    fullPage: true,
    animations: 'disabled',
    caret: 'hide',
  });
});

test('case study modal matches visual baseline', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.locator('[data-project-trigger]').first().click();
  await expect(page.locator('[data-case-dialog]')).toBeVisible();
  await expect(page).toHaveScreenshot('case-study.png', {
    fullPage: true,
    animations: 'disabled',
    caret: 'hide',
  });
});
