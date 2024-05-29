import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { BBSPost } from '@/types/types';
import { buttonVariants } from '@/components/ui/button';

interface Props {
  bbsPost: BBSPost;
}

const decreaseLength = (content: string) => {
  if (content.length > 45) {
    return content.substring(0, 45) + '...';
  }
  return content;
};

const BBSCard = ({ bbsPost }: Props) => {
  const { id, title, content, createdAt, username } = bbsPost;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{username}</CardDescription>
      </CardHeader>
      <CardContent>{decreaseLength(content)}</CardContent>
      <CardFooter className='flex justify-between'>
        <Link href={`/bbs-posts/${id}`} className={buttonVariants({ variant: 'secondary' })}>
          Read More
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BBSCard;
