import moment from "moment";

function formatMessage(username, text, userId) {
  return {
    username,
    text,
    time: moment().format("h:mm a"),
    userId,
  };
}

export default formatMessage;
