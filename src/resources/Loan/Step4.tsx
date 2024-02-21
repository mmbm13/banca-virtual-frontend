import {
  CountryCodeInput,
  CurrencyInput,
  SelectInput,
  TextInput,
} from "@/components/root";
import { Box, Typography } from "@mui/material";
import { validateCountryCode, validatePhoneNumber } from "../../common";
import { email, required } from "react-admin";
import { useFormContext } from "react-hook-form";

export const Step4 = () => {
  const { getValues } = useFormContext();
  const values = getValues();
  return (
    <>
      <Box
        sx={{
          display: { sm: "grid" },
          gridTemplateColumns: "1fr 1fr",
          columnGap: "20px",
          marginTop: "15px",
        }}
      >
        <TextInput
          source="personalFamilyReference.fullName"
          label="Nombre completo"
          validate={required()}
        />
        <TextInput
          source="personalFamilyReference.city"
          label="Ciudad donde vive"
          validate={required()}
        />
        <SelectInput
          source="personalFamilyReference.referenceType"
          label="Tipo de referencia"
          validate={required()}
          choices={[
            { id: "Personal", name: "Personal" },
            { id: "Laboral", name: "Laboral" },
          ]}
        />
        <TextInput
          source="personalFamilyReference.phone"
          label="Teléfono"
          validate={[required(), validatePhoneNumber]}
        />
        <CountryCodeInput
          source="personalFamilyReference.countryCode"
          label="Código país"
          validate={[required(), validateCountryCode]}
        />
        <TextInput
          source="personalFamilyReference.email"
          label="Correo electrónico"
          autoComplete="email"
          validate={[required(), email()]}
        />
      </Box>
      {values?.laborAndFinancialInformation?.employmentStatus ===
        "Desempleado" && (
        <Box mt={"20px"}>
          <Typography textAlign="center" variant="h3">
            Información del codeudor
          </Typography>
          <Typography textAlign="center" variant="body2">
            Ingresa la información según el documento de identificación
          </Typography>
          <Box
            sx={{
              display: { sm: "grid" },
              gridTemplateColumns: "1fr 1fr",
              columnGap: "20px",
              marginTop: "15px",
            }}
          >
            <TextInput
              source="codebtorImformation.fullName"
              label="Nombre completo"
              validate={required()}
            />
            <TextInput
              source="codebtorImformation.city"
              label="Ciudad donde vive"
              validate={required()}
            />
            <TextInput
              source="codebtorImformation.phone"
              label="Teléfono"
              validate={[required(), validatePhoneNumber]}
            />
            <TextInput
              source="codebtorImformation.email"
              label="Correo electrónico"
              autoComplete="email"
              validate={[required(), email()]}
            />
            <CurrencyInput
              source="codebtorImformation.monthlyIncome"
              label="Ingresos mensuales"
              validate={required()}
            />
            <CurrencyInput
              source="codebtorImformation.monthlyExpenses"
              label="Egresos mensuales"
              validate={required()}
            />
            <TextInput
              source="codebtorImformation.company"
              label="Empresa donde labora"
              validate={required()}
            />
            <SelectInput
              source="codebtorImformation.employmentStatus"
              label="Situación laboral"
              validate={required()}
              choices={[
                { id: "Empleado", name: "Empleado" },
                { id: "Independiente", name: "Independiente" },
                { id: "Desempleado", name: "Desempleado" },
              ]}
            />
            <TextInput
              source="codebtorImformation.companyAddress"
              label="Dirección de la empresa"
              validate={required()}
            />
            <TextInput
              source="codebtorImformation.companyPhone"
              label="Teléfono de la empresa"
              validate={required()}
            />
            <SelectInput
              source="codebtorImformation.contractType"
              label="Tipo de contrato"
              validate={required()}
              choices={[
                { id: "Termino Indefinido", name: "Término indefinido" },
                { id: "Termino Fijo", name: "Término fijo" },
                { id: "Obra labor", name: "Obra labor" },
                { id: "Temporal", name: "Temporal" },
                { id: "Ninguno", name: "Ninguno" },
              ]}
            />
          </Box>
        </Box>
      )}
    </>
  );
};
