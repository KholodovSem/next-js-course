import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { Fragment } from "react";
import { Post } from "@/models/post";
import { getFeaturedPosts } from "@/lib/post-ulit";
import Hero from "@/components/home-page/hero";
import FeaturedPosts from "@/components/home-page/featured-post";

const HomePage = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Fragment>
      <Head>
        <meta
          name='description'
          content='I post about programming and web development'
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={posts} />
    </Fragment>
  );
};

export default HomePage;

interface PageProps {
  posts: Post[];
}

export const getStaticProps: GetStaticProps<PageProps> = () => {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
    revalidate: 600,
  };
};
