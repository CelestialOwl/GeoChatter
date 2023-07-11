import React from "react";
import Login from "../../Views/Login";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { AccountCircle, LockOpen } from "@mui/icons-material";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import "./signin.css";
import { Button } from "@mui/material";

const theme = createTheme({
  typography: {
    // fontFamily: ["Poppins-Regular"].join(","),
  },
});

const Signin = () => {
  return (
    <div
      className="p-16"
      style={{
        width: 480,
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        borderRadius: 10,
        right: 0,
        background: "white",
        height: 720,
      }}
    >
      <div className="pb-16 login_title">Login</div>
      <div className="form_title">Username</div>
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <FormControl className="form_generics" variant="standard">
          <Input
            id="email"
            fullWidth
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
          />
        </FormControl>
        <div className="form_title">Password</div>
        <FormControl className="form_generics" variant="standard">
          <Input
            id="password"
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
          />
        </FormControl>
      </Box>
      <div className="text-right pt-0.25 pb-4">Forgot password?</div>
      <Button className="form_button_submit">Login</Button>
      <div className="text-center pt-12 pb-8">
        Don't have an account? Sign up
      </div>
    </div>
  );
};

export default Signin;
