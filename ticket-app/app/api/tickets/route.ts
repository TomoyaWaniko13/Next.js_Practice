import { NextRequest, NextResponse } from 'next/server';
import { ticketSchema } from '@/ValidationSchemes/ticket';
import prisma from '@/prisma/db';

// https://nextjs.org/docs/app/api-reference/functions/next-request
export async function POST(request: NextRequest) {
  const body = await request.json();

  // https://www.prisma.io/docs/orm/prisma-client/queries/crud
  // If you don't want Zod to throw errors when validation fails, use .safeParse.
  // This method returns an object containing either the successfully parsed data or
  // a ZodError instance containing detailed information about the validation problems.
  const validation = ticketSchema.safeParse(body);

  if (!validation.success) {
    // https://github.com/colinhacks/zod?tab=readme-ov-file#error-formatting
    // You can use the .format() method to convert this error into a nested object.
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  // https://www.prisma.io/docs/orm/prisma-client/queries/crud
  const newTicket = await prisma?.ticket.create({
    data: { ...body },
  });

  return NextResponse.json(newTicket, { status: 201 });
}
