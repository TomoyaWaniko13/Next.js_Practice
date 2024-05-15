import { NextRequest, NextResponse } from 'next/server';
import { ticketSchema } from '@/ValidationSchemas/ticket';
import prisma from '@/prisma/db';

// we're going to pass in a string value to update our tickets.
interface Props {
  params: { id: string };
}

// server side(backend) api to update a ticket
export async function PATCH(request: NextRequest, { params }: Props) {
  // https://developer.mozilla.org/en-US/docs/Web/API/Request/json
  // https://github.com/colinhacks/zod?tab=readme-ov-file#safeparse
  const body = await request.json();
  const validation = ticketSchema.safeParse(body);

  // https://developer.mozilla.org/en-US/docs/Web/API/Response/json_static
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  // https://www.prisma.io/docs/orm/prisma-client/queries/crud#read
  const ticket = await prisma.ticket.findUnique({ where: { id: parseInt(params.id) } });

  if (!ticket) {
    return NextResponse.json({ error: 'Ticket Not Found' }, { status: 400 });
  }

  // https://www.prisma.io/docs/orm/prisma-client/queries/crud#update
  const updateTicket = await prisma.ticket.update({
    where: { id: ticket.id },
    data: {
      ...body,
    },
  });
  return NextResponse.json(updateTicket, { status: 200 });
}
