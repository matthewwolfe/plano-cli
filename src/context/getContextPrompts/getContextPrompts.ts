import { resolve } from 'node:path';
import { z } from 'zod';
import { existsSync } from 'node:fs';
import {
  checkboxSchema,
  inputSchema,
  selectSchema,
} from '@pkg/context/prompts';

import type { PromptForContextOptions } from '../promptForContext/promptForContext';

const promptsSchema = z.optional(
  z.array(
    z.discriminatedUnion('type', [checkboxSchema, inputSchema, selectSchema]),
  ),
);
export type PromptsSchema = z.infer<typeof promptsSchema>;

const helpersSchema = z.optional(
  z.record(z.function(z.tuple([z.string()]), z.string())),
);

async function getContextPrompts({
  template: { path, template },
  preprocessContext,
}: PromptForContextOptions) {
  const contextFilePath = resolve(`${path}/${template}`, 'context.mjs');

  if (!existsSync(contextFilePath)) {
    return {
      prompts: [],
      helpers: {},
    };
  }

  let { prompts, helpers } = await import(contextFilePath);

  if (preprocessContext) {
    prompts = preprocessContext(prompts);
  }

  const parsedPrompts = promptsSchema.parse(prompts) || [];
  const parsedHelpers = helpersSchema.parse(helpers) || {};

  return {
    prompts: parsedPrompts,
    helpers: parsedHelpers,
  };
}

export { getContextPrompts };
