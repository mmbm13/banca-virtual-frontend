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
import { DeniedButton } from "./DeniedButton";

export const PreApprovedButtons = () => {
  const [isLoading, setIsLoading] = useState(false);
  const notify = useNotify();
  const { permissions } = usePermissions();
  const record = useRecordContext();
  const redirect = useRedirect();
  const dataProvider = useDataProvider<DataProviderWithCustomMethods>();

  const onClick = async () => {
    try {
      setIsLoading(true);
      await dataProvider.httpFetch(`products/${record.id}`, {
        method: "PUT",
        body: JSON.stringify({ status: ProductStatus.IN_STUDY }),
      });
      notify("status.revert", { type: "success" });

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
      {permissions.includes("REVERT:productStatus") && (
        <SecondaryButton disabled={isLoading} onClick={onClick}>
          Revertir PreAprobación
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
