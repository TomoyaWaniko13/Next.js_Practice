'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

const ToggleMode = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Button variant={'outline'} size={'icon'} disabled={true}></Button>;
  }

  const currentlyDark = theme === 'dark';

  return (
    <Button variant={'outline'} size={'icon'} onClick={() => setTheme(currentlyDark ? 'light' : 'dark')}>
      {currentlyDark ? (
        <Sun className={'hover:cursor-pointer hover:text-primary'} />
      ) : (
        <Moon className={'hover:cursor-pointer hover:text-primary'} />
      )}
    </Button>
  );
};

export default ToggleMode;
