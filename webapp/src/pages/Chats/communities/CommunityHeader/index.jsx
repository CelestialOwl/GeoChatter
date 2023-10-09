import React, { useState } from "react";
import { Grid, Box } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import BlockIcon from "@mui/icons-material/Block";
import { red, grey } from "@mui/material/colors";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { url } from "../../../../API/ChatterAPI";
import MemberListDrawser from "../../../../components/drawers/rightCommunityDrawer";
import GroupIcon from "@mui/icons-material/Group";

const CommunityHeader = ({ activeRoom }) => {
  console.log(activeRoom);
  const [dropdown, setDropdown] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "5px 5px 0px 15px",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          flexDirection: "row",
          position: "relative",
        }}
      >
        <div style={{ width: 45, height: 45 }}>
          {activeRoom.img ? (
            <img
              src={`${url}/${activeRoom.img}`}
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
              {activeRoom.name}
            </h5>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 5 }}>
        <div style={{ width: 45, height: 40, cursor: "pointer" }}>hi</div>
      </div>
      <MemberListDrawser users={activeRoom.users} />
    </div>
  );
};

export default CommunityHeader;
