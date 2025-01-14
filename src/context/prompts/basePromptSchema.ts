import { z } from 'zod';

export const basePromptSchema = z.object({
  message: z.string(),
  name: z.string(),
  required: z.boolean(),
});
