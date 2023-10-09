import React, { useState } from "react";
import { Grid, Box } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import BlockIcon from "@mui/icons-material/Block";
import { red, grey } from "@mui/material/colors";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import locationModal from "../../../components/Modals/LocationModal";
import { url } from "../../../API/ChatterAPI";

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
          <div className="dropdown" onClick={() => setDropdown(!dropdown)}>
            <MoreVert />
            {dropdown && (
              <div>
                <div className="dropdown-content" style={{ cursor: "pointer" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: 50,
                    }}
                  >
                    <div>
                      <BlockIcon sx={{ color: red[500] }} />
                      <span style={{ padding: 8, color: red[500] }}>
                        Block User
                      </span>
                    </div>
                    <div onClick={() => console.log("hi there")}>
                      <AddLocationAltIcon sx={{ color: grey[500] }} />

                      <span style={{ marginTop: 35, padding: 8 }}>
                        Location
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
