import React from "react";
import { Grid, Box } from "@mui/material";
import ChatUser from "./chat-user";
import ChatMessage from "./chat-user/chat-message";
const ChatBox = () => {
  return (
    <div style={{ marginLeft: 20, marginTop: 10 }}>
      <ChatUser name="Kevin" />
      <ChatMessage message="Hi there, How are you?" time={"00:20"} />
      <ChatMessage message="Long time, no see" time={"00:23"} />
      <ChatUser name="Ali" />
      <ChatMessage message="Hi" time={"00:30"} />
      <ChatMessage message="Great to see you" time={"00:31"} />
    </div>
  );
};

export default ChatBox;
