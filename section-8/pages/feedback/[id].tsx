import fs from "fs/promises";
import path from "path";
import {
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPaths,
  InferGetStaticPropsType,
} from "next";
import { Feedback } from "@/models/Feedback";

const FeedbackDetailsPage = ({
  feedback,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <div>{feedback.feedback}</div>;
};

export default FeedbackDetailsPage;

interface DynamicPath {
  id: string;
  [key: string]: string;
}

export const getStaticPaths: GetStaticPaths<DynamicPath> = async () => {
  const filePath = path.join(process.cwd(), "data", "feedback.json");
  const data = await fs.readFile(filePath, { encoding: "utf-8" });
  const readableData: Feedback[] = JSON.parse(data);

  const paths = readableData.map((feedback) => ({
    params: { id: feedback.id },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

interface PageProps {
  feedback: Feedback;
}

export const getStaticProps: GetStaticProps<PageProps> = async (
  context: GetStaticPropsContext<DynamicPath>
) => {
  const { params } = context;
  const id = params.id;

  const filePath = path.join(process.cwd(), "data", "feedback.json");
  const data = await fs.readFile(filePath, { encoding: "utf-8" });
  const readableData: Feedback[] = JSON.parse(data);
  const feedback = readableData.find((feedback) => feedback.id === id);

  if (!feedback) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      feedback,
    },
    revalidate: 60,
  };
};
