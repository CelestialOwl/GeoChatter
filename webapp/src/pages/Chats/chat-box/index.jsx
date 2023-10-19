import React from "react";
import { Grid, Box } from "@mui/material";
import ChatUser from "./chat-user";
import ChatMessage from "./chat-user/chat-message";
import Empty from "/";
const ChatBox = ({ messages, loading, activeUser }) => {
  if (loading) {
    return null;
  }
  if (messages.length === 0) {
    return (
      <div style={{ height: "100%", position: "relative" }}>
        <div
          style={{
            margin: 0,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: 0.6,
          }}
        >
          <img src="/empty.png" height={"170px"} width={"170px"} />
          <h3 style={{ opacity: 0.4 }}>Nothing Found</h3>
        </div>
      </div>
    );
  }
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
            <ChatUser activeUser={activeUser} name={m.username} />
            <ChatMessage message={m.text} time={m.time} />
          </div>
        );
      })}
    </div>
  );
};

export default ChatBox;
