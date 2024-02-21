import { CurrencyInput, SelectInput, TextInput } from "@/components/root";
import { Box } from "@mui/material";
import { validatePhoneNumber } from "../../common";
import { required } from "react-admin";

export const Step3 = () => {
  return (
    <Box
      sx={{
        display: { sm: "grid" },
        gridTemplateColumns: "1fr 1fr",
        columnGap: "20px",
        marginTop: "15px",
      }}
    >
      <CurrencyInput
        source="laborAndFinancialInformation.monthlyIncome"
        label="Ingresos mensuales"
        validate={required()}
      />
      <CurrencyInput
        source="laborAndFinancialInformation.monthlyExpenses"
        label="Egresos mensuales"
        validate={required()}
      />
      <TextInput
        source="laborAndFinancialInformation.company"
        label="Empresa donde labora"
        validate={required()}
      />
      <SelectInput
        source="laborAndFinancialInformation.employmentStatus"
        label="Situación laboral"
        validate={required()}
        choices={[
          { id: "Empleado", name: "Empleado" },
          { id: "Independiente", name: "Independiente" },
          { id: "Desempleado", name: "Desempleado" },
        ]}
      />
      <TextInput
        source="laborAndFinancialInformation.companyAddress"
        label="Dirección de la empresa"
        validate={required()}
      />
      <TextInput
        source="laborAndFinancialInformation.companyTelephone"
        label="Teléfono de la empresa"
        validate={[required(), validatePhoneNumber]}
      />
      <SelectInput
        source="laborAndFinancialInformation.contractType"
        label="Tipo de contrato"
        validate={required()}
        choices={[
          { id: "Termino Indefinido", name: "Término Indefinido" },
          { id: "Termino Fijo", name: "Término Fijo" },
          { id: "Obra labor", name: "Obra labor" },
          { id: "Temporal", name: "Temporal" },
          { id: "Ninguno", name: "Ninguno" },
        ]}
      />
    </Box>
  );
};
