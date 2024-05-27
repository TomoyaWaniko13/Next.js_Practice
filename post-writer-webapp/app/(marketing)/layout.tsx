import MainNav from '@/components/main-nav';
import SiteFooter from '@/components/site-footer';
import { buttonVariants } from '@/components/ui/button';
import { marketingConfig } from '@/config/marketing';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// マーケティングに関する共通のHTML/CSSはこのlayout.tsx fileに書く。
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header className='container z-40 bg-background'>
        <div className='h-20 py-6 flex items-center justify-between'>
          <MainNav links={marketingConfig.mainNavLinks} />
          <nav>
            <Link href={'/login'} className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }), 'px-4')}>
              ログイン
            </Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
