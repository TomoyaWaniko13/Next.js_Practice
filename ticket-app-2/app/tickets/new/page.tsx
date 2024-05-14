'use client';
import dynamic from 'next/dynamic';

// https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading#nextdynamic
const TicketForm = dynamic(() => import('@/components/TicketForm'), {
  ssr: false,
});

const TicketsNewPage = () => {
  return (
    <>
      <TicketForm />
    </>
  );
};

export default TicketsNewPage;
