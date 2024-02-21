import { ColoredChipField } from "@/components/ColoredChipField";
import { DateField, SelectInput } from "@/components/root";
import { ListHeader } from "@/components/root/listHeader/ListHeader";
import { Datagrid, List, TextField } from "react-admin";

const InputsFilters = () => {
  return (
    <>
      <SelectInput
        resettable
        source="status"
        label="Estado"
        fullWidth={false}
        choices={[
          { id: "COMPLETED", name: "Completado" },
          { id: "PENDING", name: "Pendiente" },
        ]}
      />
    </>
  );
};

export const TransactionsList = () => {
  return (
    <List
      empty={false}
      actions={
        <ListHeader
          title="Listado de Transacciones"
          subTitle=""
          inputs={<InputsFilters />}
          canCreate={false}
        />
      }
    >
      <Datagrid>
        <TextField source="id" />
        <TextField source="sender.name" label="Desde" sortable={false} />
        <TextField source="receiver.name" label="Hacia" sortable={false} />
        <TextField source="coins" label="Monedas" />
        <ColoredChipField source="status" label="Estado" />
        <DateField source="createdAt" label="Fecha creación" />
      </Datagrid>
    </List>
  );
};
