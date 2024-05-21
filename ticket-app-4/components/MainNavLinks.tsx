'use client';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

const MainNavLinks = () => {
  const links = [
    { label: 'dashboard', href: '/' },
    { label: 'tickets', href: '/tickets' },
    { label: 'users', href: '/users' },
  ];

  const currentPath = usePathname();

  return (
    <div className={'flex items-center gap-2'}>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href} // Changed from link.label to link.href
          className={`font-medium text-muted-foreground transition-colors hover:text-primary/70 ${currentPath === link.href && 'cursor-default text-primary/70 hover:text-primary/60'}`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default MainNavLinks;
