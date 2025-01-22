import { checkbox, input, select } from '@inquirer/prompts';
import { getContextPrompts } from '@pkg/context/getContextPrompts';

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
