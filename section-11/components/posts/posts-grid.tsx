import { Post } from "@/models/post";
import s from "./posts-grid.module.css";
import PostItem from "./post-item";

interface PostsGridProps {
  posts: Post[];
}

const PostsGrid = ({ posts }: PostsGridProps) => {
  const content = posts.map((post) => <PostItem key={post.slug} post={post} />);

  return <ul className={s.grid}>{content}</ul>;
};

export default PostsGrid;
