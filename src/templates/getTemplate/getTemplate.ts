import chalk from 'chalk';
import { uniq } from 'lodash-es';
import { FormattedError } from '@pkg/errors';
import { getAllPaths } from '../getAllPaths';

import type { TemplateType } from '@pkg/types/template';

interface GetTemplateOptions {
  name: string;
  paths: string[];
  type: TemplateType;
}

function getTemplate({ name, paths, type }: GetTemplateOptions) {
  const templatesPaths = getAllPaths({ paths, type });

  const template = templatesPaths.find(
    (templates) => templates.template === name,
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
