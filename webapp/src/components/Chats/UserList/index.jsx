import React from "react";
import User from "./user";

const UserList = ({ users }) => {
  return (
    <div style={{ padding: 8 }}>
      <h1 className="text-blue-800"> Messages </h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {users.map((u) => {
          return <User key={u._id} userData={u} />;
        })}
      </div>
    </div>
  );
};

export default UserList;
