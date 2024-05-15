import prisma from '@/prisma/db';
import TicketDetail from '@/app/tickets/[id]/TicketDetail';

interface Props {
  params: { id: string };
}

const ViewTicketsPage = async ({ params }: Props) => {
  const ticket = await prisma.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!ticket) {
    return <p className={'text-destructive'}>Ticket not found!</p>;
  }

  return (
    <div>
      <TicketDetail ticket={ticket} />
    </div>
  );
};

export default ViewTicketsPage;
