import {
  CheckBoxInput,
  CountryCodeInput,
  DateInput,
  SelectInput,
  TextInput,
} from "@/components/root";
import { Box } from "@mui/material";
import { validateCountryCode, validatePhoneNumber } from "../../common";
import { email, required, useRecordContext } from "react-admin";
import { Link } from "react-router-dom";

const isTrue =
  (message = "Required") =>
  (value: boolean) =>
    value ? undefined : message;

export const Step1 = () => {
  const record = useRecordContext();
  return (
    <Box
      sx={{
        display: { sm: "grid" },
        gridTemplateColumns: "1fr 1fr",
        columnGap: "20px",
        marginTop: "15px",
      }}
    >
      <TextInput
        source="firstName"
        label="Nombres"
        validate={required()}
        InputProps={{ disabled: true }}
      />
      <TextInput
        source="lastName"
        label="Apellidos"
        validate={required()}
        InputProps={{ disabled: true }}
      />
      <TextInput
        source="personalInformation.placeOfBirth"
        label="Lugar de nacimiento"
        validate={required()}
        InputProps={{ disabled: !!record?.personalInformation?.placeOfBirth }}
      />
      <DateInput
        source="personalInformation.dateOfBirth"
        label="Fecha de nacimiento"
        validate={required()}
        disabled={!!record?.personalInformation?.dateOfBirth}
      />
      <SelectInput
        source="typeIdentification"
        label="Tipo de identificación"
        validate={required()}
        choices={[
          { id: "CC", name: "Cédula de Ciudadanía" },
          { id: "TI", name: "Tarjeta de Identidad" },
          { id: "CE", name: "Cédula de Extranjería" },
          { id: "PA", name: "Pasaporte" },
        ]}
      />
      <TextInput
        source="identification"
        label="Identificación"
        validate={required()}
      />
      <TextInput
        source="personalInformation.placeOfIssue"
        label="Lugar de expedición de documento"
        validate={required()}
      />
      <DateInput
        source="personalInformation.dateOfIssue"
        label="Fecha de expedición de documento"
        validate={required()}
      />
      <CountryCodeInput
        source="personalInformation.countryCode"
        label="Código país"
        validate={[required(), validateCountryCode]}
      />
      <TextInput
        source="phone"
        type="phone"
        label="Número de celular"
        validate={[required(), validatePhoneNumber]}
        InputProps={{ disabled: true }}
      />
      <TextInput
        source="email"
        label="Correo electrónico"
        autoComplete="email"
        validate={[required(), email()]}
        InputProps={{ disabled: true }}
      />
      <Box flex="1" />
      <CheckBoxInput
        source="personalInformation.acceptedTermsAndConditions"
        label={
          <Link to="/pdfDocs/terminos.pdf" target="_blank">
            Acepto términos y condiciones
          </Link>
        }
        validate={isTrue("Requerido")}
      />
    </Box>
  );
};
