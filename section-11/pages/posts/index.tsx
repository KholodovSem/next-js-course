import { Fragment } from "react";
import Head from "next/head";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Post } from "@/models/post";
import { getAllPosts } from "@/lib/post-ulit";
import AllPosts from "@/components/posts/all-posts";

const AllPostsPage = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Fragment>
      <Head>
        <meta
          name='description'
          content='A list of all programming-related tutorials and posts!'
        />
      </Head>
      <AllPosts posts={posts} />
    </Fragment>
  );
};

export default AllPostsPage;

interface PageProps {
  posts: Post[];
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const posts = getAllPosts();

  return {
    props: {
      posts,
    },
    revalidate: 600,
  };
};
