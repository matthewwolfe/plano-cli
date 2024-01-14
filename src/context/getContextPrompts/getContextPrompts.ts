import { resolve } from 'node:path';
import { z } from 'zod';
import { existsSync } from 'node:fs';

interface GetContextPromptsOptions {
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
    }),
  ),
);

const helpersSchema = z.optional(
  z.record(z.function(z.tuple([z.string()]), z.string())),
);

async function getContextPrompts({
  template: { path, template },
}: GetContextPromptsOptions) {
  const contextFilePath = resolve(`${path}/${template}`, 'context.mjs');

  if (!existsSync(contextFilePath)) {
    return {
      prompts: [],
      helpers: {},
    };
  }

  const { prompts, helpers } = await import(contextFilePath);

  const parsedPrompts = promptsSchema.parse(prompts) || [];
  const parsedHelpers = helpersSchema.parse(helpers) || {};

  return {
    prompts: parsedPrompts,
    helpers: parsedHelpers,
  };
}

export { getContextPrompts };
