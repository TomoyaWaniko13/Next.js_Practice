import { Ticket } from '@prisma/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TicketStatusBadge from '@/components/TicketStatusBadge';
import TicketPriority from '@/components/TicketPriority';
import Link from 'next/link';
import { SearchParams } from '@/app/tickets/page';

import { ArrowDown } from 'lucide-react';

interface Props {
  tickets: Ticket[];
  searchParams: SearchParams;
}

const TicketsDataTable = ({ tickets, searchParams }: Props) => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Link href={{ query: { ...searchParams, orderBy: 'title' } }}>title</Link>
              {'title' === searchParams.orderBy && <ArrowDown className={'inline p-1'} />}
            </TableHead>
            <TableHead>
              <Link href={{ query: { ...searchParams, orderBy: 'status' } }}>status</Link>
              {'status' === searchParams.orderBy && <ArrowDown className={'inline p-1'} />}
            </TableHead>
            <TableHead>
              <Link href={{ query: { ...searchParams, orderBy: 'priority' } }}>priority</Link>
              {'priority' === searchParams.orderBy && <ArrowDown className={'inline p-1'} />}
            </TableHead>
            <TableHead>
              <Link href={{ query: { ...searchParams, orderBy: 'createdAt' } }}>created at</Link>
              {'createdAt' === searchParams.orderBy && <ArrowDown className={'inline p-1'} />}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets
            ? tickets.map((ticket) => (
                <TableRow key={ticket.id} data-href={'/'}>
                  <TableCell>
                    <Link href={`/tickets/${ticket.id}`}>{ticket.title}</Link>{' '}
                  </TableCell>
                  <TableCell>
                    <TicketStatusBadge status={ticket.status} />
                  </TableCell>
                  <TableCell>
                    <TicketPriority priority={ticket.priority} />
                  </TableCell>
                  <TableCell>
                    {ticket.createdAt.toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                  </TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </div>
  );
};

export default TicketsDataTable;
