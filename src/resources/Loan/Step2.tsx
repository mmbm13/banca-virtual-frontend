import { NumberInput, SelectInput, TextInput } from "@/components/root";
import { Box } from "@mui/material";
import { minValue, required } from "react-admin";

export const Step2 = () => {
  return (
    <Box
      sx={{
        display: { sm: "grid" },
        gridTemplateColumns: "1fr 1fr",
        columnGap: "20px",
        marginTop: "15px",
      }}
    >
      <SelectInput
        source="personalInformation.educationLevel"
        label="Nivel de estudios"
        validate={required()}
        choices={[
          { id: "Primaria", name: "Primaria" },
          { id: "Secundaria", name: "Secundaria" },
          { id: "Tecnico o Tecnologo", name: "Técnico o Tecnólogo" },
          { id: "Profesional", name: "Profesional" },
          { id: "Postgrado", name: "Postgrado" },
          { id: "Especializacion", name: "Especialización" },
          { id: "Maestria", name: "Maestría" },
          { id: "Doctorado", name: "Doctorado" },
        ]}
      />
      <SelectInput
        source="personalInformation.educationStatus"
        label="Estado de estudios"
        validate={required()}
        choices={[
          { id: "Cursando", name: "Cursando" },
          { id: "Finalizado", name: "Finalizado" },
        ]}
      />
      <NumberInput
        source="personalInformation.numberChildrens"
        label="Número de hijos"
        min={0}
        validate={[required(), minValue(0)]}
      />
      <NumberInput
        source="personalInformation.numberDependents"
        label="Personas a cargo"
        min={0}
        validate={[required(), minValue(0)]}
      />
      <SelectInput
        source="personalInformation.gender"
        label="Genero"
        validate={required()}
        choices={[
          { id: "Femenino", name: "Femenino" },
          { id: "Masculino", name: "Masculino" },
          { id: "Otro", name: "Otro" },
        ]}
      />
      <SelectInput
        source="personalInformation.civilStatus"
        label="Estado civil"
        validate={required()}
        choices={[
          { id: "Soltero/a", name: "Soltero/a" },
          { id: "Union libre", name: "Unión libre" },
          { id: "Casado/a", name: "Casado/a" },
          { id: "Divorciado/a", name: "Divorciado/a" },
          { id: "Viudo/a", name: "Viudo/a" },
        ]}
      />
      <SelectInput
        source="personalInformation.houseType"
        label="Tipo de vivienda"
        validate={required()}
        choices={[
          { id: "Arriendo", name: "Arriendo" },
          { id: "Propia", name: "Propia" },
          { id: "Familiar", name: "Familiar" },
        ]}
      />
      <SelectInput
        source="personalInformation.houseTime"
        label="Tiempo de vivienda"
        validate={required()}
        choices={[
          { id: "Menos de 1 año", name: "Menos de 1 año" },
          { id: "1 año", name: "1 año" },
          { id: "2 años", name: "2 años" },
          { id: "3 años", name: "3 años" },
          { id: "4 años", name: "4 años" },
          { id: "5 años", name: "5 años" },
          { id: "Más de 5 años", name: "Más de 5 años" },
        ]}
      />
      <TextInput
        source="personalInformation.city"
        label="Ciudad donde vive"
        validate={required()}
      />
      <TextInput
        source="personalInformation.address"
        label="Dirección"
        validate={required()}
      />
      <TextInput
        source="personalInformation.additionalAddress"
        label="Apartamento/Torre/Edificio/Otros"
      />
    </Box>
  );
};
