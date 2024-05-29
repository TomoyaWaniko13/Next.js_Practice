import prisma from '@/lib/prismaClient';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const allBBSPosts = await prisma.post.findMany();
  return NextResponse.json(allBBSPosts);
}

// export async function POST(req: Request) {
//   const body = await req.json();
//   console.log(body);
//   const newBBSPost = await prisma.post.create({
//     data: { ...body },
//   });
//   return NextResponse.json(newBBSPost, { status: 201 });
// }
