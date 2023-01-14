import React, { useRef, useState } from "react";
import { Body } from "../models/Body";
import { Feedback } from "@/models/Feedback";

export default function Home() {
  const [feedbacks, setFeedbacks] = useState<Feedback[] | null>(null);
  const emailInput = useRef<null | HTMLInputElement>(null);
  const feedbackInput = useRef<null | HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!emailInput || !emailInput.current) {
      return;
    }

    if (!feedbackInput || !feedbackInput.current) {
      return;
    }

    const body: Body = {
      email: emailInput.current.value,
      feedback: feedbackInput.current.value,
    };

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
      },
    });
  };

  const handleFetchFeedbacks = async () => {
    const data = await fetch("/api/feedback");
    const feedbacks: Feedback[] = await data.json();
    setFeedbacks(feedbacks);
  };

  let content;
  if (feedbacks) {
    content = feedbacks.map((feedback) => (
      <div key={feedback.email}>
        <p>{feedback.email}</p>
        <p>{feedback.feedback}</p>
      </div>
    ));
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Your Email Address</label>
          <input type='email' id='email' ref={emailInput} />
        </div>
        <div>
          <label htmlFor='feedback'>Your Feedback</label>
          <textarea id='feedback' rows={5} ref={feedbackInput} />
        </div>
        <button>Send Feedback</button>
      </form>
      <hr />
      <button onClick={handleFetchFeedbacks}>Fetch Feedbacks</button>
      {content}
    </div>
  );
}
