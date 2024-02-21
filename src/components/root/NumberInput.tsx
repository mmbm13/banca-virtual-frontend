import { NumberInput as MuiNumberInput, NumberInputProps } from "react-admin";

export const NumberInput = (props: NumberInputProps) => {
  return <MuiNumberInput helperText={false} {...props} />;
};
