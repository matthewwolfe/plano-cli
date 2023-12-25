import { resolve } from 'node:path';
import inquirer from 'inquirer';
import { z } from 'zod';

const promptsSchema = z.array(
  z.object({
    message: z.string(),
    name: z.string(),
    required: z.boolean(),
    type: z.union([z.literal('input'), z.literal('select')]),
  })
);

const helpersSchema = z.record(z.function(z.tuple([z.string()]), z.string()));

async function promptForContext(path: string) {
  const { prompts, helpers } = await import(resolve(path, 'context.mjs'));

  const parsedPrompts = promptsSchema.parse(prompts);
  const parsedHelpers = helpersSchema.parse(helpers);

  const context = await inquirer.prompt<Record<string, unknown>>(parsedPrompts);

  return {
    context,
    helpers: parsedHelpers,
  };
}

export { promptForContext };
