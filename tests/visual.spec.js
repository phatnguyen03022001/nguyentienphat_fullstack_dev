import { test, expect } from '@playwright/test';

test('capture production homepage for visual review', async ({ page }, testInfo) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: testInfo.outputPath(`homepage-${testInfo.project.name}.png`),
    fullPage: true,
    animations: 'disabled',
  });
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('.portrait')).toBeVisible();
});

test('capture mobile case study modal', async ({ page }, testInfo) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.locator('[data-project-trigger]').first().click();
  const dialog = page.locator('[data-case-dialog]');
  await expect(dialog).toBeVisible();
  await page.screenshot({
    path: testInfo.outputPath(`case-study-${testInfo.project.name}.png`),
    fullPage: true,
    animations: 'disabled',
  });
});
