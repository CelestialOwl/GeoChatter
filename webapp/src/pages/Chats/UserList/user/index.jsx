import React from "react";
import { Grid, Box } from "@mui/material";
import { url } from "../../../../API/ChatterAPI";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { grey } from "@mui/material/colors";
const User = ({ userData, FetchChats }) => {
  return (
    <div
      onClick={() => FetchChats(userData._id)}
      style={{
        cursor: "pointer",
        display: "inline-flex",
        flexDirection: "row",
        position: "relative",
      }}
    >
      <div style={{ width: 60, height: 40 }}>
        {userData.img ? (
          <div>
            <img
              src={`${url}/${userData.img}`}
              style={{
                objectFit: "cover",
                height: "45px",
                width: "45px",
                borderRadius: "45px",
              }}
            />
          </div>
        ) : (
          <AccountCircle
            sx={{ height: "50px", width: "50px", color: grey[800] }}
          />
        )}
        {/* <img src="logo192.png" width={60} /> */}
      </div>
      <div
        style={{
          display: "flex",
          flexGrow: 1,
          flexDirection: "column",
          marginLeft: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <h5 style={{ flexGrow: 2 }}>{userData.username}</h5>
          <span style={{ paddingRight: 10 }}>
            {/* {Math.floor(Math.random() * (24 - 1)) + 1}:
            {Math.floor(Math.random() * (60 - 1)) + 1} */}
          </span>
        </div>
        <p style={{ fontSize: "0.8rem" }}></p>
      </div>
    </div>
  );
};

export default User;
