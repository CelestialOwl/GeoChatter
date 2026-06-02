import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MoreVert } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { colors } from "@mui/material";
import { red } from "@mui/material/colors";
import BlockIcon from "@mui/icons-material/Block";

export default function ChatHeaderDropDown({}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
        <MenuItem onClick={handleClose} sx={{ color: red[500], padding: 2 }}>
          <BlockIcon sx={{ color: red[500] }} />
          Block User
        </MenuItem>
      </Menu>
    </div>
  );
}
