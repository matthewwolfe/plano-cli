import { select } from '@inquirer/prompts';
import { sortedUniq } from 'lodash-es';
import { getAllPaths } from '../getAllPaths';

import type { TemplateType } from '@pkg/types/template';

interface PromptForTemplateOptions {
  includeDefaultPath?: boolean;
  paths: string[];
  type: TemplateType;
}

/**
 * Prompt which template should be used for generation.
 *
 * @param paths - paths to search for templates
 * @returns selected template name
 */
async function promptForTemplate({
  includeDefaultPath,
  paths,
  type,
}: PromptForTemplateOptions) {
  const templatesPaths = getAllPaths({ includeDefaultPath, paths, type });

  const template = await select({
    message: 'Select a template',
    choices: sortedUniq(
      templatesPaths.map(({ template }) => ({ value: template })),
    ),
  });

  return template;
}

export { promptForTemplate };
