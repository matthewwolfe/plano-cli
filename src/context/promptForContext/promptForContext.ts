import { resolve } from 'node:path';
import inquirer from 'inquirer';
import { z } from 'zod';
import { existsSync } from 'node:fs';

interface PromptForContextOptions {
  template: {
    path: string;
    template: string;
  };
}

const promptsSchema = z.optional(
  z.array(
    z.object({
      message: z.string(),
      name: z.string(),
      required: z.boolean(),
      type: z.union([z.literal('input'), z.literal('select')]),
    })
  )
);

const helpersSchema = z.optional(
  z.record(z.function(z.tuple([z.string()]), z.string()))
);

async function promptForContext({
  template: { path, template },
}: PromptForContextOptions) {
  const contextFilePath = resolve(`${path}/${template}`, 'context.mjs');

  if (!existsSync(contextFilePath)) {
    return {
      context: {},
      helpers: {},
    };
  }

  const { prompts, helpers } = await import(contextFilePath);

  const parsedPrompts = promptsSchema.parse(prompts) || [];
  const parsedHelpers = helpersSchema.parse(helpers) || {};

  const context =
    (await inquirer.prompt<Record<string, unknown>>(parsedPrompts)) || {};

  return {
    context,
    helpers: parsedHelpers,
  };
}

export { promptForContext };
