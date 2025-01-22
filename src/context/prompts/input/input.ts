import { z } from 'zod';
import { basePromptSchema } from '../basePromptSchema';

export const inputSchema = basePromptSchema
  .extend({
    type: z.literal('input'),
  })
  .passthrough();
