'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const statuses: { label: string; value?: string }[] = [
  { label: 'Open / Started' },
  { label: 'Open', value: 'OPEN' },
  { label: 'Started', value: 'STARTED' },
  { label: 'Closed', value: 'CLOSED' },
];

const StatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Select
      defaultValue={searchParams.get('status') || ''}
      onValueChange={(statusValue) => {
        const params = new URLSearchParams();
        // now params.toString is 'status=0', 'status=OPEN', 'status=STARTED', or 'status=CLOSED'
        if (statusValue) params.append('status', statusValue);

        // params.size = The total number of parameter entries.
        // now the queryString is '?status=0', '?status=OPEN', '?status=STARTED', or '?status=CLOSED'
        const queryString = params.size ? `?${params.toString()}` : '0';

        router.push(`/tickets${queryString}`);
      }}
    >
      <SelectTrigger className=' w-[200px]'>
        <SelectValue placeholder='Filter by Status...' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {statuses.map((status) => (
            <SelectItem key={status.value || '0'} value={status.value || '0'}>
              {status.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default StatusFilter;
