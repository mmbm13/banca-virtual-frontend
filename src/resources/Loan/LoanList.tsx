import {
  List,
  Datagrid,
  TextField,
  TopToolbar,
  CreateButton,
  useListContext,
  Identifier,
  RaRecord,
} from "react-admin";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import { ColoredChipField } from "@/components/ColoredChipField";
import { CurrencyField } from "@/components/root/CurrencyField";
import { Title } from "@/components/root/Title";
import { SubTitle } from "@/components/root/SubTitle";
import { Alert, Box } from "@mui/material";
import { DateField } from "@/components/root";
import { ProductStatus } from "../../common/enums";

const postRowClick = (id: Identifier, resource: string, record: RaRecord) =>
  record.status === ProductStatus.PRE_APPROVED ||
  record.status === ProductStatus.INCOMPLETE_DOCUMENTS
    ? `/products/${id}`
    : false;

const ListActions = () => {
  const { isLoading } = useListContext();
  const canCreate = localStorage.getItem("canCreateLoan") === "true";
  const hasPendingPayment =
    localStorage.getItem("hasPendingPayment") === "true";

  return (
    <TopToolbar>
      <Box width="100%">
        <Title value="Estado de productos" />
        <SubTitle value="Listado productos solicitados, aprobados y rechazados" />
      </Box>
      {canCreate && !isLoading && (
        <CreateButton
          label="Solicitar"
          variant="contained"
          color="secondary"
          size="large"
          to="/products/create"
          icon={<RequestQuoteIcon />}
        />
      )}
      {hasPendingPayment && !isLoading && (
        <Alert severity="warning">
          Tiene procesos anteriores pendientes de pago, por favor comuniquese
          con cartera para saldar el saldo pendiente y poder solicitar nuevos
          financiamientos
        </Alert>
      )}
    </TopToolbar>
  );
};

export const LoanList = () => (
  <List empty={false} actions={<ListActions />} resource="products/student">
    <Datagrid rowClick={postRowClick}>
      <CurrencyField source="amount" label="Valor" />
      <TextField source="paymentTime" label="Plazo" />
      <ColoredChipField source="status" label="Estado" />
      <DateField source="createAt" label="Fecha" />
    </Datagrid>
  </List>
);
