import { Box, IconButton, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { toExternalLink } from "../../common";

export const ViewButton = ({ url }: { url: string }) => {
  if (!url) {
    return <Typography>Pendiente por Cargar</Typography>;
  }
  return (
    <Box>
      <IconButton onClick={() => toExternalLink(url)} color="primary">
        <VisibilityIcon />
      </IconButton>
    </Box>
  );
};
