import { NextRequest, NextResponse } from 'next/server';
import { ticketSchema } from '@/ValidationSchema/ticket';
import prisma from '@/prisma/db';

interface Props {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const body = await request.json();
  const validation = ticketSchema.safeParse(body);

  // 400 bad request
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const ticket = await prisma.ticket.findUnique({ where: { id: parseInt(params.id) } });

  // 404 not found
  if (!ticket) {
    return NextResponse.json({ error: 'ticket not found' }, { status: 404 });
  }

  const updateTicket = await prisma.ticket.update({
    where: { id: ticket.id },
    data: { ...body },
  });

  return NextResponse.json(updateTicket);
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const ticket = await prisma.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });

  // 404 not found
  if (!ticket) {
    return NextResponse.json({ error: 'Ticket Not Found.' }, { status: 404 });
  }

  await prisma.ticket.delete({
    where: { id: ticket.id },
  });

  return NextResponse.json({ message: 'Ticket Deleted.' });
}
