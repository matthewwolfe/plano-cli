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

  for (let x = 0; x < prompts.length; x++) {
    const { type, ...prompt } = prompts[x];
    let result;
    switch (type) {
      case 'checkbox':
        result = await checkbox(prompt as z.infer<typeof checkboxSchema>);
        context[prompt.name] = result;
        break;
      case 'input':
        result = await input(prompt as z.infer<typeof inputSchema>);
        context[prompt.name] = result;
        break;
      case 'select':
        result = await select(prompt as z.infer<typeof selectSchema>);
        context[prompt.name] = result;
        break;
      default:
        break;
    }
  }

  return {
    context,
    helpers,
  };
}

export { promptForContext };
