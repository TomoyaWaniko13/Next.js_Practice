'use client';

import { Button } from '@/components/ui/button';
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  numberOfItems: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ numberOfItems, pageSize, currentPage }: Props) => {
  const numberOfPages = Math.ceil(numberOfItems / pageSize);
  const router = useRouter();
  const searchParams = useSearchParams();
  if (numberOfPages <= 1) return null;

  const changePage = (nextPage: number) => {
    const params = new URLSearchParams(searchParams);
    //  change the value of the 'page' parameter to the value of nextPage.
    params.set('page', nextPage.toString());
    // in the context of this code, params.toString() generates a query string from
    // the URLSearchParams object, but it does not include the leading '?' character.
    router.push('?' + params.toString());
  };

  return (
    <div className='mt-4'>
      <div>
        <Button variant={'outline'} disabled={currentPage === 1} onClick={() => changePage(1)}>
          <ChevronFirst />
        </Button>
        <Button variant={'outline'} disabled={currentPage === 1} onClick={() => changePage(currentPage - 1)}>
          <ChevronLeft />
        </Button>
        <Button
          variant={'outline'}
          disabled={currentPage === numberOfPages}
          onClick={() => changePage(currentPage + 1)}
        >
          <ChevronRight />
        </Button>
        <Button variant={'outline'} disabled={currentPage === numberOfPages} onClick={() => changePage(numberOfPages)}>
          <ChevronLast />
        </Button>
      </div>
      <p>
        page {currentPage} of {numberOfPages}
      </p>
    </div>
  );
};

export default Pagination;
