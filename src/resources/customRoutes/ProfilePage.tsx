import { SelectInput, TextInput } from "@/components/root";
import { Box, Card, CardContent, CardHeader, Paper } from "@mui/material";
import { equalToPassword, strongPassword } from "../../common";
import {
  PasswordInput,
  SimpleForm,
  email,
  required,
  useGetOne,
  useNotify,
  useRedirect,
  useUpdate,
} from "react-admin";
import { ListEditHeader } from "@/components/root/listHeader/ListEditHeader";
import { EditToolbar } from "@/components/root/EditToolBar";

export const ProfilePage = () => {
  const notify = useNotify();
  const [update] = useUpdate();
  const redirect = useRedirect();

  const { data: record, isLoading } = useGetOne(
    "users",
    { id: "profile" },
    {
      onError: () => {
        notify("ra.notification.item_doesnt_exist", {
          type: "error",
        });
        redirect("/transactions");
      },
    }
  );

  const onSubmit = async (data: any) => {
    delete data.confirm_password;
    delete data.coins;
    delete data.role;
    delete data.sended;
    delete data.received;
    try {
      await update(
        "users",
        { id: "profile", data },
        { mutationMode: "pessimistic", returnPromise: true }
      );
      notify("user.profileUpdate", { type: "success" });
    } catch (error: any) {
      notify(error.message, {
        type: "error",
        messageArgs: { _: error.message },
      });
    }
  };

  if (isLoading) return null;

  return (
    <Paper
      sx={{
        paddingBottom: "20px",
        "& .MuiToolbar-root ": { backgroundColor: "white" },
      }}
    >
      <Box padding="0px 16px" width="100%">
        <ListEditHeader
          title="Editar perfil"
          subTitle="Actualizar datos personales y contraseña"
        />
      </Box>

      <SimpleForm
        toolbar={<EditToolbar canDelete={false} />}
        onSubmit={onSubmit}
        record={record}
      >
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
                validate={strongPassword}
                helperText={false}
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
    </Paper>
  );
};
