import { checkbox, input, select } from '@inquirer/prompts';
import { resolve } from 'node:path';
import { z } from 'zod';
import { existsSync } from 'node:fs';
import {
  checkboxSchema,
  inputSchema,
  selectSchema,
} from '@pkg/context/prompts';

interface GetContextPromptsOptions {
  template: {
    path: string;
    template: string;
  };
}

const promptsSchema = z.optional(
  z.array(
    z.discriminatedUnion('type', [checkboxSchema, inputSchema, selectSchema]),
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
