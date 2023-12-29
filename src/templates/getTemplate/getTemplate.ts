import chalk from 'chalk';
import { uniq } from 'lodash-es';
import { FormattedError } from '@pkg/errors';
import { getAllPaths } from '../getAllPaths';

interface GetTemplateOptions {
  name: string;
  paths: string[];
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
