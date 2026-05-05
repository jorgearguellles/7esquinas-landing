import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: { baseURL: 'http://localhost:4321' },
  webServer: {
    command: 'npx serve . -l 4321',
    url: 'http://localhost:4321',
    reuseExistingServer: true,
  },
  snapshotPathTemplate: '{testDir}/__snapshots__/{testFileName}/{arg}{ext}',
});
