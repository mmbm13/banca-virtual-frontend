import { Typography } from "@mui/material";

export const SubTitle = ({ value }: { value: string }) => (
  <Typography variant="body2" sx={{ width: "100%" }}>
    {value}
  </Typography>
);
