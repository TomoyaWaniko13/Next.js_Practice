import type { Metadata } from 'next';
import { Noto_Serif } from 'next/font/google';
import './globals.css';
import MainNav from '@/components/MainNav';
import { ThemeProvider } from 'next-themes';

const inter = Noto_Serif({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ticket Next App',
  description: 'Generated by Tomoya',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ThemeProvider attribute='class' defaultTheme='light' enableSystem disableTransitionOnChange>
          <nav className={'flex flex-col items-center border-b　mb-5 px-5 py-3'}>
            <div className={'max-w-6xl w-full'}>
              <MainNav />
            </div>
          </nav>
          <main className={'flex flex-col items-center border-b　mb-5 px-5 py-3'}>
            <div className={'max-w-6xl w-full'}>{children}</div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
