import { TextInput as MuiTextInput, TextInputProps } from "react-admin";

export const TextInput = (props: TextInputProps) => {
  return <MuiTextInput helperText={false} {...props} />;
};
