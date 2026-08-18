import { test, expect } from '@playwright/test';

const pages = [
  { name: 'home', path: '/' },
  { name: 'work', path: '/#work' },
  { name: 'about', path: '/#about' },
  { name: 'contact', path: '/#contact' },
];

test.describe('production smoke', () => {
  for (const page of pages) {
    test(`${page.name} loads`, async ({ page: browserPage }) => {
      await browserPage.goto(page.path, { waitUntil: 'networkidle' });
      await expect(browserPage.locator('main')).toBeVisible();
      await expect(browserPage).toHaveTitle(/Nguyen Tien Phat/);
    });
  }

  test('case study opens and closes with keyboard', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    const trigger = page.locator('[data-project-trigger]').first();
    await trigger.focus();
    await trigger.press('Enter');
    const dialog = page.locator('[data-case-dialog]');
    await expect(dialog).toBeVisible();
    await expect(dialog.getAttribute('aria-modal')).resolves.toBe('true');
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test('navigation targets exist', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    for (const id of ['work', 'about', 'contact']) {
      await expect(page.locator(`#${id}`)).toHaveCount(1);
    }
  });

  test('no horizontal overflow', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    expect(overflow).toBe(false);
  });
});
