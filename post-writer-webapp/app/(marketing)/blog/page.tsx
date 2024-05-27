import { allPosts } from 'contentlayer/generated';

const BlogPage = () => {
  const posts = allPosts;
  console.log(posts);
  return (
    <div>
      <div>Blog page</div>
    </div>
  );
};

export default BlogPage;
