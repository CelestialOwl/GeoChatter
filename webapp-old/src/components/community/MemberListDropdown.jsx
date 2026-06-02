import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MoreVert } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { colors } from "@mui/material";
import api from "../../API/ChatterAPI";

export default function MemberList({ user, activeRoom, toggleDrawer }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const PromoteUser = async () => {
    const formData = {
      CommunityId: activeRoom._id,
      userId: user.userId,
    };
    const response = await api.post("/promote-user", formData);
    if (response) {
      handleClose();
    }
    console.log(response);
  };

  const KickUser = async () => {
    const formData = {
      CommunityId: activeRoom._id,
      userId: user.userId,
    };
    const response = await api.post("/remove-user", formData);
    if (response) {
      handleClose();
    }
    console.log(response);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ padding: 0, minWidth: "30px" }}
      >
        <MoreVert sx={{ color: "black" }} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {user.is_mod ? null : (
          <MenuItem sx={{ color: "#7f5ebc" }} onClick={PromoteUser}>
            Make Admin
          </MenuItem>
        )}
        <MenuItem sx={{ color: "rgb(244, 67, 54)" }} onClick={KickUser}>
          Kick User
        </MenuItem>
      </Menu>
    </div>
  );
}
