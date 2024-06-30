import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';

const notoSansJP = Noto_Sans_JP({ subsets: ['latin'] });

//  metadata オブジェクトは、ウェブサイトのメタデータを定義しています。メタデータは、
//  ウェブサイトの情報を検索エンジンやソーシャルメディアプラットフォームに提供するための
//  ものです。
export const metadata: Metadata = {
  // title: ウェブサイトのタイトルを定義します。default はデフォルトのタイトルを、
  // template はタイトルのテンプレートを定義します。テンプレート内の %s は、
  // 各ページの固有のタイトルに置き換えられます。
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  // description: ウェブサイトの説明を定義します。これは検索エンジンの結果に表示され、
  // ユーザーがサイトの内容を理解するのに役立ちます
  description: siteConfig.description,
  // keywords: ウェブサイトのキーワードを定義します。これは検索エンジンがウェブサイトの内容を
  // 理解するのに役立ちます。
  keywords: ['Next.js', 'React', 'TailwindCSS', 'shadcn/ui'],

  // authors: ウェブサイトの作者の情報を定義します。各作者は name と url を持ちます。
  authors: [
    {
      name: 'tomoya',
      url: siteConfig.url,
    },
  ],
  // metadataBase: メタデータのベースURLを定義します。openGraphを設定する際、
  // metadataBase は必須です。
  metadataBase: new URL(siteConfig.url),
  // openGraph: Open Graph プロトコルを使用して、ウェブサイトの情報を
  // ソーシャルメディアプラットフォームに提供します。
  openGraph: {
    type: 'website',
    locale: 'ja',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  // Twitter カードを定義します。これはツイートにリンクされたウェブサイトの
  // プレビューを生成するためのものです
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: '@tomoya',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={cn('bg-background antialiased min-h-screen', notoSansJP.className)}>{children}</body>
    </html>
  );
}
