import {
  Identifier,
  useDataProvider,
  useNotify,
  usePermissions,
  useRedirect,
} from "react-admin";
import { ProductStatus } from "../../../common/enums";
import { DataProviderWithCustomMethods } from "../../../providers/dataProvider";
import { SecondaryButton } from "./SecondaryButton";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { Dialog } from "@/components/Dialog";
import { TextField } from "@mui/material";

interface DeniedButtonProps {
  productId: Identifier;
  disabled: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const DeniedButton = ({
  productId,
  disabled,
  setIsLoading,
}: DeniedButtonProps) => {
  const notify = useNotify();
  const redirect = useRedirect();
  const { permissions } = usePermissions();
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const dataProvider = useDataProvider<DataProviderWithCustomMethods>();

  const denied = async () => {
    try {
      setIsLoading(true);
      if (!description) {
        setError(true);
      } else {
        await dataProvider.httpFetch(`products/${productId}`, {
          method: "PUT",
          body: JSON.stringify({
            status: ProductStatus.DENIED,
            deniedDescription: description,
          }),
        });
        notify("status.denied", { type: "success" });
        redirect("/products");
      }
    } catch (error: any) {
      notify(error.message, {
        type: "error",
        messageArgs: { _: error.message },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setError(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setError(false);
    }
    setDescription(event.target.value);
  };

  if (!permissions.includes("DENY:productStatus")) {
    return null;
  }

  return (
    <>
      <Dialog
        open={open}
        title="Motivo del rechazo"
        handleClose={handleClose}
        handleContinue={denied}
        disabled={disabled}
        hasCancel={true}
        content={
          <TextField
            value={description}
            multiline
            rows={3}
            onChange={handleChange}
            error={error}
            helperText={error ? "Requerido" : false}
          />
        }
      />
      <SecondaryButton disabled={disabled} onClick={handleOpen}>
        Denegar
      </SecondaryButton>
    </>
  );
};
