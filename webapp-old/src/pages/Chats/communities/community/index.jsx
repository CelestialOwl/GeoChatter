import React from "react";
import { Grid, Box } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import { grey } from "@mui/material/colors";
import { url } from "../../../../API/ChatterAPI";

const Community = ({ room, setActiveRoom }) => {
  return (
    <div
      onClick={() => setActiveRoom("room", room)}
      style={{
        cursor: "pointer",
        display: "inline-flex",
        flexDirection: "row",
        position: "relative",
      }}
    >
      <div style={{ width: 60, height: 40 }}>
        {room.img ? (
          <img
            src={`${url}/${room.img}`}
            style={{
              height: "100%",
              width: "100%",
              borderRadius: "45px",
            }}
          />
        ) : (
          <GroupIcon
            style={{ height: "45px", width: "45px", color: grey[800] }}
          />
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexGrow: 1,
          flexDirection: "column",
          marginLeft: 10,
          maxWidth: "100%",
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
        </div>
        <div style={{ position: "relative", width: "100%" }}>
          <p
            style={{
              width: "230px",
              fontSize: "0.8rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {room.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Community;
