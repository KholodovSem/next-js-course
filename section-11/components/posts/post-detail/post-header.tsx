import Image from "next/image";
import s from "./post-header.module.css";

interface PostHeaderProps {
  title: string;
  image: string;
}

const PostHeader = ({ title, image }: PostHeaderProps) => {
  return (
    <header className={s.header}>
      <h1>{title}</h1>
      <Image src={image} alt={title} width={200} height={150} />
    </header>
  );
};

export default PostHeader;
