import { Box } from "@mui/material";
import LogoImg from "@/static/images/Logo.png";

export const Logo = (props: LogoProps) => (
  <Box padding="10px" marginTop={props.marginTop || "20px"}>
    <img
      src={LogoImg}
      alt="Logo"
      style={{ height: "auto", maxWidth: "100%" }}
    />
  </Box>
);

interface LogoProps {
  marginTop?: string;
}
