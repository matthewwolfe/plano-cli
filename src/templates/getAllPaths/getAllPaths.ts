import { existsSync, readdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { resolve } from 'node:path';
import {
  FILE_TEMPLATES_DIRECTORY_NAME,
  SNIPPET_TEMPLATES_DIRECTORY_NAME,
  TEMPLATES_DIRECTORY_NAME,
} from '@pkg/constants/paths';

import type { TemplateType } from '@pkg/types/template';
import { FormattedError } from '@pkg/errors';

interface GetAllPathsOptions {
  includeDefaultPath?: boolean;
  paths: string[];
  type: TemplateType;
}

function getDefaultTemplatePath(type: TemplateType) {
  switch (type) {
    case 'file': {
      return `${homedir()}/${TEMPLATES_DIRECTORY_NAME}/${FILE_TEMPLATES_DIRECTORY_NAME}`;
    }

    case 'snippet': {
      return `${homedir()}/${TEMPLATES_DIRECTORY_NAME}/${SNIPPET_TEMPLATES_DIRECTORY_NAME}`;
    }

    default: {
      throw new FormattedError([
        `Unable to get default template path for type: ${type}`,
      ]);
    }
  }
}

function getAllPaths({
  includeDefaultPath = true,
  paths,
  type,
}: GetAllPathsOptions) {
  const allPaths: string[] = [];

  if (includeDefaultPath) {
    allPaths.push(getDefaultTemplatePath(type));
  }

  return [...allPaths, ...paths]
    .map((path) => resolve(path))
    .filter((path) => existsSync(path))
    .map((path) =>
      readdirSync(path, { withFileTypes: true })
        .filter(
          (dirent) => dirent.isDirectory() && !dirent.name.startsWith('.git'),
        )
        .map((dirent) => ({
          path,
          template: dirent.name,
        })),
    )
    .flat();
}

export { getAllPaths };
