import { TextField, TextFieldProps } from "@mui/material";
import { MAX_MONEY } from "../common/constants";
import {
  NumericFormat as CustomNumeric,
  NumericFormatProps,
} from "react-number-format";

export function NumericFormat(props: NumericFormatProps<TextFieldProps>) {
  return (
    <CustomNumeric
      customInput={TextField}
      thousandSeparator
      prefix={"$ "}
      fullWidth={false}
      isAllowed={(values) => {
        const { floatValue } = values;
        return (floatValue || 0) <= MAX_MONEY;
      }}
      onFocus={(event) => {
        event.target.select();
      }}
      {...props}
    />
  );
}
