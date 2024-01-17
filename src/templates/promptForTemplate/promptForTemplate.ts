import inquirer from 'inquirer';
import { sortedUniq } from 'lodash-es';
import { getAllPaths } from '../getAllPaths';

import type { TemplateType } from '@pkg/types/template';

interface PromptForTemplateOptions {
  paths: string[];
  type: TemplateType;
}

/**
 * Prompt which template should be used for generation.
 *
 * @param paths - paths to search for templates
 * @returns selected template name
 */
async function promptForTemplate({ paths, type }: PromptForTemplateOptions) {
  const templatesPaths = getAllPaths({ paths, type });

  const { template } = await inquirer.prompt<{ template: string }>([
    {
      name: 'template',
      message: 'Select a template',
      type: 'list',
      choices: sortedUniq(templatesPaths.map(({ template }) => template)),
    },
  ]);

  return template;
}

export { promptForTemplate };
