import { Ticket } from '@prisma/client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import TicketsStatusBadge from '@/components/TicketsStatusBadge';
import TicketPriority from '@/components/TicketPriority';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import Markdown from 'react-markdown';

interface Props {
  ticket: Ticket;
}

// this component is used in '/app/tickets/[id]/page.ts'
const TicketsDetail = ({ ticket }: Props) => {
  return (
    <div className={'lg:grid lg:grid-cols-4'}>
      <Card className={'mx-4 mb-4 lg:col-span-3 lg:mr-4'}>
        <CardHeader>
          <div className={'flex justify-between mb-3'}>
            <TicketsStatusBadge status={ticket.status} />
            <TicketPriority priority={ticket.priority} />
          </div>
          <CardTitle>{ticket.title}</CardTitle>
          <CardDescription>
            Created:{' '}
            {ticket.createdAt.toLocaleDateString('ja-JP', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: 'numeric',
              minute: '2-digit',
            })}
          </CardDescription>
        </CardHeader>
        <CardContent className={'prose dark:prose-invert'}>
          <Markdown>{ticket.description}</Markdown>
        </CardContent>
        <CardFooter>
          updated:{' '}
          {ticket.updatedAt.toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: 'numeric',
            minute: '2-digit',
          })}
        </CardFooter>
      </Card>
      <div className={'flex flex-col gap-2'}>
        <Link href={`/tickets/edit/${ticket.id}`} className={buttonVariants({ variant: 'default' })}>
          edit ticket
        </Link>
        <Link href={`/tickets/delete/${ticket.id}`} className={buttonVariants({ variant: 'default' })}>
          delete ticket
        </Link>
      </div>
    </div>
  );
};

export default TicketsDetail;
