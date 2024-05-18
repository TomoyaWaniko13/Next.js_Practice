'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const statuses: { label: String; value?: string }[] = [
  { label: 'open/started' },
  { label: 'open', value: 'OPEN' },
  { label: 'started', value: 'STARTED' },
  { label: 'closed', value: 'CLOSED' },
];

const StatusFilter = () => {
  const router = useRouter();
  // https://nextjs.org/docs/app/api-reference/functions/use-search-params
  // useSearchParams is a Client Component hook that lets you read the current URL's query string.
  const searchParams = useSearchParams();

  return (
    <Select
      defaultValue={searchParams.get('status') || ''}
      onValueChange={(status) => {
        //   https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
        const params = new URLSearchParams();
        if (status) params.append('status', status);
        const queryString = params.size ? `?${params.toString()}` : '0';
        router.push(`/tickets${queryString}`);
      }}
    >
      <SelectTrigger className={'w-[200px]'}>
        <SelectValue placeholder={'filter by status...'} />
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
