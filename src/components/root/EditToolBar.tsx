import { SxProps, Theme } from "@mui/material";
import {
  DeleteButton,
  SaveButton,
  Toolbar,
  useRecordContext,
  useResourceContext,
  useTranslate,
} from "react-admin";

interface EditToolbarProps {
  canDelete?: boolean;
  canSave?: boolean;
  confirmTitle?: string;
  confirmContent?: string;
  sx?: SxProps<Theme>;
}

export const EditToolbar = ({
  canDelete = true,
  canSave = true,
  sx,
  confirmContent,
  confirmTitle,
}: EditToolbarProps) => {
  const resource = useResourceContext();
  const record = useRecordContext();
  const translate = useTranslate();
  const root = `resources.${resource}.name`;

  return (
    <Toolbar sx={{ gap: "10px", ...sx }}>
      {canSave && <SaveButton />}
      {canDelete && (
        <DeleteButton
          size="medium"
          variant="contained"
          confirmTitle={
            confirmTitle ||
            `Borrar ${translate(root)} ${
              record?.name || record?.firstName || "#" + record?.id
            }`
          }
          confirmContent={confirmContent}
        />
      )}
    </Toolbar>
  );
};
