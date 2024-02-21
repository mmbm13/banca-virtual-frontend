/* eslint-disable react-hooks/exhaustive-deps */
import { CurrencyField } from "@/components/root/CurrencyField";
import { InputAdornment, IconButton } from "@mui/material";
import { useEffect, useRef, useState, Dispatch, SetStateAction } from "react";
import { useNotify, useRecordContext, useUpdate } from "react-admin";
import CheckIcon from "@mui/icons-material/Check";
import { NumericFormat } from "@/components/NumericFormat";
import { NumberFormatValues } from "react-number-format";

export const DynamicAmout = ({
  isUpdating,
  setIsUpdating,
}: {
  isUpdating: boolean;
  setIsUpdating: Dispatch<SetStateAction<boolean>>;
}) => {
  const record = useRecordContext();
  const notify = useNotify();
  const [value, setValue] = useState(record.amount);
  const inputRef = useRef<HTMLInputElement>();
  const [update, { isLoading }] = useUpdate();

  useEffect(() => {
    if (isUpdating) {
      inputRef.current?.select();
    }
  }, [isUpdating]);

  const handleInput = (event: NumberFormatValues) => {
    setValue(event.floatValue);
  };

  const onClick = async () => {
    try {
      await update(
        "products",
        { id: record.id, data: { amount: value } },
        { mutationMode: "pessimistic", returnPromise: true }
      );
      const message = "Registro actualizado";
      setTimeout(
        () => notify(message, { type: "success", messageArgs: { _: message } }),
        100
      );
    } catch (error) {
      const message = (error as Error).message;
      setTimeout(
        () => notify(message, { type: "error", messageArgs: { _: message } }),
        100
      );
    } finally {
      setIsUpdating(false);
    }
  };

  return isUpdating ? (
    <NumericFormat
      helperText={false}
      value={value}
      sx={{ margin: 0, maxWidth: "200px", backgroundColor: "white" }}
      onValueChange={handleInput}
      inputRef={inputRef}
      onBlur={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      disabled={isLoading}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              edge="end"
              onClick={onClick}
              disabled={isLoading}
            >
              <CheckIcon color="success" />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  ) : (
    <CurrencyField source="amount" />
  );
};
