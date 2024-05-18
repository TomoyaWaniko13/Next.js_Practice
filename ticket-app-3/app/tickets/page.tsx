import prisma from '@/prisma/db';
import DataTable from '@/app/tickets/DataTable';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import Pagination from '@/components/Pagination';
import StatusFilter from '@/components/StatusFilter';
import { Status, Ticket } from '@prisma/client';

export interface SearchParams {
  status: Status;
  page: string;
  // orderBy has to be the id of the Ticket.
  orderBy: keyof Ticket;
}

// searchParams is in the form of {page: '1' }
const TicketsPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const pageSize = 10;
  let currentPage = parseInt(searchParams.page);

  const orderBy = searchParams.orderBy ? searchParams.orderBy : 'createdAt';

  // Check if currentPage is a number, if not, default it to 1
  if (isNaN(currentPage)) {
    currentPage = 1;
  }

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;

  let where = {};

  if (status) {
    where = {
      status,
    };
  } else {
    where = {
      NOT: [{ status: 'CLOSED' as Status }],
    };
  }

  const ticketCount = await prisma.ticket.count({ where });

  const tickets = await prisma.ticket.findMany({
    where,
    orderBy: {
      [orderBy]: 'desc',
    },
    take: pageSize,
    skip: (currentPage - 1) * pageSize,
  });

  return (
    <div>
      <div className={'flex gap-2'}>
        <Link href={'/tickets/new'} className={buttonVariants({ variant: 'default' })}>
          new ticket
        </Link>
        <StatusFilter />
      </div>
      <div className={'mt-3'}>
        <DataTable tickets={tickets} searchParams={searchParams} />
        <Pagination itemCount={ticketCount} pageSize={pageSize} currentPage={currentPage} />
      </div>
    </div>
  );
};

export default TicketsPage;
