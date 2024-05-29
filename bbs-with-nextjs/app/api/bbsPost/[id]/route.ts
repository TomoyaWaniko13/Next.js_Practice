import prisma from '@/lib/prismaClient';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const postId = params.id;
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(postId),
    },
  });
  return NextResponse.json(post);
}
