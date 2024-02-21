import { DateField } from "@/components/root";
import { CurrencyField } from "@/components/root/CurrencyField";
import { Box, Button, Theme, Typography } from "@mui/material";
import { useState } from "react";
import {
  FunctionField,
  Show,
  SimpleShowLayout,
  TextField,
  TopToolbar,
  usePermissions,
} from "react-admin";
import { DynamicAmout } from "./DynamicAmout";
import { DynamicButtons } from "./DynamicButtons/DynamicButtons";
import { Column } from "./Column";
import { DocumentDetails } from "./DocumentDetails";
import { UserDetails } from "./UserDetails";

const Actions = ({ onClick }: { onClick: () => void }) => {
  return (
    <TopToolbar>
      <Button color="secondary" variant="contained" onClick={onClick}>
        Cambiar condiciones
      </Button>
    </TopToolbar>
  );
};

export const ProductShow = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { permissions } = usePermissions();

  const onClick = () => {
    setIsUpdating(true);
  };

  return (
    <Show
      actions={
        permissions.includes("PUT:products") && <Actions onClick={onClick} />
      }
      sx={{ "& .RaShow-card": { backgroundColor: "transparent" } }}
    >
      <SimpleShowLayout sx={{ padding: "0 0 16px" }}>
        <Box
          sx={{
            backgroundColor: "white",
            padding: "8px 16px",
            "& > :nth-of-type(even)": {
              backgroundColor: (theme: Theme) => theme.palette.action.hover,
            },
          }}
        >
          <Column sx={{ padding: "3px 10px" }}>
            <Typography
              component="span"
              sx={{ width: "50%", display: "inline-block" }}
              color="GrayText"
            >
              Descripción de la solicitud
            </Typography>
            <Typography component="span" color="GrayText">
              Valores
            </Typography>
          </Column>
          <Column title="Producto solicitado">
            <TextField source="type" />
          </Column>
          <Column title="Estado del producto">
            <TextField source="status" />
          </Column>
          <Column title="Fecha">
            <DateField showTime source="createAt" />
          </Column>
          <Column title="Valor solicitado">
            <CurrencyField source="amount" />
          </Column>
          <Column title="Valor desembolsado">
            <DynamicAmout
              isUpdating={isUpdating}
              setIsUpdating={setIsUpdating}
            />
          </Column>
          <Column title="Plazo de pago">
            <FunctionField
              render={({ paymentTime }: { paymentTime: number }) =>
                `${paymentTime} ${paymentTime === 1 ? "Mes" : "Meses"} `
              }
            />
          </Column>
          <Column title="Valor por pagar del interes (TEA: 0.00%)">
            <CurrencyField source="interest" emptyText="$0" />
          </Column>
          <Column title="Iva">
            <CurrencyField source="iva" emptyText="$0" />
          </Column>
          <Column title="Valor pendiente por pagar">
            <CurrencyField source="amount" emptyText="$0" />
          </Column>
          <Column title="Valor pendiente de intereses moratorios">
            <CurrencyField source="interest" emptyText="$0" />
          </Column>
          <Column title="Gastos de cobranza">
            <CurrencyField source="interest" emptyText="$0" />
          </Column>
          <Column title="Valor pendiente por pagar + intereses moratorios + gastos de cobranza">
            <CurrencyField source="amount" emptyText="$0" />
          </Column>
        </Box>
        <DynamicButtons />
        {permissions.includes("GET:students") && <UserDetails />}
        {permissions.includes("GET:documents") && <DocumentDetails />}
      </SimpleShowLayout>
    </Show>
  );
};
