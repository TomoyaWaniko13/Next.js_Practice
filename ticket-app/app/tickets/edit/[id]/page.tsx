import dynamic from 'next/dynamic';
import prisma from '@/prisma/db';

interface Props {
  params: { id: string };
}

// Here, TicketForm is a dynamically imported component from the @/components/TicketForm path.
// The { ssr: false } option indicates that the component will not be rendered on the server side,
// but on the client side.
const TicketForm = dynamic(() => import('@/components/TicketForm'), { ssr: false });

// The EditTicket component is an asynchronous function that takes an object with
// a params property as an argument. It uses the prisma client to fetch a unique
// ticket from the database based on the id provided in params
const EditTicket = async ({ params }: Props) => {
  const ticket = await prisma?.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!ticket) {
    return <p className={'text-destructive'}>ticket not found! </p>;
  }

  return <TicketForm ticket={ticket} />;
};

export default EditTicket;
