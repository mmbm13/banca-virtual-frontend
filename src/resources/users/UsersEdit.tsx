import { SelectInput, TextInput } from "@/components/root";
import { Box, Card, CardContent, CardHeader } from "@mui/material";
import { equalToPassword, strongPassword } from "../../common";
import { Edit, PasswordInput, SimpleForm, email, required } from "react-admin";
import { ListEditHeader } from "@/components/root/listHeader/ListEditHeader";
import { EditToolbar } from "@/components/root/EditToolBar";

export const UsersEdit = () => {
  const transform = (data: any) => {
    delete data.confirm_password;
    delete data.coins;
    delete data.role;
    delete data.sended;
    delete data.received;
    return data;
  };

  return (
    <Edit
      mutationMode="pessimistic"
      transform={transform}
      actions={
        <ListEditHeader
          title="Editar usuario"
          subTitle="Actualizar datos personales y contraseña"
        />
      }
    >
      <SimpleForm toolbar={<EditToolbar />}>
        <Box width="100%" sx={{ display: "flex", gap: "20px" }}>
          <Card sx={{ width: "60%" }} elevation={5}>
            <CardHeader title="Datos basicos" />
            <CardContent>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "15px",
                }}
              >
                <TextInput
                  source="name"
                  label="Nombres"
                  validate={required()}
                />
                <SelectInput
                  source="type"
                  validate={required()}
                  label="login.type"
                  choices={[
                    { id: "TI", name: "Tarjeta de identidad" },
                    { id: "EMAIL", name: "Correo electronico" },
                  ]}
                />
                <TextInput source="identification" label="Identificacion" />
                <TextInput source="email" label="Correo" validate={[email()]} />
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ width: "40%" }} elevation={5}>
            <CardHeader title="Cambiar contraseña" />
            <CardContent>
              <PasswordInput
                source="password"
                label="Contraseña"
                inputProps={{ autoComplete: "new-password" }}
                helperText={false}
                validate={strongPassword}
              />
              <PasswordInput
                source="confirm_password"
                label="Confirmar Contraseña"
                inputProps={{ autoComplete: "new-password" }}
                validate={[equalToPassword, strongPassword]}
              />
            </CardContent>
          </Card>
        </Box>
      </SimpleForm>
    </Edit>
  );
};
