import { z } from 'zod';
import { basePromptSchema } from '../basePromptSchema';

const selectChoiceSchema = z
  .object({
    value: z.string(),
  })
  .passthrough();

export const selectSchema = basePromptSchema
  .extend({
    type: z.literal('select'),
    choices: z.array(selectChoiceSchema),
  })
  .passthrough();
