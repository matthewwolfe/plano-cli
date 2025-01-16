import { z } from 'zod';
import { checkbox, input, select } from '@inquirer/prompts';
import { getContextPrompts } from '@pkg/context/getContextPrompts';
import {
  checkboxSchema,
  inputSchema,
  selectSchema,
} from '@pkg/context/prompts';

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

  const context: Record<string, unknown> = {};

  for (let i = 0; i < prompts.length; i++) {
    const { type, ...prompt } = prompts[i];

    switch (type) {
      case 'checkbox': {
        context[prompt.name] = await checkbox(
          prompt as z.infer<typeof checkboxSchema>,
        );

        break;
      }

      case 'input': {
        context[prompt.name] = await input(
          prompt as z.infer<typeof inputSchema>,
        );

        break;
      }

      case 'select': {
        context[prompt.name] = await select(
          prompt as z.infer<typeof selectSchema>,
        );

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
