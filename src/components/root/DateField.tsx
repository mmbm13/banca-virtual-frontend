import { DateField as MuiDateField, DateFieldProps } from "react-admin";

export const DateField = (props: DateFieldProps) => {
  return <MuiDateField locales="es-CO" {...props} />;
};
