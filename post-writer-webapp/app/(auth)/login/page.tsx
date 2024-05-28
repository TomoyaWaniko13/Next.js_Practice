// import UserAuthForm from '@/components/user-auth-form';
import Link from 'next/link';
import UserAuthForm from '@/components/ui/user-auth-form';

const LoginPage = () => {
  return (
    <div className='container flex flex-col justify-center items-center h-screen w-screen'>
      <div className='mx-auto w-full sm:w-[350px] flex flex-col justify-center space-y-6'>
        <div className='text-center space-y-2'>
          <h1 className='text-2xl font-semibold tracking-tight'>Welcome Back</h1>
          <p className='text-sm text-muted-foreground'>メールアドレスを入力してログインできます。</p>
        </div>

        <UserAuthForm />

        <p className='text-muted-foreground px-8 text-center text-sm'>
          <Link href={'/register'} className='underline underline-offset-4'>
            アカウントを持っていませんか？
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
