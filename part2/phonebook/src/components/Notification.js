const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  if (message.includes("removed")) {
    return <div className="bad-notification">{message}</div>;
  } else return <div className="good-notification">{message}</div>;
};
export default Notification;
