import React from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { grey } from "@mui/material/colors";
import { url } from "../../../../API/ChatterAPI";

const ChatUser = ({ name }) => {
  let userImg;
  const localData = localStorage.getItem("profile");
  if (localData) {
    const myProfile = JSON.parse(localData);
    userImg = myProfile.img;
  }
  const userName = localStorage.getItem("username");
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        position: "relative",
      }}
    >
      <div style={{ width: 60, height: 40 }}>
        {userImg && name === userName ? (
          <div>
            <img
              src={`${url}/${userImg}`}
              style={{
                objectFit: "cover",
                height: "40px",
                width: "40px",
                borderRadius: "40px",
              }}
            />
          </div>
        ) : (
          <AccountCircle
            sx={{ height: "40px", width: "40px", color: grey[700] }}
          />
        )}
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
          <h5
            style={{}}
            className={
              name === localStorage.getItem("username")
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
