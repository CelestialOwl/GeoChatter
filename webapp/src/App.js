import "./App.css";
import { io } from "socket.io-client";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const socket = io("http://localhost:3003");
  useEffect(() => {
    navigate("/chats");
  }, []);

  useEffect(() => {
    (async () => {
      // USER_EMAIL = await AsyncStorage.getItem("email");
      socket.emit("joinRoom", {
        username: "Hassan",
        room: "Web",
        email: "test",
      });
    })();
    // socket.emit("joinRoom", { username: "Ali", room: "Web" });
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
