import { NumberField, NumberFieldProps } from "react-admin";

export const CurrencyField = (props: NumberFieldProps) => {
  return (
    <NumberField
      locales="en-CO"
      options={{
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      }}
      textAlign="left"
      {...props}
    />
  );
};
