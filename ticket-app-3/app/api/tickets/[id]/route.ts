import { NextRequest, NextResponse } from 'next/server';
import { ticketSchema } from '@/ValidationSchemas/ticketSchema';
import prisma from '@/prisma/db';

interface Props {
  params: { id: string };
}

// request from /components/TicketForm.tsx
export async function PATCH(request: NextRequest, { params }: Props) {
  const body = await request.json();
  const validation = ticketSchema.safeParse(body);

  // 400 Bad Request
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const ticket = await prisma.ticket.findUnique({ where: { id: parseInt(params.id) } });

  // 404 Not Found
  if (!ticket) {
    return NextResponse.json({ error: 'ticket not found' }, { status: 404 });
  }

  const updateTicket = await prisma.ticket.update({
    where: { id: ticket.id },
    data: { ...body },
  });

  return NextResponse.json(updateTicket);
}