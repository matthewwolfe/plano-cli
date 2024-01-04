import inquirer from 'inquirer';
import { getContextPrompts } from '../getContextPrompts';

interface PromptForContextOptions {
  template: {
    path: string;
    template: string;
  };
}

async function promptForContext(options: PromptForContextOptions) {
  const { prompts, helpers } = await getContextPrompts(options);

  if (!prompts) {
    return {
      context: {},
      helpers,
    };
  }

  const context =
    (await inquirer.prompt<Record<string, unknown>>(prompts)) || {};

  return {
    context,
    helpers,
  };
}

export { promptForContext };
