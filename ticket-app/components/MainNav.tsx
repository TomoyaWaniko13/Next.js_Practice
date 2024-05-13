'use client';
import Link from 'next/link';
import ToggleModeButton from '@/components/ToggleModeButton';
import MainNavLinks from '@/components/MainNavLinks';

const MainNav = () => {
  return (
    <div className={'flex justify-between'}>
      <MainNavLinks />
      <div className={'flex items-center gap-2'}>
        <Link href={'/'}>logout</Link>
        <Link href={'/'}>
          <ToggleModeButton />
        </Link>
      </div>
    </div>
  );
};

export default MainNav;
