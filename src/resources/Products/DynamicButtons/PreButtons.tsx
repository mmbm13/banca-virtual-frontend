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
import { SecondaryButton } from "./SecondaryButton";
import { DeniedButton } from "./DeniedButton";

export const PreButtons = () => {
  const [isLoading, setIsLoading] = useState(false);
  const notify = useNotify();
  const { permissions } = usePermissions();
  const record = useRecordContext();
  const redirect = useRedirect();
  const dataProvider = useDataProvider<DataProviderWithCustomMethods>();

  const onClick = async () => {
    try {
      setIsLoading(true);
      await dataProvider.httpFetch(`products/pre-approved/${record.id}`, {
        method: "PUT",
      });
      notify("status.preApproved", { type: "success" });

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
      <DeniedButton
        disabled={isLoading}
        productId={record.id}
        setIsLoading={setIsLoading}
      />
      {permissions.includes("PRE_APPROVE:productStatus") && (
        <SecondaryButton disabled={isLoading} onClick={onClick}>
          PreAprobar
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
