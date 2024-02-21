import { Button, ButtonProps } from "@mui/material";

export const SecondaryButton = ({ children, ...rest }: ButtonProps) => (
  <Button color="secondary" variant="contained" {...rest}>
    {children}
  </Button>
);
