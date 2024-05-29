import BBSCard from '@/components/BBSCard';
import { BBSPost } from '@/types/types';

interface Props {
  bbsAllPosts: BBSPost[];
}

const BBSCardList = ({ bbsAllPosts }: Props) => {
  return (
    <div className={'grid lg:grid-cols-2 px-4 py-3 gap-4'}>
      {bbsAllPosts.map((bbsPost) => (
        <BBSCard key={bbsPost.id} bbsPost={bbsPost} />
      ))}
    </div>
  );
};

export default BBSCardList;
