'use client';

import { cn } from '@/lib/utils';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button, buttonVariants } from '@/components/ui/button';
import { FaGithub } from 'react-icons/fa';

export default function UserAuthForm() {
  return (
    <div className='grid gap-6'>
      <form>
        <div className='grid gap-2'>
          <Label htmlFor='email'>メールアドレス</Label>
          <Input id='email' placeholder='name@example.com' type='email' />
          <button className={cn(buttonVariants())}>メールアドレスでログイン</button>
        </div>
      </form>

      <div className={'relative'}>
        <div className='absolute inset-0 flex items-center'>
          <span className='z-0 w-full border-t' />
        </div>
        <div className='flex justify-center text-xs'>
          <span className='z-10 text-muted-foreground px-2 bg-background'>または</span>
        </div>
      </div>

      <div className='flex flex-col gap-3'>
        <Button variant={'outline'}>
          <FaGithub className={'mr-3'} size={25} />
          Github
        </Button>
      </div>
    </div>
  );
}
