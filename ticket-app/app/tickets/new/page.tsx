import dynamic from 'next/dynamic';

// https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading#nextdynamic
const TicketForm = dynamic(() => import('@/components/TicketForm'), { ssr: false });

const NewTicket = () => {
  return (
    <div>
      <TicketForm />
    </div>
  );
};

export default NewTicket;
