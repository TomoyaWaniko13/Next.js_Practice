'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MainNavLinks = () => {
  const links = [
    { label: 'dashboard', href: '/' },
    { label: 'tickets', href: '/tickets' },
    { label: 'users', href: '/users' },
  ];

  const currentPath = usePathname();
  console.log(currentPath);

  return (
    <div className={'flex items-center gap-2'}>
      {links.map((link) => (
        <Link
          href={link.href}
          className={`font-medium text-muted-foreground transition-colors hover:text-primary ${currentPath === link.href && 'cursor-default text-primary/80'}`}
          key={link.label}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default MainNavLinks;
