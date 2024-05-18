'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  const iconLayout = 'hover:cursor-pointer hover:text-primary';

  return (
    <div>
      <Button variant={'outline'} size={'icon'} onClick={() => setTheme(currentlyDark ? 'light' : 'dark')}>
        {currentlyDark ? <Sun className={iconLayout} /> : <Moon className={iconLayout} />}
      </Button>
    </div>
  );
};

export default ToggleMode;
