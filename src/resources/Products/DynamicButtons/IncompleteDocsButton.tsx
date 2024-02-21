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

interface IncompleteDocsButtonProps {
  productId: Identifier;
  disabled: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const IncompleteDocsButton = ({
  productId,
  disabled,
  setIsLoading,
}: IncompleteDocsButtonProps) => {
  const notify = useNotify();
  const redirect = useRedirect();
  const { permissions } = usePermissions();
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const dataProvider = useDataProvider<DataProviderWithCustomMethods>();

  const IncompleteDocs = async () => {
    try {
      setIsLoading(true);
      if (!description) {
        setError(true);
      } else {
        await dataProvider.httpFetch(`products/${productId}`, {
          method: "PUT",
          body: JSON.stringify({
            status: ProductStatus.INCOMPLETE_DOCUMENTS,
            deniedDescription: description,
          }),
        });
        notify("status.incompleteDocs", { type: "success" });
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

  if (!permissions.includes("INCOMPLETE_DOCS:productStatus")) {
    return null;
  }

  return (
    <>
      <Dialog
        open={open}
        title="Documentos incompletos"
        handleClose={handleClose}
        handleContinue={IncompleteDocs}
        disabled={disabled}
        hasCancel={true}
        content={
          <TextField
            value={description}
            placeholder="Indique que documentos estan incorrectos y el motivo"
            multiline
            rows={3}
            onChange={handleChange}
            error={error}
            helperText={error ? "Requerido" : false}
          />
        }
      />
      <SecondaryButton disabled={disabled} onClick={handleOpen}>
        Documentos incompletos
      </SecondaryButton>
    </>
  );
};
