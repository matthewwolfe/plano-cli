import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { homedir } from 'node:os';
import { DEFAULT_TEMPLATES_PATH } from '@pkg/constants/paths';

import type { TemplatePath } from '@pkg/types/template';

function getTemplatesPaths(paths: string[]): TemplatePath[] {
  return paths
    .map((path) => {
      if (path.startsWith(DEFAULT_TEMPLATES_PATH)) {
        return resolve(homedir(), path.slice(1));
      }

      return resolve(path);
    })
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
