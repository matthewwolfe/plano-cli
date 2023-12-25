import { existsSync, readdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { resolve } from 'node:path';
import chalk from 'chalk';
import { uniq } from 'lodash-es';
import { TEMPLATES_DIRECTORY_NAME } from '@pkg/constants/paths';
import { FormattedError } from '@pkg/errors';

interface GetTemplateOptions {
  name: string;
  paths: string[];
}

function getAllPaths(paths: string[]) {
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

function getTemplate({ name, paths }: GetTemplateOptions) {
  const templatesPaths = getAllPaths(paths);

  const template = templatesPaths.find(
    (templates) => templates.template === name
  );

  if (!template) {
    throw new FormattedError([
      chalk.red(`Unable to find template "${name}" at paths:`),
      ...uniq(templatesPaths.map((templatesPath) => templatesPath.path)),
    ]);
  }

  return template;
}

export { getTemplate };
