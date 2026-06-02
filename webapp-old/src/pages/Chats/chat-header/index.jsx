import React, { useState } from "react";
import { Grid, Box } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import BlockIcon from "@mui/icons-material/Block";
import { red, grey } from "@mui/material/colors";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import locationModal from "../../../components/Modals/LocationModal";
import { url } from "../../../API/ChatterAPI";
import ChatHeaderDropDown from "../../../components/chats/ChatHeaderDropdown";

const ChatHeader = ({ activeUser }) => {
  console.log(activeUser);
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
          <img
            src={`${url}/${activeUser.img}`}
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
              borderRadius: "45px",
            }}
          />
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
              {activeUser.username}
            </h5>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 5 }}>
        <div style={{ width: 45, height: 40, cursor: "pointer" }}>
          <ChatHeaderDropDown />
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
