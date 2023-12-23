import { readFileSync } from 'node:fs';
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

async function getContext(path: string) {
  const { context } = await import(resolve(path, 'context.js'));
  return contextSchema.parse(context);
}

export { getContext };
