import React from "react";
import Community from "./community";

const Communities = ({ communities, setActiveRoom }) => {
  return (
    <div>
      <h1 className="text-blue-800"> Communities </h1>
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
