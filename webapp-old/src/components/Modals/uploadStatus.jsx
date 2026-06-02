import React from "react";
import { Modal, Typography, Box } from "@mui/material";
import api from "../../API/ChatterAPI";
import { useState } from "react";
import { useEffect } from "react";
import ProgressBar from "../ProgressBar";
import { url } from "../../API/ChatterAPI";

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

const UploadStatusModal = ({ open, handleClose }) => {
  const [image, setImage] = useState();
  const localData = localStorage.getItem("profile");
  const parsedData = JSON.parse(localData);

  const uploadImageHandler = async (e) => {
    const formdata = new FormData();
    formdata.append("image", e.target.files[0]);
    const res = await api.post("/create-status", formdata, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const getStatusById = async (e) => {
    const res = await api.post("/fetch-user-status", {
      userId: parsedData._id,
    });
    setImage(`${url}/${res.data.status[0].image}`);
  };

  useEffect(() => {
    if (open) {
      getStatusById();
      setTimeout(() => {}, 2000);
    }
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
        <ProgressBar handleClose={handleClose} />
        <Box sx={{ marginTop: 3 }}>
          {image && <img src={image} width="100%" />}
          <input type="file" onChange={uploadImageHandler} />
        </Box>
      </Box>
    </Modal>
  );
};

export default UploadStatusModal;
