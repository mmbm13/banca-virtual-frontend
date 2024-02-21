import Button from "@mui/material/Button";
import MuiDialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { ReactNode } from "react";

interface DialogProps {
  open: boolean;
  title: string;
  handleClose?: () => void;
  handleContinue?: () => void;
  disabled?: boolean;
  hasContinue?: boolean;
  hasCancel?: boolean;
  content: ReactNode;
  labelAction?: string;
}

export function Dialog({
  open,
  handleClose,
  handleContinue,
  hasContinue = true,
  hasCancel = false,
  disabled = false,
  title,
  labelAction,
  content,
}: DialogProps) {
  return (
    <MuiDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>{title}</DialogTitle>
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
      <DialogContent dividers>{content}</DialogContent>
      <DialogActions>
        {hasCancel && (
          <Button
            autoFocus
            disabled={disabled}
            onClick={handleClose}
            variant="contained"
            color="inherit"
          >
            Cancelar
          </Button>
        )}
        {hasContinue && (
          <Button
            autoFocus
            disabled={disabled}
            onClick={handleContinue}
            variant="contained"
            color="secondary"
          >
            {labelAction || "Continuar"}
          </Button>
        )}
      </DialogActions>
    </MuiDialog>
  );
}
