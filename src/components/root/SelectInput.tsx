import { Typography } from "@mui/material";
import {
  SelectInput as MuiSelectInput,
  SelectInputProps,
  useChoicesContext,
} from "react-admin";

const render = (value: any, placeholder = "", options: any[] | undefined) => {
  return (value || value === 0) && options ? (
    options.find((option) => option.id === value).name
  ) : (
    <Typography color="GrayText">{placeholder}</Typography>
  );
};

export const SelectInput = (props: SelectInputProps) => {
  const { allChoices } = useChoicesContext();
  return (
    <MuiSelectInput
      helperText={false}
      sx={{ minWidth: "235px" }}
      SelectProps={{
        renderValue: (value) =>
          render(value, props.placeholder, props.choices || allChoices),
        displayEmpty: true,
      }}
      {...props}
    />
  );
};
