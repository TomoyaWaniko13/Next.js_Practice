import prisma from '@/prisma/db';
import DataTable from '@/app/tickets/DataTable';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

const TicketsPage = async () => {
  const tickets = await prisma.ticket.findMany();

  return (
    <div>
      <Link href={'/tickets/new'} className={buttonVariants({ variant: 'default' })}>
        new ticket
      </Link>

      <DataTable tickets={tickets} />
    </div>
  );
};

export default TicketsPage;
