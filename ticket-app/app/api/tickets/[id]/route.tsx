import { NextRequest, NextResponse } from 'next/server';
import { Route } from 'lucide-react';
import { ticketSchema } from '@/ValidationSchemes/ticket';
import prisma from '@/prisma/db';

interface Props {
  params: { id: String };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const body = await request.json();
  const validation = ticketSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  // https://www.prisma.io/docs/orm/prisma-client/queries/crud#read
  const ticket = await prisma.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!ticket) {
    return NextResponse.json({ error: 'ticket not found' }, { status: 404 });
  }

  // https://www.prisma.io/docs/orm/prisma-client/queries/crud#update
  const updateTicket = await prisma.ticket.update({
    where: { id: ticket.id },
    data: {
      ...body,
    },
  });

  return NextResponse.json(updateTicket);
}

export default Route;
