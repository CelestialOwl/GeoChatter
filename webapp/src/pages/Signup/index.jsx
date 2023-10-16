import React, { useState } from "react";
import Login from "../../Views/Login";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { AccountCircle, LockOpen } from "@mui/icons-material";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import "./signup.css";
import { Button } from "@mui/material";
import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
import "react-phone-input-2/lib/material.css";
import { useNavigate } from "react-router-dom";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

const theme = createTheme({
  typography: {
    // fontFamily: ["Poppins-Regular"].join(","),
  },
});

const SignUp = () => {
  const [phone, setPhone] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
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
      <div className="pb-16 login_title">Sign Up</div>
      <div className="form_title">Email</div>
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <FormControl className="form_generics" variant="standard">
          <Input
            id="email"
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <AlternateEmailIcon />
              </InputAdornment>
            }
          />
        </FormControl>
        <div className="form_title">Password</div>
        <FormControl className="form_generics" variant="standard">
          <Input
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            startAdornment={
              <InputAdornment position="start">
                <KeyOutlinedIcon />
              </InputAdornment>
            }
          />
        </FormControl>
        <div className="form_title">Username</div>
        <FormControl className="form_generics" variant="standard">
          <Input
            onChange={(e) => setUserName(e.target.value)}
            id="password"
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
          />
        </FormControl>
        {/* <div className="form_title">Phone No</div> */}
        <FormControl className="form_generics" variant="standard">
          {/* <Input
            id="password"
            startAdornment={
              <InputAdornment position="start">
                <PhoneEnabledIcon />
              </InputAdornment>
            }
          > */}
          <PhoneInput
            country={"pk"}
            containerStyle={{}}
            containerClass="kappachino"
            inputStyle={{
              width: "100%",
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
              borderRadius: 0,
              borderBottom: "1px solid black",
            }}
            specialLabel="Phone no"
            value={phone}
            onChange={(phone) => setPhone(phone)}
          />
          {/* </Input> */}
        </FormControl>
      </Box>
      <Button className="form_button_submit">Sign up</Button>
      <div className="text-center pt-12 pb-8">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          style={{ fontWeight: "bold", cursor: "pointer" }}
        >
          Sign in
        </span>
      </div>
    </div>
  );
};

export default SignUp;
