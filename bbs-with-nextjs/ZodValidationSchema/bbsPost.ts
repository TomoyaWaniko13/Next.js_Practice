import { z } from 'zod';

export const formSchema = z.object({
  username: z.string().min(2, { message: 'Username must be at least 2 characters.' }),
  title: z.string().min(2, { message: 'title must be at least 2 characters.' }),
  content: z
    .string()
    .min(2, { message: 'content must be at least 2 characters.' })
    .max(200, { message: 'content must be at most 200 characters.' }),
});
