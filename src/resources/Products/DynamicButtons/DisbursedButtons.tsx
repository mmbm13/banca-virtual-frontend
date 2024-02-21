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

export const DisbursedButtons = () => {
  const [isLoading, setIsLoading] = useState(false);
  const notify = useNotify();
  const { permissions } = usePermissions();
  const record = useRecordContext();
  const redirect = useRedirect();
  const dataProvider = useDataProvider<DataProviderWithCustomMethods>();

  const pay = async () => {
    await dataProvider.httpFetch(`products/${record.id}`, {
      method: "PUT",
      body: JSON.stringify({ status: ProductStatus.PAY }),
    });
    notify("status.pay", { type: "success" });
  };

  const onClick = async (type: "pay") => {
    try {
      setIsLoading(true);
      switch (type) {
        case "pay":
          await pay();
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
      {permissions.includes("PAY:productStatus") && (
        <SecondaryButton disabled={isLoading} onClick={() => onClick("pay")}>
          Marcar como pagado
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
