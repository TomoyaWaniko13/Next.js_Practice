import dynamic from 'next/dynamic';
import React from 'react';
import prisma from '@/prisma/db';

interface Props {
  params: { id: string };
}

// https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading#nextdynamic
const TicketForm = dynamic(() => import('@/components/TicketForm'), {
  ssr: false,
});

const EditTicketPage = async ({ params }: Props) => {
  const ticket = await prisma?.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!ticket) {
    return <p className=' text-destructive'>Ticket not found!</p>;
  }

  return <TicketForm ticket={ticket} />;
};

export default EditTicketPage;
