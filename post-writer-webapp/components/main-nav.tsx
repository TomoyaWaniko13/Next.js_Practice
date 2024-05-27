'use client';

import { NavLink } from '@/types';
import Link from 'next/link';
import { ReactNode, useState } from 'react';
import MobileNav from './mobile-nav';

interface MainNavProps {
  links: NavLink[];
  children?: ReactNode;
}

export default function MainNav({ links }: MainNavProps) {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  return (
    <div className='flex items-center md:gap-10'>
      <Link href={'/'} className='hidden md:flex items-center space-x-2'>
        <span className='font-bold hidden sm:inline-block'>Post Writer</span>
      </Link>
      <nav className='md:flex gap-6 hidden'>
        {links?.map((link, index) => (
          <Link key={index} href={link.href} className='text-lg sm:text-sm font-medium hover:text-foreground/80'>
            {link.title}
          </Link>
        ))}
      </nav>
      <button className='md:hidden' onClick={() => setShowMobileMenu(!showMobileMenu)}>
        <span>メニュー</span>
      </button>
      {showMobileMenu && <MobileNav links={links} />}
    </div>
  );
}
