import React from "react";

const ChatMessage = ({ message, time }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        position: "relative",
      }}
    >
      <div
        style={{ width: 40, height: 40, marginTop: 5 }}
        className="chat-message-time"
      >
        {time}
      </div>
      <div
        style={{
          display: "flex",
          flexGrow: 1,
          flexDirection: "column",
          marginLeft: 20,
          marginTop: 5,
        }}
      >
        <div style={{}}>
          <h5 style={{}} className="chat-message">
            {message}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
