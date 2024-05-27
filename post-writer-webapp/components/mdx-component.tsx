'use client';

import { useMDXComponent } from 'next-contentlayer/hooks';
import Image from 'next/image';
import Callout from './callout';

const components = {
  Image,
  Callout,
};

export default function Mdx({ code }: { code: string }) {
  const Component = useMDXComponent(code);

  return (
    // https://tailwindcss.com/blog/tailwindcss-typography
    // https://github.com/tailwindlabs/tailwindcss-typography
    <div className='prose lg:prose-xl max-w-full'>
      <Component components={components} />
    </div>
  );
}
