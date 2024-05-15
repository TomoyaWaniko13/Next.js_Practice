import prisma from '@/prisma/db';
import TicketsDataTable from '@/app/tickets/TicketsDataTable';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import Pagination from '@/components/Pagination';

const TicketsPage = async () => {
  // https://www.prisma.io/docs/orm/prisma-client/queries/crud#read
  const tickets = await prisma.ticket.findMany();

  return (
    <div>
      <Link href={'/tickets/new'} className={buttonVariants({ variant: 'default' })}>
        new ticket
      </Link>
      <TicketsDataTable tickets={tickets} />
      <Pagination itemCount={26} pageSize={10} currentPage={1} />
    </div>
  );
};

export default TicketsPage;
