import { Priority } from '@prisma/client';
import { Flame } from 'lucide-react';

interface Props {
  priority: Priority;
}

const priorityMap: Record<Priority, { label: string; level: 1 | 2 | 3 }> = {
  HIGH: { label: 'High', level: 1 },
  MEDIUM: { label: 'Medium', level: 2 },
  LOW: { label: 'Low', level: 3 },
};

const TicketPriority = ({ priority }: Props) => {
  return (
    <div className={'flex'}>
      {priorityMap[priority].level >= 1 ? <Flame className={'text-red-500'} /> : <Flame className={'text-gray-300'} />}
      {priorityMap[priority].level >= 2 ? <Flame className={'text-red-500'} /> : <Flame className={'text-gray-300'} />}
      {priorityMap[priority].level >= 3 ? <Flame className={'text-red-500'} /> : <Flame className={'text-gray-300'} />}
    </div>
  );
};

export default TicketPriority;
