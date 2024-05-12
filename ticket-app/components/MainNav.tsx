import Link from 'next/link';

const MainNav = () => {
  return (
    <div className={'flex justify-between'}>
      <div className={'flex  items-center gap-2'}>
        <Link href={'/'}>dashboard</Link>
        <Link href={'/tickets'}>tickets</Link>
        <Link href={'/users'}>users</Link>
      </div>
      <div className={'flex items-center gap-2'}>
        <Link href={'/'}>logout</Link>
        <Link href={'/'}>dark</Link>
      </div>
    </div>
  );
};

export default MainNav;
