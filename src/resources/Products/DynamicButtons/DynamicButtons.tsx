import { Box } from "@mui/material";
import { useRecordContext } from "react-admin";
import { ProductStatus } from "../../../common/enums";
import { PreButtons } from "./PreButtons";
import { PreSignedButtons } from "./PreSignedButtons";
import { PreApprovedButtons } from "./PreApprovedButtons";
import { ApprovedButtons } from "./ApprovedButtons";
import { DisbursedButtons } from "./DisbursedButtons";

export const DynamicButtons = () => {
  const record = useRecordContext();
  return (
    <Box
      gap="10px"
      display="flex"
      flexWrap="nowrap"
      justifyContent="flex-end"
      marginRight="15px"
      position="relative"
    >
      {switchButtons(record.status)}
    </Box>
  );
};

const switchButtons = (key: string) => {
  switch (key) {
    case ProductStatus.IN_STUDY:
      return <PreButtons />;
    case ProductStatus.PRE_APPROVED:
      return <PreApprovedButtons />;
    case ProductStatus.COMPLETE_DOCUMENTS:
      return <PreSignedButtons />;
    case ProductStatus.APPROVED:
      return <ApprovedButtons />;
    case ProductStatus.DISBURSED:
      return <DisbursedButtons />;
    default:
      null;
      break;
  }
};
