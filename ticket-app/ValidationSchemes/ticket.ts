import { z } from 'zod';

// https://github.com/colinhacks/zod?tab=readme-ov-file#objects
export const ticketSchema = z.object({
  title: z.string().min(1, 'title is required').max(255),
  description: z.string().min(1, 'description is required').max(65535),
  status: z.string().min(1, 'status').max(10).optional(),
  priority: z.string().min(1, 'priority').max(10).optional(),
});
