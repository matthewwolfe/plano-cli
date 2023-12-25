import { existsSync, readdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { resolve } from 'node:path';
import { TEMPLATES_DIRECTORY_NAME } from '@pkg/constants/paths';

import type { TemplatePath } from '@pkg/types/template';

function getTemplatesPaths(paths: string[]): TemplatePath[] {
  const DEFAULT_TEMPLATE_PATH = `${homedir()}/${TEMPLATES_DIRECTORY_NAME}`;

  return [DEFAULT_TEMPLATE_PATH, ...paths]
    .map((path) => resolve(path))
    .filter((path) => existsSync(path))
    .map((path) =>
      readdirSync(path, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => ({
          path,
          template: dirent.name,
        }))
    )
    .flat();
}

export { getTemplatesPaths };
