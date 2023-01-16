import React, { useRef, useState, useEffect } from "react";
import s from "./contact-form.module.css";
import Notification from "../ui/notification";

type RequestStatus = "pending" | "success" | "error";

const ContactForm = () => {
  const [requestStatus, setRequestStatus] = useState<RequestStatus | null>(
    null
  );
  const emailRef = useRef<null | HTMLInputElement>(null);
  const nameRef = useRef<null | HTMLInputElement>(null);
  const messageRef = useRef<null | HTMLTextAreaElement>(null);

  useEffect(() => {
    const id = setTimeout(() => setRequestStatus(null), 3000);

    return () => clearTimeout(id);
  }, [requestStatus]);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (emailRef.current && nameRef.current && messageRef.current) {
      const body = JSON.stringify({
        email: emailRef.current.value,
        name: nameRef.current.value,
        message: messageRef.current.value,
      });

      setRequestStatus("pending");

      const response = await fetch("/api/contact", {
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setRequestStatus("error");
        throw new Error(data.message || "Something went wrong!");
      }

      emailRef.current.value = "";
      nameRef.current.value = "";
      messageRef.current.value = "";
      setRequestStatus("success");
    }
  };

  let notification;
  if (requestStatus === "pending") {
    notification = {
      status: "pending",
      title: "Sending message...",
      message: "Your message is on its way!",
    };
  } else if (requestStatus === "success") {
    notification = {
      status: "success",
      title: "Success!",
      message: "Message sent successfully!",
    };
  } else if (requestStatus === "error") {
    notification = {
      status: "error",
      title: "Error!",
      message: "Error!",
    };
  }

  return (
    <section className={s.contact}>
      <h1>How can I help you?</h1>
      <form className={s.form} onSubmit={handleSubmit}>
        <div className={s.controls}>
          <div className={s.control}>
            <label htmlFor='email'>Your Email</label>
            <input ref={emailRef} type='email' id='email' required />
          </div>
          <div className={s.control}>
            <label htmlFor='name'>Your Name</label>
            <input ref={nameRef} type='text' id='name' required />
          </div>
        </div>
        <div className={s.control}>
          <label htmlFor='message'>Your message</label>
          <textarea ref={messageRef} id='messsage' rows={5}></textarea>
        </div>

        <div className={s.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification && <Notification notificationObject={notification} />}
    </section>
  );
};

export default ContactForm;
