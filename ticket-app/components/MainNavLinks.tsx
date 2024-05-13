import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MainNavLinks = () => {
  const links = [
    { label: 'dashboard', href: '/' },
    { label: 'tickets', href: '/tickets' },
    { label: 'users', href: '/users' },
  ];

  const currentPath = usePathname();

  return (
    <div className={'flex  items-center gap-2'}>
      {links.map((link) => (
        <Link
          href={link.href}
          className={`navbar-link ${currentPath == link.href && 'cursor-default underline text-primary/100 hover:text-primary/80'}`}
          key={link.label}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default MainNavLinks;
