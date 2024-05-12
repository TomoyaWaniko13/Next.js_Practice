import Link from 'next/link';

const Header = () => {
  return (
    <header className={'p-20 border border-yellow-400'}>
      <ul className={'flex space-x-4'}>
        <li><Link href={'/'}>home</Link></li>
        <li><Link href={'/about'}>about</Link></li>
        <li><Link href={'/about/projects'}>projects</Link></li>
      </ul>
    </header>
  );
};

export default Header;