import React from "react";
import { Modal, Typography, Box } from "@mui/material";
import api from "../../../API/ChatterAPI";
import { useState } from "react";
import { useEffect } from "react";
import UserCard from "./UserCard/UserCard";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: "100%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const UserListModal = ({ open, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const [UserList, setUserList] = useState([]);
  const FetchUserList = async () => {
    try {
      const respnose = await api.get("/users-list");
      setUserList(respnose.data.userList);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchUserList();
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={{ overflowY: "auto" }}>
          {UserList &&
            UserList.map((user) => {
              return <UserCard user={user} />;
            })}
        </Box>
      </Box>
    </Modal>
  );
};

export default UserListModal;
