import prisma from '@/prisma/db';
import TicketsDataTable from '@/app/tickets/TicketsDataTable';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import Pagination from '@/components/Pagination';
import StatusFilter from '@/components/StatusFilter';

interface SearchParams {
  page: string;
}

const TicketsPage = async ({ searchParams }: SearchParams) => {
  // sets the pageSize to 10 and determines the currentPage based on searchParams.page.
  // If searchParams.page is not provided, it defaults to 1.
  const pageSize = 10;
  const currentPage = parseInt(searchParams.page) || 1;

  // The component then fetches the total count of tickets
  // from the database using prisma.ticket.count().
  // It also fetches a page of tickets using prisma.ticket.findMany(),
  // with the number of tickets determined by pageSize and the page number
  // by currentPage.

  // The take property is used to limit the number of tickets returned, which
  // is set to the pageSize. The skip property is used to control where to start
  // fetching tickets from.
  const numberOfItems = await prisma.ticket.count();
  const tickets = await prisma.ticket.findMany({
    take: pageSize,
    skip: (currentPage - 1) * pageSize,
  });

  return (
    <div>
      <Link href={'/tickets/new'} className={buttonVariants({ variant: 'default' })}>
        new ticket
      </Link>
      <StatusFilter />
      <TicketsDataTable tickets={tickets} />
      <Pagination numberOfItems={numberOfItems} pageSize={pageSize} currentPage={currentPage} />
    </div>
  );
};

export default TicketsPage;
