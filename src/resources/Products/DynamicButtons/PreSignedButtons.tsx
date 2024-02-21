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
import { IncompleteDocsButton } from "./IncompleteDocsButton";

export const PreSignedButtons = () => {
  const [isLoading, setIsLoading] = useState(false);
  const notify = useNotify();
  const record = useRecordContext();
  const redirect = useRedirect();
  const { permissions } = usePermissions();
  const dataProvider = useDataProvider<DataProviderWithCustomMethods>();

  const approve = async () => {
    await dataProvider.httpFetch(`products/${record.id}`, {
      method: "PUT",
      body: JSON.stringify({ status: ProductStatus.APPROVED }),
    });
    notify("status.approve", { type: "success" });
  };

  const revert = async () => {
    await dataProvider.httpFetch(`products/${record.id}`, {
      method: "PUT",
      body: JSON.stringify({ status: ProductStatus.IN_STUDY }),
    });
    notify("status.revert", { type: "success" });
  };

  const onClick = async (type: "approve" | "revert") => {
    try {
      setIsLoading(true);
      switch (type) {
        case "approve":
          await approve();
          break;
        case "revert":
          await revert();
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
      {permissions.includes("REVERT:productStatus") && (
        <SecondaryButton disabled={isLoading} onClick={() => onClick("revert")}>
          Revertir PreAprobación
        </SecondaryButton>
      )}
      <IncompleteDocsButton
        disabled={isLoading}
        productId={record.id}
        setIsLoading={setIsLoading}
      />
      {permissions.includes("APPROVE:productStatus") && (
        <SecondaryButton
          disabled={isLoading}
          onClick={() => onClick("approve")}
        >
          Aprobar
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
