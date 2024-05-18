import Link from 'next/link';
import ToggleMode from '@/components/ToggleMode';
import MainNavLinks from '@/components/MainNavLinks';

const MainNav = () => {
  return (
    <div className={'flex justify-between'}>
      <MainNavLinks />
      <div className={'flex items-center gap-2'}>
        <ToggleMode />
        <Link href={'/'}>dark</Link>
      </div>
    </div>
  );
};

export default MainNav;
