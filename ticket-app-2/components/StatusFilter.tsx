'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const statuses: { label: string; value?: string }[] = [
  { label: 'Open / Started' },
  { label: 'Open', value: 'OPEN' },
  { label: 'Started', value: 'STARTED' },
  { label: 'Closed', value: 'CLOSED' },
];

const StatusFilter = () => {
  const router = useRouter();
  // https://nextjs.org/docs/app/api-reference/functions/use-search-params
  // useSearchParams is a Client Component hook that lets you read the current URL's query string.
  const searchParams = useSearchParams();
  return (
    // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/get
    // The get() method of the URLSearchParams interface returns the first value associated to the given search parameter.
    // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
    // The URLSearchParams interface defines utility methods to work with the query string of a URL.
    // https://developer.mozilla.org/en-US/docs/web/api/urlsearchparams/append
    // The append() method of the URLSearchParams interface appends a specified key/value pair as a new search parameter.
    <Select
      defaultValue={searchParams.get('status') || ''}
      onValueChange={(status) => {
        const params = new URLSearchParams();
        if (status) params.append('status', status);
        const query = params.size ? `${params.toString()} ` : '0';
        router.push(`/tickets${query}`);
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder={'filter by status'}>
          <SelectContent>
            <SelectGroup>
              {statuses.map((status) => (
                <SelectItem key={status.value || '0'} value={status.value || '0'}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </SelectValue>
      </SelectTrigger>
    </Select>
  );
};

export default StatusFilter;
