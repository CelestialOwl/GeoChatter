import React, { useState } from "react";
import { Grid, Box } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import BlockIcon from "@mui/icons-material/Block";
import { red, grey } from "@mui/material/colors";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import locationModal from "../../Modals/LocationModal";

const ChatHeader = () => {
  const [dropdown, setDropdown] = useState(false);
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
