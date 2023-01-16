import ReactDOM from "react-dom";

import s from "./notification.module.css";

interface Notification {
  title: string;
  message: string;
  status: string;
}

interface NotificationProps {
  notificationObject: Notification;
}

function Notification({ notificationObject }: NotificationProps) {
  let statusClasses = "";

  if (notificationObject.status === "success") {
    statusClasses = s.success;
  }

  if (notificationObject.status === "error") {
    statusClasses = s.error;
  }

  const cssClasses = `${s.notification} ${statusClasses}`;

  return ReactDOM.createPortal(
    <div className={cssClasses}>
      <h2>{notificationObject.title}</h2>
      <p>{notificationObject.message}</p>
    </div>,
    document.getElementById("notifications")!
  );
}

export default Notification;
