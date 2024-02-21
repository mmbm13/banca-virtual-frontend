import { Typography } from "@mui/material";

export const Title = ({ value }: { value: string }) => (
  <Typography variant="h3" sx={{ width: "100%" }}>
    {value}
  </Typography>
);
