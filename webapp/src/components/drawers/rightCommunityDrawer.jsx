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

export default function MemberListDrawser({ users }) {
  console.log(users);
  const [state, setState] = React.useState(true);

  const toggleDrawer = () => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(!state);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer()}
      onKeyDown={toggleDrawer()}
    >
      <List>
        {users.map((user, index) => {
          console.log(user);
          return (
            <ListItem key={user._id} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={user.is_mod === true ? "Admin" : ""} />
              </ListItemButton>
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
        <Drawer anchor={"right"} open={state} onClose={toggleDrawer()}>
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
