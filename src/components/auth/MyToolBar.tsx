import { Button } from "@mui/material";
import { Toolbar } from "react-admin";

export const MyToolBar = ({ text }: { text?: string }) => {
  return (
    <Toolbar
      sx={{
        backgroundColor: "white",
        textAlign: "center",
        justifyContent: "center !important",
      }}
    >
      <Button type="submit" color="secondary" variant="contained">
        {text ?? "Ingresa"}
      </Button>
    </Toolbar>
  );
};
