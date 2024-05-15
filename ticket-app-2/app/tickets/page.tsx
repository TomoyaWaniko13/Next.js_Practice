import prisma from '@/prisma/db';
import TicketsDataTable from '@/app/tickets/TicketsDataTable';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

const TicketsPage = async () => {
  // https://www.prisma.io/docs/orm/prisma-client/queries/crud#read
  const tickets = await prisma.ticket.findMany();

  return (
    <div>
      <Link href={'/tickets/new'} className={buttonVariants({ variant: 'default' })}>
        new ticket
      </Link>
      <TicketsDataTable tickets={tickets} />
    </div>
  );
};

export default TicketsPage;
