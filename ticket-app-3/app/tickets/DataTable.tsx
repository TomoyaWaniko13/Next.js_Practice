import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Ticket } from '@prisma/client';
import TicketsStatusBadge from '@/components/TicketsStatusBadge';
import TicketPriority from '@/components/TicketPriority';
import Link from 'next/link';

interface Props {
  tickets: Ticket[];
}

const DataTable = ({ tickets }: Props) => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>title</TableHead>
            <TableHead>status</TableHead>
            <TableHead>priority</TableHead>
            <TableHead>created at</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets
            ? tickets.map((ticket) => (
                <TableRow key={ticket.id} data-href={'/'}>
                  <TableCell>
                    <Link href={`/tickets/${ticket.id}`}>{ticket.title}</Link>
                  </TableCell>
                  <TableCell>
                    <TicketsStatusBadge status={ticket.status} />
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

export default DataTable;
