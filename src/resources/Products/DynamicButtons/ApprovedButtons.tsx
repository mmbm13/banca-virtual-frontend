import { CircularProgress } from "@mui/material";
import { DataProviderWithCustomMethods } from "../../../providers/dataProvider";
import { useState } from "react";
import {
  useDataProvider,
  useNotify,
  usePermissions,
  useRecordContext,
  useRedirect,
} from "react-admin";
import { ProductStatus } from "../../../common/enums";
import { SecondaryButton } from "./SecondaryButton";

export const ApprovedButtons = () => {
  const [isLoading, setIsLoading] = useState(false);
  const notify = useNotify();
  const { permissions } = usePermissions();
  const record = useRecordContext();
  const redirect = useRedirect();
  const dataProvider = useDataProvider<DataProviderWithCustomMethods>();

  const disbursement = async () => {
    await dataProvider.httpFetch(`products/${record.id}`, {
      method: "PUT",
      body: JSON.stringify({ status: ProductStatus.DISBURSED }),
    });
    notify("status.disbursement", { type: "success" });
  };

  const onClick = async (type: "disbursement") => {
    try {
      setIsLoading(true);
      switch (type) {
        case "disbursement":
          await disbursement();
          break;
        default:
          break;
      }

      redirect("/products");
    } catch (error: any) {
      notify(error.message, {
        type: "error",
        messageArgs: { _: error.message },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {permissions.includes("DISBURSING:productStatus") && (
        <SecondaryButton
          disabled={isLoading}
          onClick={() => onClick("disbursement")}
        >
          Desembolsar
        </SecondaryButton>
      )}
      {isLoading && (
        <CircularProgress
          sx={{ position: "absolute", top: "0%", right: "10%" }}
        />
      )}
    </>
  );
};
