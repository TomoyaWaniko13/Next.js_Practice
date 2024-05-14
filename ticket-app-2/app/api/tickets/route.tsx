import { NextRequest, NextResponse } from 'next/server';
import { ticketSchema } from '@/ValidationSchemas/ticket';
import prisma from '@/prisma/db';

// server side(backend) api
export async function POST(request: NextRequest) {
  const body = await request.json();
  // https://github.com/colinhacks/zod?tab=readme-ov-file#safeparse
  const validation = ticketSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  // https://www.prisma.io/docs/orm/prisma-client/queries/crud#create
  const newTicket = await prisma.ticket.create({
    data: { ...body },
  });
  // https://nextjs.org/docs/app/api-reference/functions/next-response#json
  return NextResponse.json(newTicket, { status: 201 });
}
