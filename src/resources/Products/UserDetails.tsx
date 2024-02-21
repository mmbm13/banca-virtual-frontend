import { CollapseCard } from "@/components/CollapseCard";
import { Box, Theme } from "@mui/material";
import { FunctionField, TabbedShowLayout, TextField } from "react-admin";
import { Column } from "./Column";
import { ReactNode } from "react";
import { IdentificationType } from "../../common/enums";
import { Title } from "@/components/root/Title";
import { CountryOption, DateField } from "@/components/root";
import { countryCodes } from "../../common";
import { CurrencyField } from "@/components/root/CurrencyField";

const BaseBox = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      sx={{
        display: "grid",
        // columnGap: '30px',
        gridTemplateColumns: "1fr 1fr",
        "& > :nth-of-type(4n-3), & > :nth-of-type(4n-2)": {
          backgroundColor: (theme: Theme) => theme.palette.action.hover,
        },
        "& > div": {
          borderBottom: "1px solid",
          borderRight: "1px solid",
        },
        "& > :nth-of-type(2n + 1)": {
          borderLeft: "1px solid",
        },
        "& > :nth-of-type(-n+2)": {
          borderTop: "1px solid",
        },
      }}
    >
      {children}
    </Box>
  );
};

export const UserDetails = () => {
  return (
    <CollapseCard title="Detalles del solicitante">
      <TabbedShowLayout>
        <TabbedShowLayout.Tab label="Informacion Personal">
          <BaseBox>
            <Column title="Nombre Completo">
              <TextField source="fullName" />
            </Column>
            <Column title="Lugar de nacimiento">
              <TextField source="personalInformation.placeOfBirth" />
            </Column>
            <Column title="Fecha de nacimiento">
              <DateField source="personalInformation.dateOfBirth" />
            </Column>
            <Column title="Tipo de identificación">
              <FunctionField
                render={(record: any) =>
                  IdentificationType[
                    record?.typeIdentification as keyof typeof IdentificationType
                  ]
                }
              />
            </Column>
            <Column title="Identificación">
              <TextField source="identification" />
            </Column>
            <Column title="Lugar de expedición de documento">
              <TextField source="personalInformation.placeOfIssue" />
            </Column>
            <Column title="Fecha de expedición de documento">
              <DateField source="personalInformation.dateOfIssue" />
            </Column>
            <Column title="Código país">
              <FunctionField
                render={(record: any) =>
                  CountryOption({
                    record: countryCodes.find(
                      (country) =>
                        country.id === record?.personalInformation?.countryCode
                    ),
                  })
                }
              />
            </Column>
            <Column title="Número de celular">
              <TextField source="studentDetails.phone" />
            </Column>
            <Column title="Correo electrónico">
              <TextField source="studentDetails.email" />
            </Column>
          </BaseBox>
        </TabbedShowLayout.Tab>
        <TabbedShowLayout.Tab label="Datos basicos">
          <BaseBox>
            <Column title="Nivel de estudios">
              <TextField source="personalInformation.educationLevel" />
            </Column>
            <Column title="Estado de estudios">
              <TextField source="personalInformation.educationStatus" />
            </Column>
            <Column title="Número de hijos">
              <TextField source="personalInformation.numberChildrens" />
            </Column>
            <Column title="Personas a cargo">
              <TextField source="personalInformation.numberDependents" />
            </Column>
            <Column title="Genero">
              <TextField source="personalInformation.gender" />
            </Column>
            <Column title="Estado civil">
              <TextField source="personalInformation.civilStatus" />
            </Column>
            <Column title="Tipo de vivienda">
              <TextField source="personalInformation.houseType" />
            </Column>
            <Column title="Tiempo de vivienda">
              <TextField source="personalInformation.houseTime" />
            </Column>
            <Column title="Ciudad donde vive">
              <TextField source="personalInformation.city" />
            </Column>
            <Column title="Dirección">
              <TextField source="personalInformation.address" />
            </Column>
            <Column title="Apartamento/Torre/Edificio/Otros">
              <TextField source="personalInformation.additionalAddress" />
            </Column>
          </BaseBox>
        </TabbedShowLayout.Tab>
        <TabbedShowLayout.Tab label="Informacion laboral">
          <BaseBox>
            <Column title="Ingresos mensuales">
              <CurrencyField source="laborAndFinancialInformation.monthlyIncome" />
            </Column>
            <Column title="Egresos mensuales">
              <CurrencyField source="laborAndFinancialInformation.monthlyExpenses" />
            </Column>
            <Column title="Empresa donde labora">
              <TextField source="laborAndFinancialInformation.company" />
            </Column>
            <Column title="Situación laboral">
              <TextField source="laborAndFinancialInformation.employmentStatus" />
            </Column>
            <Column title="Dirección de la empresa">
              <TextField source="laborAndFinancialInformation.companyAddress" />
            </Column>
            <Column title="Teléfono de la empresa">
              <TextField source="laborAndFinancialInformation.companyTelephone" />
            </Column>
            <Column title="Tipo de contrato">
              <TextField source="laborAndFinancialInformation.contractType" />
            </Column>
          </BaseBox>
        </TabbedShowLayout.Tab>
        <TabbedShowLayout.Tab label="Referencias">
          <Title value="Referencias personales y/o familiares" />
          <BaseBox>
            <Column title="Nombre completo">
              <TextField source="personalFamilyReference.fullName" />
            </Column>
            <Column title="Ciudad donde vive">
              <TextField source="personalFamilyReference.city" />
            </Column>
            <Column title="Tipo de referencia">
              <TextField source="personalFamilyReference.referenceType" />
            </Column>
            <Column title="Teléfono">
              <TextField source="personalFamilyReference.phone" />
            </Column>
            <Column title="Código país">
              <FunctionField
                render={(record: any) =>
                  CountryOption({
                    record: countryCodes.find(
                      (country) =>
                        country.id ===
                        record?.personalFamilyReference?.countryCode
                    ),
                  })
                }
              />
            </Column>
            <Column title="Correo electrónico">
              <TextField source="personalFamilyReference.email" />
            </Column>
          </BaseBox>
          <Title value="Información del codeudor" />
          <BaseBox>
            <Column title="Nombre completo">
              <TextField source="codebtorImformation.fullName" />
            </Column>
            <Column title="Ciudad donde vive">
              <TextField source="codebtorImformation.city" />
            </Column>
            <Column title="Teléfono">
              <TextField source="codebtorImformation.phone" />
            </Column>
            <Column title="Correo electrónico">
              <TextField source="codebtorImformation.email" />
            </Column>
            <Column title="Ingresos mensuales">
              <CurrencyField source="codebtorImformation.monthlyIncome" />
            </Column>
            <Column title="Egresos mensuales">
              <CurrencyField source="codebtorImformation.monthlyExpenses" />
            </Column>
            <Column title="Empresa donde labora">
              <TextField source="codebtorImformation.company" />
            </Column>
            <Column title="Situación laboral">
              <TextField source="codebtorImformation.employmentStatus" />
            </Column>
            <Column title="Dirección de la empresa">
              <TextField source="codebtorImformation.companyAddress" />
            </Column>
            <Column title="Teléfono de la empresa">
              <TextField source="codebtorImformation.companyPhone" />
            </Column>
            <Column title="Tipo de contrato">
              <TextField source="codebtorImformation.contractType" />
            </Column>
          </BaseBox>
        </TabbedShowLayout.Tab>
      </TabbedShowLayout>
    </CollapseCard>
  );
};
