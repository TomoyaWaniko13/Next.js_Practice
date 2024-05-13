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
  // The body is passed to the prisma.ticket.create method from the POST request
  // made by the client-side code. Here's how it works:

  // The `body` is passed to the `prisma.ticket.create` method from the `POST` request made by the client-side code.
  // Here's how it works:
  //
  // 1. When the form is submitted on the client side, an HTTP POST request is made to the server.
  // The data from the form is included in the body of this request. This is done using the `axios.post`
  // method in the `onSubmit` function in the `TicketForm.tsx` file:
  //
  // await axios.post('/api/tickets', values);
  //
  // In this code, `values` is the data from the form, which is passed as the second argument to `axios.post`.
  //
  //
  // 2. On the server side, in the `POST` function in the `route.ts` file, the `request.json()` method
  // is used to parse the body of the request as JSON:
  //
  // const body = await request.json();
  //
  // In this code, `body` is an asynchronous operation that resolves to the data from the POST request.
  //
  //
  // 3. This `body` is then passed to the `prisma.ticket.create` method:
  //
  // const newTicket = await prisma?.ticket.create({
  //   data: { ...body },
  // });
  //
  // In this code, `{ ...body }` is using the spread operator to create a new object with the same properties as `body`.
  // This new object is then passed as the `data` property of the object argument to `prisma.ticket.create`. This
  // `data` object contains the data for the new record that will be created in the `ticket` table in your database.

  const newTicket = await prisma?.ticket.create({
    data: { ...body },
  });

  return NextResponse.json(newTicket, { status: 201 });
}
