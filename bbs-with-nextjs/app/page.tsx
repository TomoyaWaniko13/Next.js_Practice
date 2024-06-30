import BBSCardList from '@/components/BBSCardList';
import { BBSPost } from '@/types/types';

async function getAllBBSPosts() {
  const response = await fetch('http://localhost:3000/api/bbsPost', { cache: 'no-store' });

  const bbsAllPosts: BBSPost[] = await response.json();
  return bbsAllPosts;
}

export default async function Home() {
  const bbsAllPosts = await getAllBBSPosts();

  return (
    <main>
      <BBSCardList bbsAllPosts={bbsAllPosts} />
    </main>
  );
}
