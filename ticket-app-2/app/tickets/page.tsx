import prisma from '@/prisma/db';
import DataTable from '@/app/tickets/DataTable';

const TicketsPage = async () => {
  // https://www.prisma.io/docs/orm/prisma-client/queries/crud#read
  const tickets = await prisma.ticket.findMany();

  return (
    <div>
      <DataTable tickets={tickets} />
    </div>
  );
};

export default TicketsPage;
