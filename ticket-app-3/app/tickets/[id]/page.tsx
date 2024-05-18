import prisma from '@/prisma/db';
import TicketsDetail from '@/app/tickets/[id]/TicketsDetail';

interface Props {
  params: { id: string };
}

const ViewTicketsPage = async ({ params }: Props) => {
  const ticket = await prisma.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!ticket) {
    return <p className={'text-destructive'}>ticket not found!</p>;
  }

  return (
    <div>
      <TicketsDetail ticket={ticket} />
    </div>
  );
};

export default ViewTicketsPage;
