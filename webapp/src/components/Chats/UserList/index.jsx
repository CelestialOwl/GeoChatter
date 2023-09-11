import React from "react";
import User from "./user";

const UserList = () => {
  return (
    <div style={{ padding: 8 }}>
      <h1 className="text-blue-800"> Messages </h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <User />
        <User />
        <User />
        <User />
      </div>
    </div>
  );
};

export default UserList;
