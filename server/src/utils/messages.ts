interface FormattedMessage {
  username: string;
  text: string;
  time: string;
  userId?: string;
}

export default function formatMessage(
  username: string,
  text: string,
  userId?: string
): FormattedMessage {
  return {
    username,
    text,
    time: new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }),
    userId,
  };
}
