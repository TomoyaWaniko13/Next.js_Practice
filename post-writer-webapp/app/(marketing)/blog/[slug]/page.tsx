import { allPosts } from 'contentlayer/generated';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import Mdx from '@/components/mdx-component';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site';

const getPostFromSlug = async (slug: string) => {
  const post = allPosts.find((post) => post.slugIdentifier === slug);
  return post;
};

// https://nextjs.org/docs/app/building-your-application/optimizing/metadata#dynamic-metadata
export const generateMetadata = async ({ params }: { params: { slug: string } }): Promise<Metadata> => {
  // getPostFromSlug 関数を呼び出して、指定された slug を持つブログ記事を取得します。
  const page = await getPostFromSlug(params.slug);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      type: 'article',
      locale: 'ja',
      url: siteConfig.url,
      title: siteConfig.name,
      description: siteConfig.description,
      siteName: siteConfig.name,
    },
    twitter: {
      card: 'summary_large_image',
      title: siteConfig.name,
      description: siteConfig.description,
      images: [`${siteConfig.url}/og.jpg`],
      creator: '@tomoya',
    },
  };
};

const ArticlePage = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  const post = await getPostFromSlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className='container max-w-3xl py-6 lg:py-10'>
      <div>
        {post.date && <time>Published on {format(post.date, 'yyyy/MM/dd')}</time>}
        <h1 className='mt-2 font-extrabold text-4xl lg:text-5xl leading-tight'>{post.title}</h1>
      </div>
      {post.image && (
        <Image src={post.image} alt={post.title} width={720} height={405} className='my-8 border rounded-md bg-muted' />
      )}
      <Mdx code={post.body.code} />
      <hr className='mt-12' />
      <div className='py-6 text-center lg:py-10'>
        <Link href={'/blog'} className={cn(buttonVariants({ variant: 'secondary' }))}>
          全ての記事を見る
        </Link>
      </div>
    </article>
  );
};

export default ArticlePage;
