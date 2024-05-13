import prisma from '@/prisma/db';
import DataTable from '@/app/tickets/DataTable';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

const TicketsPage = async () => {
  const tickets = await prisma.ticket.findMany();
  return (
    <>
      <Link href={'/tickets/new'} className={buttonVariants({ variant: 'default' })}>
        new ticket
      </Link>
      <DataTable tickets={tickets} />
    </>
  );
};

export default TicketsPage;
