import prisma from '@/prisma/db';
import DataTable from '@/app/tickets/DataTable';

const TicketsPage = async () => {
  const tickets = await prisma.ticket.findMany();
  return (
    <>
      <DataTable tickets={tickets} />
    </>
  );
};

export default TicketsPage;
