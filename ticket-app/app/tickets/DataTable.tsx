import { Ticket } from '@prisma/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Props {
  tickets: Ticket[];
}

const DataTable = ({ tickets }: Props) => {
  return (
    <div className={'w-full mt-4'}>
      <div className={'rounded-md sm:border'}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>title</TableHead>
              <TableHead>status</TableHead>
              <TableHead>priority</TableHead>
              <TableHead>crated at</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets
              ? tickets.map((ticket: Ticket) => (
                  <TableRow key={ticket.id} data-href={'/'}>
                    <TableCell>{ticket.title}</TableCell>
                    <TableCell>{ticket.status}</TableCell>
                    <TableCell>{ticket.priority}</TableCell>
                    <TableCell>{ticket.createdAt.toLocaleDateString()}</TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataTable;
