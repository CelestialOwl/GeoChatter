import React, { useEffect, useState, useRef } from "react";
import Login from "../../Views/Login";
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import { AccountCircle, LockOpen, MoreVert } from "@mui/icons-material";
import { Divider, colors, createTheme } from "@mui/material";
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
import UploadStatusModal from "../../components/Modals/uploadStatus";
import { useNavigate } from "react-router-dom";
import SocketServices from "../../utils/SocketServices";
import BasicMenu from "../../components/chats/dropdown";
import CommunityModal from "../../components/Modals/Community/CommunityModal";
import CreateCommunityModal from "../../components/Modals/Community/CreateCommModal";
import CommunityHeader from "./communities/CommunityHeader";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { grey, pink } from "@mui/material/colors";
import { url } from "../../API/ChatterAPI";

const email = localStorage.getItem("email");

const theme = createTheme({
  typography: {
    // fontFamily: ["Poppins-Regular"].join(","),
  },
});

let userImg;
const localData = localStorage.getItem("profile");
if (localData) {
  const myProfile = JSON.parse(localData);
  userImg = myProfile.img;
}

const Chats = () => {
  const socketURL = "http://localhost:3003";
  const navigate = useNavigate();

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(socketURL);
    newSocket.on("connect", (socket) => {
      console.log("socket connected", socket);
    });
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [openChat, setOpenChat] = useState("");
  const [loading, setLoading] = useState(true);
  const [chatId, setRoomId] = useState();
  const [activeUser, setActiveUser] = useState();

  //Community Chat
  const [activeRoom, setActiveRoom] = useState();

  const [messages, SetChatMessages] = useState([]);
  console.log(messages);
  const chatMessageRef = useRef();

  // Modals
  const [statusModal, setStatusModal] = useState(false);
  const [communityModal, setCommunityModal] = useState(false);
  const [createCommunityModal, setCreateCommunity] = useState(false);

  //Modal Functions
  const handleStatusOpen = () => setStatusModal(true);
  const handleStatusClose = () => setStatusModal(false);
  const handleCommunityOpen = () => setCommunityModal(true);
  const handleCommunityClose = () => setCommunityModal(true);
  const handleCreateCommunityOpen = () => setCreateCommunity(true);
  const handleCreateCommunityClose = () => setCreateCommunity(true);

  const FetchUserList = async () => {
    try {
      const respnose = await api.get("/users-list");
      setUsers(respnose.data.userList);
    } catch (err) {
      if (err.response.status === 401) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleActiveChatBox = (type, payload) => {
    if (type === "room") {
      setActiveRoom(payload);
      setActiveUser(null);
    }
  };

  const sendMessageHandler = () => {
    socket.emit("chatMessage", {
      field: chatMessageRef.current.children[0].value,
      chatRoomId: chatId,
      email: email,
    });
    chatMessageRef.current.children[0].value = "";
  };

  const FetchChatHandler = async (id) => {
    const res = await api.post("/create-room", { recipient: { _id: id } });
    if (res.data.message === "chat already exist!") {
      setActiveUser(res.data.user);
      setRoomId(res.data.chatId);
      const chats = await api.post("/fetch-messages", {
        roomId: res.data.chatId,
      });
      SetChatMessages(chats.data);
    }
  };

  const appendCurrentMessage = (msg) => {};

  const fetchCommunities = async () => {
    const response = await api.post("/get-community");
    setRooms(response.data.communities);
  };

  useEffect(() => {
    SocketServices.connect("http://localhost:3003");

    const socket = SocketServices.getSocket();

    if (socket) {
      socket.on("message", (msg) => {
        console.log(messages);
        SetChatMessages([...messages, msg]);
      });
    }

    return () => {
      SocketServices.disconnect();
    };
  }, [socket, messages]);
  useEffect(() => {
    FetchUserList();
    fetchCommunities();
  }, []);

  useEffect(() => {
    SetChatMessages([]);
  }, [activeRoom, activeUser]);
  return (
    <Box sx={{ flexGrow: 1, background: "white" }}>
      <Grid container spacing={0}>
        <Grid
          item
          xs={0}
          md={3}
          sx={{ background: "#e8e9e99e", paddingLeft: 1.5 }}
        >
          <Box sx={{ width: "100%" }} id="kappachino">
            <div
              style={{
                height: 50,
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  width: 50,
                  height: 50,
                  // border: "1px solid black",
                  borderRadius: 100,
                  padding: 0,
                  // paddingBottom: 10,
                }}
              >
                {userImg ? (
                  <div>
                    <img
                      src={`${url}/${userImg}`}
                      style={{
                        objectFit: "cover",
                        height: "50px",
                        width: "50px",
                        borderRadius: "50px",
                      }}
                    />
                  </div>
                ) : (
                  <AccountCircle
                    sx={{ height: "50px", width: "50px", color: grey[700] }}
                  />
                )}
                {/* <img src="logo192.png" width={45} /> */}
              </div>
              <div style={{ marginTop: 5, display: "flex" }}>
                <div
                  onClick={handleStatusOpen}
                  style={{ width: 45, height: 40 }}
                >
                  <CameraAltIcon sx={{ cursor: "pointer" }} />
                </div>
                <div
                  onClick={handleCreateCommunityOpen}
                  style={{ width: 45, height: 40, cursor: "pointer" }}
                >
                  <GroupsIcon />
                </div>
                <div style={{ width: 45, height: 40, cursor: "pointer" }}>
                  <BasicMenu />
                </div>
              </div>
            </div>
            <FormControl
              sx={{ padding: "5px 10px 5px 10px" }}
              variant="standard"
              fullWidth
            >
              <Input
                sx={{
                  height: "40px",
                  background: "white",
                  paddingLeft: 4,
                  borderRadius: "50px",
                  fontSize: 20,
                }}
                id="input-with-icon-adornment"
                endAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
            <UserList users={users} FetchChats={FetchChatHandler} />
            <Communities
              setActiveRoom={handleActiveChatBox}
              communities={rooms}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={9} sx={{ height: "100vh" }}>
          <div style={{ height: 60, width: "100%" }}>
            {" "}
            {activeUser ? (
              <ChatHeader activeUser={activeUser} />
            ) : activeRoom ? (
              <CommunityHeader activeRoom={activeRoom} />
            ) : null}
          </div>
          <Divider sx={{ borderColor: "rgba(0, 0, 0, 0.62)" }} />

          <div style={{}}>
            <div className="main-chat-box" style={{}}>
              <ChatBox messages={messages} />
            </div>
            <Divider sx={{ borderColor: "rgba(0, 0, 0, 0.62)" }} />
            <Box sx={{ width: "100%", display: "flex" }}>
              <div
                style={{
                  height: 40,
                  width: "90%",
                  padding: "2px 5px 0px 5px",
                }}
              >
                <FormControl
                  style={{ padding: 5 }}
                  variant="standard"
                  fullWidth
                >
                  <Input
                    style={{
                      height: 40,
                      background: "#e8e9e99e",
                      padding: 20,
                      borderRadius: 15,
                    }}
                    ref={chatMessageRef}
                    disableUnderline
                    id="input-with-icon-adornment1"
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
                  paddingTop: 12,
                }}
              >
                <SendIcon />
              </div>
            </Box>
          </div>
        </Grid>
      </Grid>
      <UploadStatusModal open={statusModal} handleClose={handleStatusClose} />
      <CommunityModal
        open={communityModal}
        handleClose={handleCommunityClose}
      />
      <CreateCommunityModal
        open={createCommunityModal}
        handleClose={handleCreateCommunityClose}
      />
    </Box>
  );
};

export default Chats;
