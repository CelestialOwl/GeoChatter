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
            {/* <ChatMessage message="Long time, no see" time={"00:23"} /> */}
          </div>
        );
      })}
      {/* <ChatUser name="Ali" />
      <ChatMessage message="Hi" time={"00:30"} />
      <ChatMessage message="Great to see you" time={"00:31"} /> */}
    </div>
  );
};

export default ChatBox;
