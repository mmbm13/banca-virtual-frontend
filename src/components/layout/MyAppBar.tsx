import { Box, Typography } from "@mui/material";
import { AppBar } from "react-admin";
import UserMenu from "./UserMenu";

export const MyAppBar = () => (
  <AppBar
    sx={{
      "& .RaAppBar-menuButton": { display: { sm: "none" } },
      backgroundColor: "white",
      color: "black",
      paddingRight: "20px",
    }}
    toolbar={<></>}
    userMenu={<UserMenu />}
  >
    <Typography variant="h6">Banco el valle</Typography>
    <Box flex="1" />
  </AppBar>
);
