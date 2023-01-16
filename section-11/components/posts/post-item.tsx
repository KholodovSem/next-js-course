import Link from "next/link";
import Image from "next/image";
import s from "./post-item.module.css";
import { Post } from "@/models/post";

interface PostProps {
  post: Post;
}

const PostItem = ({ post }: PostProps) => {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  return (
    <li className={s.post}>
      <Link href={`/posts/${post.slug}`}>
        <div className={s.image}>
          <Image src={imagePath} alt={post.title} width={300} height={200} />
        </div>
        <div className={s.content}>
          <h3>{post.title}</h3>
          <time>{formattedDate}</time>
          <p>{post.excerpt}</p>
        </div>
      </Link>
    </li>
  );
};

export default PostItem;
