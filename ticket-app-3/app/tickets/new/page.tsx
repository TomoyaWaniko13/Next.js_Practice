import dynamic from 'next/dynamic';

const TicketForm = dynamic(() => import('@/components/TicketForm'), {
  ssr: false,
});

const NewTicketPage = () => {
  return (
    <div>
      <TicketForm />
    </div>
  );
};

export default NewTicketPage;
