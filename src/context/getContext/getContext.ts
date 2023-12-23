import { resolve } from 'node:path';
import { z } from 'zod';

const contextSchema = z.array(
  z.object({
    message: z.string(),
    name: z.string(),
    required: z.boolean(),
    type: z.union([z.literal('input'), z.literal('select')]),
  })
);

const helpersSchema = z.record(z.function(z.tuple([z.string()]), z.string()));

async function getContext(path: string) {
  const { context, helpers } = await import(resolve(path, 'context.mjs'));

  return {
    context: contextSchema.parse(context),
    helpers: helpersSchema.parse(helpers),
  };
}

export { getContext };
