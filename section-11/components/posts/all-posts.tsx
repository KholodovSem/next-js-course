import { Post } from "@/models/post";
import s from "./all-posts.module.css";
import PostsGrid from "./posts-grid";

interface AllPostsProps {
  posts: Post[];
}

const AllPosts = ({ posts }: AllPostsProps) => {
  return (
    <section className={s.posts}>
      <h1>All Posts</h1>
      <PostsGrid posts={posts} />
    </section>
  );
};

export default AllPosts;
