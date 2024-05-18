import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Ticket } from '@prisma/client';
import TicketsStatusBadge from '@/components/TicketsStatusBadge';
import TicketPriority from '@/components/TicketPriority';
import Link from 'next/link';
import { SearchParams } from '@/app/tickets/page';
import { ArrowDown } from 'lucide-react';

interface Props {
  tickets: Ticket[];
  searchParams: SearchParams;
}

// https://nextjs.org/docs/pages/api-reference/components/link
// href can also accept an object,
// hen the query object is passed to the href prop of the Link component in Next.js,
// it is used to construct a URL with query parameters.
// For example, if searchParams is { status: 'open', priority: 'high' }, the resulting URL will
// be something like /tickets?status=open&priority=high&orderBy=title.
const DataTable = ({ tickets, searchParams }: Props) => {
  return (
    <div className={'border'}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <div className={'flex justify-center'}>
                <Link href={{ query: { ...searchParams, orderBy: 'title' } }}>title</Link>
                {'title' === searchParams.orderBy && <ArrowDown className={'inline p-1'} />}
              </div>
            </TableHead>
            <TableHead>
              <div className={'flex justify-center'}>
                <Link href={{ query: { ...searchParams, orderBy: 'status' } }}>status</Link>
                {'status' === searchParams.orderBy && <ArrowDown className={'inline p-1'} />}
              </div>
            </TableHead>
            <TableHead>
              <div className={'flex justify-center'}>
                <Link href={{ query: { ...searchParams, orderBy: 'priority' } }}>priority</Link>
                {'priority' === searchParams.orderBy && <ArrowDown className={'inline p-1'} />}
              </div>
            </TableHead>
            <TableHead>
              <div className={'flex justify-center'}>
                <Link href={{ query: { ...searchParams, orderBy: 'createdAt' } }}>createdAt</Link>
                {'createdAt' === searchParams.orderBy && <ArrowDown className={'inline p-1'} />}
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets
            ? tickets.map((ticket) => (
                <TableRow key={ticket.id} data-href={'/'}>
                  <TableCell>
                    <div className={'flex justify-center'}>
                      <Link href={`/tickets/${ticket.id}`}>{ticket.title}</Link>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex justify-center'>
                      <TicketsStatusBadge status={ticket.status} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex justify-center'>
                      <TicketPriority priority={ticket.priority} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={'flex justify-center'}>
                      {ticket.createdAt.toLocaleDateString('en-US', {
                        year: '2-digit',
                        month: '2-digit',
                        day: '2-digit',
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;
