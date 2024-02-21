import { palette } from "@/theme/palette";
import { TransactiontStatus } from "../common/enums";
import { ChipFieldProps, useRecordContext, useTranslate } from "react-admin";
import { Chip } from "@mui/material";

const styleStatus: any = {
  [TransactiontStatus.COMPLETED]: "#028534",
  [TransactiontStatus.PENDING]: "#2fb3d4",
};

export const ColoredChipField = (props: ChipFieldProps) => {
  const record = useRecordContext();
  const translate = useTranslate();
  const sourceValue = record[props.source || "status"] as string;
  return (
    <Chip
      sx={{
        backgroundColor: styleStatus[sourceValue] || "#E2E2E2",
        color: palette.common.white,
        padding: "5px 0",
        height: "auto",
        "& .MuiChip-label": {
          display: "block",
          whiteSpace: "normal",
        },
      }}
      label={translate(sourceValue)}
    />
  );
};
