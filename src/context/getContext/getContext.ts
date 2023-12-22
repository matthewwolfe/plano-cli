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

function getContext(path: string) {
  const file = resolve(path, 'context.json');
  const json = readFileSync(file, 'utf-8');

  return contextSchema.parse(JSON.parse(json));
}

export { getContext };
