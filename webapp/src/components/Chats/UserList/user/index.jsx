import React from "react";
import { Grid, Box } from "@mui/material";
const User = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        position: "relative",
      }}
    >
      <img src="logo192.png" width={80} height={40} />
      <div style={{ display: "flex", flexDirection: "column", marginLeft: 10 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <h3 style={{ flexGrow: 2 }}>Kevin</h3>
          <span>18:13</span>
        </div>
        <p>Hi there how are you?</p>
      </div>
    </div>
  );
};

export default User;
