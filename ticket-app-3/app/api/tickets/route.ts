import { NextRequest, NextResponse } from 'next/server';
import { ticketSchema } from '@/ValidationSchemas/ticketSchema';
import prisma from '@/prisma/db';

// request from /components/TicketForm.tsx
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = ticketSchema.safeParse(body);

  // 400 Bad Request
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const newTicket = await prisma.ticket.create({
    data: { ...body },
  });

  // 201 Created
  return NextResponse.json(newTicket, { status: 201 });
}
