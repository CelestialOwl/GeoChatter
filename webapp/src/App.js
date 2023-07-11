import "./App.css";
import { io } from "socket.io-client";
import React, { useEffect } from "react";

function App() {
  const socket = io("http://localhost:3002");
  useEffect(() => {
    socket.emit("joinRoom", { username: "Ali", room: "Web" });
    socket.on("connect", () => {
      console.log("connected");
    });
    // socket.io.on("error", (err) => {
    //   console.log(err);
    // });
    socket.on("roomUsers", ({ room, users }) => {
      console.log(users, room);
    });
    socket.on("message", (msg) => {
      console.log(msg);
    });
    return () => {
      console.log("unmounting");
    };
  }, [socket]);

  return <div className="App">test</div>;
}

export default App;
