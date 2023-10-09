import React from "react";
import { Grid, Box } from "@mui/material";
import ChatUser from "./chat-user";
import ChatMessage from "./chat-user/chat-message";
const ChatBox = ({ messages }) => {
  return (
    <div
      style={{
        marginLeft: 20,
        marginTop: 10,
        overflowY: "auto",
        height: "100%",
      }}
    >
      {messages.map((m, i) => {
        return (
          <div key={i}>
            <ChatUser name={m.username} />
            <ChatMessage message={m.text} time={m.time} />
          </div>
        );
      })}
    </div>
  );
};

export default ChatBox;
