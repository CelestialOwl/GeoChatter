import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Views/Login";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Signin from "./components/Signin/index";
import Forgot from "./components/Forgot";
import Chats from "./components/Chats";
import { Container } from "@mui/material";
import { CssBaseline } from "@mui/material";
import SignUp from "./components/Signup";
import Maps from "./components/maps";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/reset-password",
    element: <Forgot />,
  },
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/chats",
    element: <Chats />,
  },
  {
    path: "/maps",
    element: <Maps />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CssBaseline />
    {/* <Container maxWidth="xl"> */}
    <div
      id="root-component"
      className="container-login100"
      style={
        window.location.pathname === "/login" ||
        window.location.pathname === "/signup"
          ? { backgroundImage: "url(bg-01.jpg)" }
          : {}
      }
    >
      <RouterProvider router={router} />
    </div>
    {/* </Container> */}
    {/* <App /> */}
  </React.StrictMode>
);
