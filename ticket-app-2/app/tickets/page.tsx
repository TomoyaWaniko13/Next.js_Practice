import React from 'react';
import prisma from '@/prisma/db';
import TicketsDataTable from './TicketsDataTable';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import Pagination from '@/components/Pagination';
import StatusFilter from '@/components/StatusFilter';
import { Status, Ticket } from '@prisma/client';

export interface SearchParams {
  status: Status;
  page: string;
  orderBy: keyof Ticket;
}

const TicketsPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const pageSize = 10;
  const currentPageNumber = parseInt(searchParams.page) || 1;

  const orderBy = searchParams.orderBy ? searchParams.orderBy : 'createdAt';

  // statuses =  [ 'OPEN', 'STARTED', 'CLOSED' ]
  const statuses = Object.values(Status);
  // status = OPEN, STARTED, CLOSED, or undefined
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;

  let where = {};
  if (status) {
    // if the status is not undefined...
    where = {
      status,
    };
  } else {
    where = {
      NOT: [{ status: 'CLOSED' as Status }],
    };
  }

  const numberOfTickets = await prisma.ticket.count({ where });
  // where: This is an object that defines the conditions for which tickets to fetch.
  // The tickets that meet these conditions are returned. If where is an empty object,
  // it means there are no conditions and all tickets will be returned.

  // orderBy: This is an object that defines how to sort the tickets that are returned.
  // In this case, tickets are being sorted by the field specified in orderBy in descending order (desc).

  // take: This is the maximum number of tickets that will be returned. In this case,
  // it's set to pageSize, which is the number of tickets per page.

  // skip: This is the number of tickets to skip before starting to return tickets.
  // It's used for pagination. If you're on page 1, you don't skip any tickets.
  // If you're on page 2, you skip the first pageSize number of tickets, and so on.
  const tickets = await prisma.ticket.findMany({
    where,
    orderBy: {
      [orderBy]: 'desc',
    },
    take: pageSize,
    skip: (currentPageNumber - 1) * pageSize,
  });

  return (
    <div>
      <div className='flex gap-2'>
        <Link href='/tickets/new' className={buttonVariants({ variant: 'default' })}>
          New Ticket
        </Link>
        <StatusFilter />
      </div>
      <TicketsDataTable tickets={tickets} searchParams={searchParams} />
      <Pagination numberOfTickets={numberOfTickets} pageSize={pageSize} currentPage={currentPageNumber} />
    </div>
  );
};

export default TicketsPage;
