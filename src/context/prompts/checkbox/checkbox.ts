import { z } from 'zod';
import { basePromptSchema } from '../basePromptSchema';

export const checkboxChoiceSchema = z
  .object({
    value: z.string(),
  })
  .passthrough();

export const checkboxSchema = basePromptSchema
  .extend({
    type: z.literal('checkbox'),
    choices: z.array(checkboxChoiceSchema),
  })
  .passthrough();
