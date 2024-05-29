'use server';

import { z } from 'zod';
import { formSchema } from '@/ZodValidationSchema/bbsPost';
import prisma from '@/lib/prismaClient';

export const postBBS = async (values: z.infer<typeof formSchema>) => {
  const post = await prisma.post.create({
    data: { ...values },
  });
};
