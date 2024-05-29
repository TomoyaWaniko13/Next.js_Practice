import { BBSPost } from '@/types/types';
import { id } from 'postcss-selector-parser';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

async function getDetailedPost(id: string) {
  const response = await fetch(`http://localhost:3000/api/bbsPost/${id}`, { cache: 'no-store' });

  const detailedPost: BBSPost = await response.json();
  return detailedPost;
}

const DetailedPostPage = async ({ params }: { params: { id: string } }) => {
  const detailedPost = await getDetailedPost(params.id);

  return (
    <div className='max-w-4xl mx-auto p-4'>
      {/* ヘッダーセクション */}
      <div className='mb-8'>
        <h1 className='text-2xl font-bold'>{detailedPost.title}</h1>
        <p className='text-gray-700'>{detailedPost.username}</p>
      </div>

      {/* コンテンツセクション */}
      <div className='mb-8 overflow-auto break-words'>
        <p className='text-gray-900'>{detailedPost.content}</p>
      </div>

      <Link href={'/'} className={buttonVariants({ variant: 'default' })}>
        戻る
      </Link>
    </div>
  );
};

export default DetailedPostPage;
