import { useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import { useRedirect } from "react-admin";

export const ModalForgotPassword = () => {
  const [showForgotPass, setShowForgotPass] = useState(false);
  const redirect = useRedirect();

  const handleClose = () => {
    setShowForgotPass(false);
  };

  const handleOpen = () => {
    setShowForgotPass(true);
  };
  return (
    <>
      <Box textAlign="center">
        <Button sx={{ margin: "auto" }} onClick={() => redirect("/register")}>
          Crear usuario
        </Button>
        <Box flex={1} />
        <Button sx={{ margin: "auto" }} onClick={handleOpen}>
          ¿Olvidaste tu contraseña?
        </Button>
      </Box>
      <Dialog open={showForgotPass} onClose={handleClose} maxWidth="sm">
        <DialogTitle display="flex" gap="10px" alignItems="center">
          <LockIcon fontSize="large" />
          Restablecer contraseña
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            Por favor comuniquese al correo{" "}
            <Link href="mailto:test@test.com">test@test.com</Link> para
            restablecer su contraseña
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleClose}
            color="secondary"
            variant="contained"
          >
            Atrás
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
