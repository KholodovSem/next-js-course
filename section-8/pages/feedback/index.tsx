import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Feedback } from "@/models/Feedback";

const FeedbackPage = ({
  feedbacks,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  let content;
  if (feedbacks) {
    content = feedbacks.map((feedback) => (
      <div key={feedback.email}>{feedback.feedback}</div>
    ));
  }

  return (
    <div>
      <h1>The Feedback Page</h1>
      {content}
    </div>
  );
};

export default FeedbackPage;

interface PageProps {
  feedbacks: Feedback[];
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const data = await fetch("http://localhost:3000/api/feedback");
  const feedbacks: Feedback[] = await data.json();

  return {
    props: {
      feedbacks,
    },
    revalidate: 60,
  };
};
