import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      exclude: ['**/index.ts'],
    },
    globals: true,
    alias: {
      '@pkg': path.resolve('src'),
    },
  },
});
