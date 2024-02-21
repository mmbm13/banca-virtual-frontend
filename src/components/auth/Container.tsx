import { Box } from "@mui/material";
// import backgoundImg from "@/static/images/Administración-comercial-y-de-mercadeo-virtual-scaled.jpg";
import { Logo } from "../layout/Logo";
import { palette } from "@/theme/palette";
import { ReactNode } from "react";

export const Container = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
      alignContent="center"
      minHeight="100vh"
      sx={{
        backgroundColor: palette.primary.main,
        // backgroundImage: `url(${backgoundImg})`,
        backgroundBlendMode: "multiply",
        backgroundPosition: "88% 40%",
        backgroundSize: "auto 100%",
        backgroundRepeat: "no-repeat",
        overflow: "auto",
        padding: "80px 20px",
      }}
    >
      <Box
        sx={{
          backgroundColor: palette.common.white,
          padding: "50px 30px 30px",
          minWidth: "400px",
          maxWidth: { sm: "600px" },
          borderRadius: "15px",
          position: "relative",
        }}
      >
        <>
          <Box
            sx={{
              width: "200px",
              position: "absolute",
              left: 0,
              right: 0,
              margin: "0 auto",
              top: -85,
            }}
          >
            <Logo marginTop="0px" />
          </Box>
          {children}
        </>
      </Box>
    </Box>
  );
};
