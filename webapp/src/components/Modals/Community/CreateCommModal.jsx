import React, { useRef } from "react";
import { Modal, Typography, Box, TextField, Button } from "@mui/material";
import api from "../../../API/ChatterAPI";
import { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

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

const CreateCommunityModal = ({ open, handleClose }) => {
  const [publicCommunity, setPublic] = useState(true);
  const [type, setType] = React.useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleChange = (event) => {
    setType(event.target.value);
    setPublic(event.target.value === 1 ? true : false);
  };

  const handleFormSubmit = async () => {
    const formData = {
      name: name,
      description: description,
      type: publicCommunity ? false : true,
    };
    const response = await api.post("/create-community", formData);
    if (response.status) {
      handleClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {`Create a ${
          publicCommunity === true ? "public" : "private"
        } community`}
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "97%" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            id="outlined-basic"
            label="Name"
            variant="outlined"
          />
          <TextField
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            id="outlined-basic"
            label="Description"
            variant="outlined"
          />
        </Box>
        <Box sx={{ marginLeft: "7px" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              label="Type"
              onChange={handleChange}
            >
              <MenuItem value={1}>Public</MenuItem>
              <MenuItem value={2}>Private invite only</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <Button
            sx={{
              background: "#2d2dece0",
              color: "white",
              width: "97%",
              margin: 1,
            }}
            onClick={() => handleFormSubmit()}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateCommunityModal;
