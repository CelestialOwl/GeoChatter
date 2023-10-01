import React from "react";

const ChatUser = ({ name }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        position: "relative",
      }}
    >
      <div style={{ width: 40, height: 40 }}>
        <img src="logo192.png" width={40} />
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
          <h5
            style={{}}
            className={
              name === localStorage.getItem("email")
                ? "chat-user-primary"
                : "chat-user-secondary"
            }
          >
            {name}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default ChatUser;
