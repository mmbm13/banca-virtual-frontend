import { InputAdornment } from "@mui/material";
import { TextInput as MuiTextInput, TextInputProps } from "react-admin";

const parser = (value: number) => {
  return value ? Number(value).toLocaleString("en-CO") : "";
};

const formatter = (value: string) => {
  return Number((value || "").replace(/\D+/g, ""));
};
export const CurrencyInput = (props: TextInputProps) => {
  return (
    <MuiTextInput
      helperText={false}
      parse={formatter}
      format={parser}
      InputProps={{
        startAdornment: <InputAdornment position="start">$</InputAdornment>,
      }}
      {...props}
    />
  );
};
