import { checkbox, input, select } from '@inquirer/prompts';

import type {
  HelpersSchema,
  PromptsSchema,
} from '@pkg/context/getContextPrompts';

interface PromptForContextOptions {
  helpers: HelpersSchema;
  prompts: PromptsSchema;
}

async function promptForContext({
  helpers = {},
  prompts,
}: PromptForContextOptions) {
  if (!prompts) {
    return {
      context: {},
      helpers,
    };
  }

  const context: Record<string, unknown> = {};

  for (let i = 0; i < prompts.length; i++) {
    const prompt = prompts[i];

    switch (prompt.type) {
      case 'checkbox': {
        context[prompt.name] = await checkbox(prompt);
        break;
      }

      case 'input': {
        context[prompt.name] = await input(prompt);
        break;
      }

      case 'select': {
        context[prompt.name] = await select(prompt);
        break;
      }

      default: {
        break;
      }
    }
  }

  return {
    context,
    helpers,
  };
}

export { promptForContext };
