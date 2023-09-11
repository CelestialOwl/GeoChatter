import React from "react";
import { Grid, Box } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
const ChatHeader = () => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div
        style={{
          display: "inline-flex",
          flexDirection: "row",
          position: "relative",
        }}
      >
        <div style={{ width: 45, height: 40 }}>
          <img src="logo192.png" width={45} />
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
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <h5
              style={{
                marginTop: 5,
              }}
            >
              Kevin
            </h5>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 5 }}>
        <div style={{ width: 45, height: 40 }}>
          <MoreVert />
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
