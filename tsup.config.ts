import { defineConfig } from 'tsup';

export default defineConfig({
  dts: true,
  entry: ['src/cli/plano.ts'],
  format: 'esm',
  minify: 'terser',
  outDir: 'dist',
});
