import { Fragment } from "react";
import Head from "next/head";
import {
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPaths,
  InferGetStaticPropsType,
} from "next";
import { Post } from "@/models/post";
import { MarkdownPost } from "@/lib/post-ulit";
import { getAllPosts, getPostData, getPostsFiles } from "@/lib/post-ulit";
import PostContent from "@/components/posts/post-detail/post-content";

const PostDetailPage = ({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Fragment>
      <Head>
        <meta name='description' content={post.excerpt} />
      </Head>
      <PostContent post={post} />
    </Fragment>
  );
};

export default PostDetailPage;

interface DynamicPath {
  slug: string;
  [key: string]: string;
}

export const getStaticPaths: GetStaticPaths<DynamicPath> = async () => {
  const postFilenames = getPostsFiles();
  const slugs = postFilenames.map((fileName) => fileName.replace(/\.md$/, ""));

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
  };
};

interface PageProps {
  post: MarkdownPost;
}

export const getStaticProps: GetStaticProps<PageProps> = async (
  context: GetStaticPropsContext<DynamicPath>
) => {
  const { params } = context;
  const slug = params.slug;

  const post = getPostData(slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 600,
  };
};
