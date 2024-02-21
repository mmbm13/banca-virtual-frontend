import { useState, MouseEvent as ReactMouseEvent, forwardRef } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { Box, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { Logout } from "react-admin";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

const ProfileItem = forwardRef((props: any, ref) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/profile");
    props.onClose();
  };

  return (
    <MenuItem onClick={onClick} ref={ref} {...props}>
      <ListItemIcon>
        <AccountCircleIcon />
      </ListItemIcon>
      <ListItemText>Mi perfil</ListItemText>
    </MenuItem>
  );
});

ProfileItem.displayName = "ProfileItem";

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: ReactMouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        startIcon={<SettingsIcon />}
        color="inherit"
      >
        Configuración
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
         <ProfileItem onClose={handleClose} />
        <Logout />
      </Menu>
    </Box>
  );
}
