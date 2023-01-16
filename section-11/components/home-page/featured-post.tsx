import { Post } from "@/models/post";
import PostsGrid from "../posts/posts-grid";
import s from "./featured-post.module.css";

interface FeaturedPostsProps {
  posts: Post[];
}

const FeaturedPosts = ({ posts }: FeaturedPostsProps) => {
  return (
    <section className={s.latest}>
      <h2>Featured Posts</h2>
      <PostsGrid posts={posts} />
    </section>
  );
};

export default FeaturedPosts;
