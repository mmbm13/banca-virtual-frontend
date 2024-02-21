import { Box, SxProps, Typography } from "@mui/material";
import { ReactNode } from "react";

interface ColumnProps {
  children: ReactNode;
  title?: string;
  sx?: SxProps;
}

export const Column = (props: ColumnProps) => (
  <Box
    sx={{
      padding: "10px",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      alignItems: "center",
      gap: "15px",
      ...props.sx,
    }}
  >
    {props.title && <Typography component="span">{props.title}</Typography>}
    {props.children}
  </Box>
);
