import React from "react";
import { Grid, Box } from "@mui/material";
const Community = ({ room }) => {
  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "row",
        position: "relative",
      }}
    >
      <div style={{ width: 60, height: 40 }}>
        <img src="logo192.png" width={60} />
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
          <h5 style={{ flexGrow: 2 }}>{room.name}</h5>
          <span style={{ paddingRight: 10 }}>18:13</span>
        </div>
        <p style={{ fontSize: "0.8rem" }}>Greate game</p>
      </div>
    </div>
  );
};

export default Community;
