import React from "react";
import { Modal, Typography, Box } from "@mui/material";
import api from "../../../API/ChatterAPI";
import { useState } from "react";
import { useEffect } from "react";
import ProgressBar from "../../ProgressBar";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  height: "60%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CommunityModal = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>hi</Box>
    </Modal>
  );
};

export default CommunityModal;
