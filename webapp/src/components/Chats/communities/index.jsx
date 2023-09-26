import React from "react";
import Community from "./community";

const Communities = () => {
  return (
    <div>
      <h1 className="text-blue-800"> Groups </h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Community />
      </div>
    </div>
  );
};

export default Communities;
