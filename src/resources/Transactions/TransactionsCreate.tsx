import { Create, SimpleForm, required } from "react-admin";
import { ListEditHeader } from "@/components/root/listHeader/ListEditHeader";
import { EditToolbar } from "@/components/root/EditToolBar";
import { Box, Card, CardContent, CardHeader } from "@mui/material";
import { TextInput } from "@/components/root";

export const TransactionsCreate = () => {
  return (
    <Create actions={<ListEditHeader title="Crear Rol" />} redirect="list">
      <SimpleForm toolbar={<EditToolbar />}>
        <Box width="100%" sx={{ display: "flex", gap: "20px" }}>
          <Card sx={{ width: "40%" }} elevation={5}>
            <CardHeader title="Datos básicos" />
            <CardContent>
              <TextInput source="name" label="Nombre" validate={required()} />
              <TextInput
                source="description"
                label="Descripción"
                multiline
                rows={3}
                validate={required()}
              />
            </CardContent>
          </Card>
        </Box>
      </SimpleForm>
    </Create>
  );
};
