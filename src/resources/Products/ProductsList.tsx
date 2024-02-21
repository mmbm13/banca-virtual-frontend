import {
  List,
  Datagrid,
  TextField,
  EditButton as ReactEditButton,
  useRecordContext,
  ChipField,
  usePermissions,
} from "react-admin";
import { Box, Chip, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  TextInput,
  SelectInput,
  DateInput,
  DateField,
} from "@/components/root";
import { ColoredChipField } from "@/components/ColoredChipField";
import { CurrencyField } from "@/components/root/CurrencyField";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ListHeader } from "@/components/root/listHeader/ListHeader";
import { ProductStatus } from "../../common/enums";

const Intermediate = () => (
  <Box sx={{ width: "100%" }}>
    <Chip
      label="Cliente Nuevo"
      color="secondary"
      sx={{ mr: "10px" }}
      size="small"
    />
    <Chip label="Cliente Recurrente" size="small" color="gray" />
  </Box>
);

const InputsFilters = () => {
  return (
    <>
      <SelectInput
        source="status"
        label="Estado"
        choices={Object.values(ProductStatus).map((value) => ({
          id: value,
          name: value,
        }))}
        fullWidth={false}
        placeholder="Todos los estados"
      />
      <SelectInput
        source="month"
        label="Meses"
        choices={[
          { id: 0, name: "Enero" },
          { id: 1, name: "Febrero" },
          { id: 2, name: "Marzo" },
          { id: 3, name: "Abril" },
          { id: 4, name: "Mayo" },
          { id: 5, name: "Junio" },
          { id: 6, name: "Julio" },
          { id: 7, name: "Agosto" },
          { id: 8, name: "Septiembre" },
          { id: 9, name: "Octubre" },
          { id: 10, name: "Noviembre" },
          { id: 11, name: "Diciembre" },
        ]}
        fullWidth={false}
        placeholder="Todos los meses"
      />
      <DateInput
        source="year"
        fullWidth={false}
        label="Año"
        placeholder="Todos los años"
        views={["year"]}
        formatDate="YYYY"
      />
      <TextInput
        resettable
        source="q"
        label="Buscar"
        fullWidth={false}
        placeholder="Id / Nombre / Identificacion"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon color="disabled" />
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};

// eslint-disable-next-line no-unused-vars
const EditButton = ({ label }: { label: string }) => (
  <ReactEditButton label="ver" icon={<VisibilityIcon />} />
);

const IdChipField = ({ source }: { source: string }) => {
  const record = useRecordContext();
  const field = record.studentDetails?.productsCount;
  return (
    <ChipField
      color={field < 2 ? "secondary" : "gray"}
      source={source}
      size="small"
      sx={{ textAlign: "center", minWidth: "40px" }}
    />
  );
};

export const ProductList = () => {
  const { permissions } = usePermissions();
  return (
    <List
      queryOptions={{ enabled: permissions.includes("GET:products") }}
      empty={false}
      actions={
        <ListHeader
          intermediate={<Intermediate />}
          inputs={<InputsFilters />}
          canCreate={false}
          title="Estado de Productos"
          subTitle="Listado productos solicitados, aprobados y rechazados"
        />
      }
    >
      <Datagrid>
        <IdChipField source="id" />
        <DateField source="createAt" label="Fecha" />
        <TextField source="fullName" label="Nombre" />
        <TextField source="identification" label="Identificación" />
        <ColoredChipField source="status" label="Estado" />
        <TextField source="type" label="Producto" />
        <CurrencyField source="amount" label="Valor" />
        <TextField source="paymentTime" label="Plazo" />
        <EditButton label="Opciones" />
      </Datagrid>
    </List>
  );
};
