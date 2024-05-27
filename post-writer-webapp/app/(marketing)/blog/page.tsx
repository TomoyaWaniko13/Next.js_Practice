import { allPosts } from 'contentlayer/generated';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';

const BlogPage = () => {
  const posts = allPosts;

  return (
    <div className={'container max-w-4xl py-6 lg:py-10'}>
      <div>
        <div className={'space-y-4'}>
          <h1 className={'font-extrabold text-4xl lg:text-5xl tracking-tight'}>Blog</h1>
          <p className={'text-muted-foreground text-xl'}>contentlayerとMDXで書いています。</p>
        </div>
      </div>
      <hr className='h-1 my-8 bg-gray-300 border-0 dark:bg-gray-700' />
      <div className={'grid sm:grid-cols-2 gap-4'}>
        {posts.map((post) => (
          <article key={post._id} className='relative flex flex-col space-y-2'>
            <Image src={post.image} alt={post.title} width={804} height={452} className='border rounded-md bg-muted' />
            <h2 className='text-2xl font-extrabold'>{post.title}</h2>
            <p className='text-muted-foreground'>{post.description}</p>
            <p className='text-sm text-muted-foreground'>{format(post.date, 'yyyy/MM/dd')}</p>
            <Link href={post.slug} className='absolute inset-0'></Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
