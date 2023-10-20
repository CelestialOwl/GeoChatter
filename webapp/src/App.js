import "./App.css";
import { io } from "socket.io-client";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/chats");
  }, []);

  useEffect(() => {
    const RootEl = document.getElementById("root-component");
    if (
      RootEl &&
      (window.location.pathname === "/login" ||
        window.location.pathname === "/signup")
    )
      RootEl.style.backgroundImage = "";
  }, [window.location.pathname]);

  return <div className="App">test</div>;
}

export default App;
