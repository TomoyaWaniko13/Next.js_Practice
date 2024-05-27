import { siteConfig } from '@/config/site';
import { NavLink } from '@/types';
import { useLockBodyScroll } from '@uidotdev/usehooks';
import Link from 'next/link';

interface MobileNavProps {
  links: NavLink[];
}

// the value of the 'links' is:

// [
//     {
//         "title": "特徴",
//         "href": "#features"
//     },
//     {
//         "title": "ブログ",
//         "href": "/blog"
//     },
//     {
//         "title": "価格",
//         "href": "/pricing"
//     }
// ]

export default function MobileNav({ links }: MobileNavProps) {
  console.log(links);
  useLockBodyScroll();

  return (
    <div className='fixed top-16 inset-0 z-50 p-6 shadow-md md:hidden animate-in slide-in-from-bottom-80'>
      <div className='grid gap-6 bg-white p-4 text-popover-foreground shadow-md'>
        <Link href={'/'} className='font-bold'>
          {siteConfig.name}
        </Link>
        <nav className='text-sm flex flex-col gap-2'>
          {links.map((link, index) => (
            <Link key={index} href={link.href} className='p-2 font-medium hover:underline'>
              {link.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
