import React from "react";
import Login from "../../Views/Login";
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import { AccountCircle, LockOpen } from "@mui/icons-material";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { Button } from "@mui/material";
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

const theme = createTheme({
  typography: {
    // fontFamily: ["Poppins-Regular"].join(","),
  },
});

const Chats = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0}>
        <Grid xs={0} md={4} sx={{ border: "2px solid black" }}>
          <Box sx={{ width: "100%" }} id="kappachino">
            <div
              style={{ height: 50, width: "100%", border: "2px solid purple" }}
            ></div>
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
            <UserList />
            <Communities />
          </Box>
        </Grid>

        <Grid
          xs={12}
          md={8}
          sx={{ border: "2px solid black", height: "100vh" }}
        >
          <div
            style={{ height: 50, width: "100%", border: "2px solid red" }}
          ></div>
          <div style={{}}>
            <div
              className="main-chat-box"
              style={{ border: "2px solid black" }}
            >
              Hi
            </div>
            <div>Hi</div>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Chats;
