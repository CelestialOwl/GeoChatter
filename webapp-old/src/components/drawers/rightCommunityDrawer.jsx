import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { MoreVert } from "@mui/icons-material";
import { url } from "../../API/ChatterAPI";
import BasicMenu from "../chats/dropdown";
import MemberList from "../community/MemberListDropdown";

export default function MemberListDrawser({ users, activeRoom }) {
  const [state, setState] = React.useState(true);
  const [is_mod, setIsMod] = React.useState(false);
  const localData = localStorage.getItem("profile");
  const parsedData = JSON.parse(localData);

  const toggleDrawer = () => (event) => {
    setState(!state);
  };
  const setMod = () => {
    const loggedinUser = users.find(
      (e) => e.details._id.toString() === parsedData._id.toString()
    );
    setIsMod(loggedinUser?.is_mod);
  };

  React.useEffect(() => {
    setMod();
  }, []);

  const list = () => (
    <Box sx={{ width: 350 }} role="presentation">
      <List>
        {users.map((user, index) => {
          console.log(user);
          return (
            <ListItem key={user._id} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <img
                    style={{
                      height: "40px",
                      width: "40px",
                      borderRadius: "40px",
                    }}
                    src={`${url}/${user.details.img}`}
                  />
                </ListItemIcon>
                <ListItemText primary={user.details.username} />
                <ListItemText
                  sx={{ color: "grey", fontSize: "12px" }}
                  primary={user.is_mod === true ? "Admin" : ""}
                />
              </ListItemButton>
              {is_mod ? (
                parsedData._id.toString() !== user.details._id.toString() ? (
                  <MemberList
                    user={user}
                    activeRoom={activeRoom}
                    toggleDrawer={toggleDrawer}
                  />
                ) : null
              ) : null}
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <Button onClick={toggleDrawer()}>
          <MoreVert />
        </Button>
        <Drawer
          sx={{ padding: 2 }}
          anchor={"right"}
          open={state}
          onClose={toggleDrawer()}
        >
          <h1 style={{ padding: 15 }}>Memebers</h1>
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
