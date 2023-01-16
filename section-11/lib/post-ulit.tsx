import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface MarkdownPost {
  slug: string;
  content: string;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  isFeatured: boolean;
}

const postDirectory = path.join(process.cwd(), "posts");

export const getPostsFiles = () => {
  return fs.readdirSync(postDirectory);
};

export const getPostData = (postIdentifier: string) => {
  const slug = postIdentifier.replace(/\.md$/, ""); // removes the file extension
  const filePath = path.join(postDirectory, `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const postData = { slug, ...data, content } as MarkdownPost;

  return postData;
};

export const getAllPosts = () => {
  const postFiles = fs.readdirSync(postDirectory, { encoding: "utf-8" });

  return postFiles
    .map((post) => getPostData(post))
    .sort((postA, postB) => (postA.date > postB.date ? -1 : 1));
};

export const getFeaturedPosts = () => {
  const posts = getAllPosts();
  return posts.filter((post) => post.isFeatured);
};
