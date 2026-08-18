import { test, expect } from '@playwright/test';

// Project images are lazy-loaded. Full-page screenshots expand the viewport and
// trigger those loads mid-capture, so the page never reaches two stable frames
// on CI. Force every image to load and decode before taking a screenshot.
async function settleImages(page) {
  await page.evaluate(async () => {
    const images = Array.from(document.images);
    for (const image of images) {
      if (!image.complete) {
        image.loading = 'eager';
        image.src = image.currentSrc || image.src;
      }
    }
    await Promise.all(
      images.map((image) =>
        image.decode().catch(() => {
          /* ignore images that fail to decode */
        })
      )
    );
  });
}

test('homepage matches light visual baseline', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await settleImages(page);
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
  await settleImages(page);
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
  await page.evaluate(() => document.fonts.ready);
  await settleImages(page);
  await expect(page).toHaveScreenshot('case-study.png', {
    fullPage: true,
    animations: 'disabled',
    caret: 'hide',
  });
});
