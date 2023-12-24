import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const packageJson = JSON.parse(
  readFileSync(resolve(process.cwd(), 'package.json'), 'utf-8')
);

const directory = resolve(process.cwd(), 'src/__generated__/');

if (!existsSync(directory)) {
  mkdirSync(directory);
}

writeFileSync(
  resolve(directory, 'version.ts'),
  `export const VERSION = '${packageJson.version}';`
);
