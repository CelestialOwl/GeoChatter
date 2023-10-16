import React from "react";
import Community from "./community";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const Communities = ({
  communities,
  setActiveRoom,
  handleCreateCommunityOpen,
}) => {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3 style={{ color: "#0000ffa6" }}> Communities </h3>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            handleCreateCommunityOpen();
          }}
        >
          <AddCircleIcon sx={{ marginTop: "7px", marginRight: "8px" }} />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {communities.map((community) => {
          return (
            <Community
              key={community._id}
              setActiveRoom={setActiveRoom}
              room={community}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Communities;
