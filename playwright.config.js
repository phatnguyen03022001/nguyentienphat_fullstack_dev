import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'https://ntp-portfolio-neon.vercel.app/';

const chromiumViewports = [
  ['chromium-360', 360, 800],
  ['chromium-390', 390, 844],
  ['chromium-430', 430, 932],
  ['chromium-768', 768, 1024],
  ['chromium-1024', 1024, 900],
  ['chromium-1440', 1440, 1000],
  ['chromium-1920', 1920, 1200],
];

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [['line']] : [['html', { open: 'never' }], ['line']],
  snapshotPathTemplate: '{testDir}/__screenshots__/{projectName}/{arg}{ext}',
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
    colorScheme: 'light',
    locale: 'en-US',
    timezoneId: 'Asia/Ho_Chi_Minh',
    reducedMotion: 'reduce',
  },
  projects: [
    ...chromiumViewports.map(([name, width, height]) => ({
      name,
      use: { ...devices['Desktop Chrome'], viewport: { width, height }, deviceScaleFactor: 1 },
    })),
    { name: 'webkit-390', use: { ...devices['Desktop Safari'], browserName: 'webkit', viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 } },
    { name: 'webkit-1440', use: { ...devices['Desktop Safari'], browserName: 'webkit', viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 } },
  ],
});
