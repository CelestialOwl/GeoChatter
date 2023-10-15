import React from "react";
import User from "./user";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const UserList = ({ users, FetchChats, handleUserListOpen }) => {
  return (
    <div style={{ padding: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3 style={{ color: "#0000ffa6" }}> Messages </h3>
        <div onClick={() => handleUserListOpen()} style={{ cursor: "pointer" }}>
          <AddCircleIcon sx={{ marginTop: "7px", marginRight: "8px" }} />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {users.map((u) => {
          return <User FetchChats={FetchChats} key={u._id} userData={u} />;
        })}
      </div>
    </div>
  );
};

export default UserList;
