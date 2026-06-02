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
        style={{
          width: 60,
          height: 40,
          marginTop: 5,
          fontSize: 12,
          color: "#454545c9",
        }}
        className="chat-message-time"
      >
        {time}
      </div>
      <div
        style={{
          display: "flex",
          flexGrow: 1,
          flexDirection: "column",
          marginLeft: 10,
          marginTop: 5,
        }}
      >
        <div style={{}}>
          <h5 style={{ fontSize: 16 }} className="chat-message">
            {message}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
