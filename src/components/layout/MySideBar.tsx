import { Sidebar, useGetIdentity } from "react-admin";
// import backgoundImg from "@/static/images/Administración-comercial-y-de-mercadeo-virtual-scaled.jpg";
import { Box, Divider } from "@mui/material";
import { NavLink } from "react-router-dom";
import { Logo } from "./Logo";
import { palette } from "../../theme/palette";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

const Name = () => {
  const { identity } = useGetIdentity();
  return identity?.fullName;
};

export const MySideBar = (props: any) => (
  <Sidebar
    {...props}
    sx={{
      "&.MuiDrawer-docked": { height: "auto" },
      "& .RaSidebar-paper": { backgroundColor: palette.primary.main },
      "& .RaSidebar-fixed": { position: "relative" },
      "& .MuiDrawer-paper": {
        // backgroundImage: `url(${backgoundImg})`,
        backgroundBlendMode: "multiply",
        backgroundPosition: "88% 40%",
        backgroundSize: "auto 100%",
        backgroundRepeat: "no-repeat",
      },
    }}
  >
    <NavLink to="/">
      <Logo />
    </NavLink>
    <Divider sx={{ borderColor: palette.common.white }} />
    <Box
      sx={{
        padding: "20px 10px",
        color: palette.common.white,
        display: "flex",
        gap: "10px",
        alignItems: "center",
      }}
    >
      <AccountBoxIcon fontSize="large" />
      <Name />
    </Box>
    <Divider sx={{ borderColor: palette.common.white }} />
    <Box marginTop="10px">{props.children}</Box>
  </Sidebar>
);
