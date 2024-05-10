import prisma from '@/prisma/db';
import DataTable from '@/app/tickets/DataTable';

const Page = async () => {
  const tickets = await prisma.ticket.findMany();

  return (
    <div>
      <div>
        <DataTable tickets={tickets} />
      </div>
    </div>
  );
};

export default Page;
