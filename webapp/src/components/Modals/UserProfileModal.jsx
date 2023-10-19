import React, { useEffect, useRef } from "react";
import { Modal, Typography, Box, TextField, Button } from "@mui/material";
import { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Api from "../../API/ChatterAPI";
import { url } from "../../API/ChatterAPI";
import { UserData } from "../../utils/userData";
import { SaveLocalUpdateData } from "../../hooks/saveUpdateData";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "400px",
  height: "400px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const UserProfileModal = ({ open, handleClose }) => {
  const [userName, setUserName] = useState();
  const [userIcon, setUserIcon] = useState();

  const uploadUserImageHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    formData.append("email", UserData().email);
    try {
      const response = await Api.post("/edit-profile", formData);
      console.log(response, "profile");
      SaveLocalUpdateData();
    } catch (err) {
      console.log(err);
    }
    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        setUserIcon(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const fetchUserProfile = async () => {
    const email = localStorage.getItem("email");
    const formData = { email: email };
    try {
      const response = await Api.post("/fetch-profile", formData);
      setUserIcon(`${url}/${response.data.user.img}`);
      setUserName(response.data.user.username);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h1>Profile</h1>
        <TextField
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          fullWidth
          id="outlined-basic"
          label="Username"
          variant="outlined"
        />
        <input
          id="image-upload"
          style={{
            background: "white",
            color: "black",
            border: "1px solid black",
            padding: 10,
            fontSize: 14,
            borderRadius: 10,
          }}
          type="file"
          onChange={uploadUserImageHandler}
        />
        {userIcon && (
          <img
            height={"30px"}
            width={"30px"}
            style={{
              height: 70,
              width: 70,
              borderRadius: 70,
              objectFit: "fill",
            }}
            src={userIcon}
            alt="user image"
          />
        )}
      </Box>
    </Modal>
  );
};

export default UserProfileModal;
