import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      exclude: [
        'examples',
        'dist',
        'scripts',
        'src/__generated__',
        'src/types',
        '**/index.ts',
        'tsup.config.ts',
        'vitest.config.ts',
      ],
    },
    globals: true,
    alias: {
      '@pkg': path.resolve('src'),
    },
  },
});
