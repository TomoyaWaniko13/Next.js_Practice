import prisma from '@/prisma/db';
import DataTable from '@/app/tickets/DataTable';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import Pagination from '@/components/Pagination';

interface SearchParams {
  page: string;
}

// searchParams is in the form of {page: '1' }
const TicketsPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const pageSize = 10;
  const currentPage = parseInt(searchParams.page);
  const ticketCount = await prisma.ticket.count();

  const tickets = await prisma.ticket.findMany({
    take: pageSize,
    skip: (currentPage - 1) * pageSize,
  });

  return (
    <div>
      <Link href={'/tickets/new'} className={buttonVariants({ variant: 'default' })}>
        new ticket
      </Link>

      <DataTable tickets={tickets} />
      <Pagination itemCount={ticketCount} pageSize={pageSize} currentPage={currentPage} />
    </div>
  );
};

export default TicketsPage;
