import React, { useEffect } from "react";
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
import ChatterApi from "../../API/ChatterAPI";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const theme = createTheme({
  typography: {
    // fontFamily: ["Poppins-Regular"].join(","),
  },
});

const Signin = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();
  // const notify = (msg) => toast(msg);

  async function submitHandler() {
    try {
      const res = await ChatterApi.post("/signin", { email, password });
      localStorage.setItem("jwt", res.data.token);
      localStorage.setItem("email", email);
      const userProfile = await ChatterApi.post(
        "/fetch-profile",
        { email },
        { headers: { Authorization: `Bearer ${res.data.token}` } }
      );
      localStorage.setItem("username", userProfile.data.user.username);
      localStorage.setItem("profile", JSON.stringify(userProfile.data.user));
      if (userProfile.data.user.super_admin) {
        window.location.href = "/admin";
      } else {
        window.location.href = "/chats";
      }
    } catch (err) {}
  }
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
            value={email}
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
          />
        </FormControl>
      </Box>
      <div className="text-right pt-0.25 pb-4">Forgot password?</div>
      <Button className="form_button_submit" onClick={submitHandler}>
        Login
      </Button>
      <div className="text-center pt-12 pb-8">
        Don't have an account?
        <span
          onClick={() => navigate("/signup")}
          style={{ fontWeight: "bold", cursor: "pointer" }}
        >
          {" "}
          Sign up
        </span>
      </div>
    </div>
  );
};

export default Signin;
