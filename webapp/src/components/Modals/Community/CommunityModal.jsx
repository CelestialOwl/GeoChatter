import React, { useState, useEffect } from "react";
import { Modal, Typography, Box, Grid } from "@mui/material";
import api from "../../../API/ChatterAPI";
import CommunityCard from "./CommunityCard/CommunityCard";

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
  const [communities, setCommunities] = useState([]);

  const fetchCommunities = async () => {
    const response = await api.post("/get-community");
    setCommunities(response.data.communities);
  };

  useEffect(() => {
    fetchCommunities();
  }, []);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={{ overflowY: "auto", height: "100%" }}>
          <h4>Communities</h4>
          <Grid container spacing={2}>
            {communities &&
              communities.map((room) => {
                return (
                  <Grid item xs={6}>
                    <CommunityCard community={room} />
                  </Grid>
                );
              })}
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
};

export default CommunityModal;
