import { Edit, SimpleForm, required, usePermissions } from "react-admin";
import { ListEditHeader } from "@/components/root/listHeader/ListEditHeader";
import { EditToolbar } from "@/components/root/EditToolBar";
import { Box, Card, CardContent, CardHeader } from "@mui/material";
import { TextInput } from "@/components/root";

export const TransactionsEdit = () => {
  const { permissions } = usePermissions();
  const canDelete = permissions.includes("DELETE:roles");
  const canSave = permissions.includes("PUT:roles");
  return (
    <Edit
      mutationMode="pessimistic"
      actions={<ListEditHeader title="Editar Rol" />}
    >
      <SimpleForm
        toolbar={<EditToolbar canDelete={canDelete} canSave={canSave} />}
      >
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
    </Edit>
  );
};
