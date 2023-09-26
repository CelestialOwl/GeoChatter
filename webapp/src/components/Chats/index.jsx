import React, { useEffect, useState } from "react";
import Login from "../../Views/Login";
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import { AccountCircle, LockOpen, MoreVert } from "@mui/icons-material";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { Button } from "@mui/material";
import { io } from "socket.io-client";
import {
  Box,
  Grid,
  FormControl,
  InputLabel,
  InputAdornment,
} from "@mui/material";
import "./another-stylesheet.css";
import SearchIcon from "@mui/icons-material/Search";
import UserList from "./UserList";
import Communities from "./communities";
import ChatHeader from "./chat-header";
import SendIcon from "@mui/icons-material/Send";
import ChatBox from "./chat-box";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import GroupsIcon from "@mui/icons-material/Groups";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import api from "../../API/ChatterAPI";
import UploadStatusModal from "../Modals/uploadStatus";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  typography: {
    // fontFamily: ["Poppins-Regular"].join(","),
  },
});

const Chats = () => {
  const socket = io("http://localhost:3003");
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [openChat, setOpenChat] = useState("");
  const [loading, setLoading] = useState(true);
  const [statusModal, setStatusModal] = useState(false);
  const [chatMessage, setChatMessage] = useState("");

  const handleStatusOpen = () => setStatusModal(true);
  const handleStatusClose = () => setStatusModal(false);

  const FetchUserList = async () => {
    try {
      const respnose = await api.get("/users-list");
      console.log(respnose.data.status);
      setUsers(respnose.data.userList);
    } catch (err) {
      if (err.response.status === 401) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const sendMessageHandler = () => {
    console.log(chatMessage);
    socket.emit("chatMessage", {
      field: chatMessage,
      chatRoomId: "6469c3d8326e9abda5cb0c67",
      email: "Test",
    });
    // socket.emit(chatMessage);
  };

  useEffect(() => {
    FetchUserList();
  }, []);
  return (
    <Box sx={{ flexGrow: 1, background: "white" }}>
      <Grid container spacing={0}>
        <Grid item xs={0} md={3} sx={{ border: "0px solid black" }}>
          <Box sx={{ width: "100%" }} id="kappachino">
            <div
              style={{
                height: 50,
                width: "100%",
                border: "1px solid purple",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  width: 45,
                  height: 45,
                  border: "1px solid black",
                  borderRadius: 50,
                  padding: 3,
                  // paddingBottom: 10,
                }}
              >
                <img src="logo192.png" width={45} />
              </div>
              <div style={{ marginTop: 5, display: "flex" }}>
                <div
                  onClick={handleStatusOpen}
                  style={{ width: 45, height: 40 }}
                >
                  <CameraAltIcon sx={{ cursor: "pointer" }} />
                </div>
                <div style={{ width: 45, height: 40 }}>
                  <GroupsIcon />
                </div>
                <div style={{ width: 45, height: 40 }}>
                  <MoreVert />
                </div>
              </div>
            </div>
            <FormControl variant="standard" fullWidth>
              <Input
                id="input-with-icon-adornment"
                endAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
            <UserList users={users} />
            <Communities />
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={9}
          sx={{ border: "2px solid black", height: "100vh" }}
        >
          <div style={{ height: 50, width: "100%" }}>
            {" "}
            <ChatHeader />
          </div>
          <div style={{}}>
            <div
              className="main-chat-box"
              style={{ border: "2px solid black" }}
            >
              <ChatBox />
            </div>
            <Box sx={{ width: "100%", display: "flex" }}>
              <div
                style={{
                  height: 50,
                  width: "90%",
                }}
              >
                <FormControl variant="standard" fullWidth>
                  <Input
                    style={{ height: 50 }}
                    onChange={(e) => setChatMessage(e.target.value)}
                    value={chatMessage}
                    disableUnderline
                    id="input-with-icon-adornment"
                    sx={{ fontSize: "19px", paddingLeft: 2 }}
                  />
                </FormControl>
              </div>
              <div
                onClick={() => sendMessageHandler()}
                style={{
                  width: 50,
                  height: 50,
                  cursor: "pointer",
                  paddingTop: 5,
                }}
              >
                <SendIcon />
              </div>
            </Box>
          </div>
        </Grid>
      </Grid>
      <UploadStatusModal open={statusModal} handleClose={handleStatusClose} />
    </Box>
  );
};

export default Chats;
