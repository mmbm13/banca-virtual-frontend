import {
  Create,
  SimpleForm,
  required,
  useNotify,
  useRedirect,
} from "react-admin";
import { Container } from "./Container";
import { SelectInput, TextInput } from "../root";
import { UserCredentials } from "./UserCredentials";
import { MyToolBar } from "./MyToolBar";
import { Box, Button } from "@mui/material";

export const AuthRegister = () => {
  const redirect = useRedirect();
  const notify = useNotify();

  const onSuccess = () => {
    notify("login.register", { type: "success" });
    redirect("/login");
  };

  const transform = (data: any) => {
    delete data.confirm_password;
    return data;
  };

  return (
    <Container>
      <Create
        resource="auth/register"
        transform={transform}
        mutationOptions={{ onSuccess }}
        component="div"
      >
        <SimpleForm toolbar={<MyToolBar text="Registrar" />}>
          <TextInput source="name" validate={required()} label="Nombre" />
          <SelectInput
            source="type"
            validate={required()}
            label="login.type"
            choices={[
              { id: "TI", name: "Tarjeta de identidad" },
              { id: "EMAIL", name: "Correo electronico" },
            ]}
          />
          <UserCredentials confirm={true} />
        </SimpleForm>
      </Create>
      <Box textAlign="center">
        <Button sx={{ margin: "auto" }} onClick={() => redirect("/login")}>
          ¿Ya tienes cuenta? Inicia sesion
        </Button>
      </Box>
    </Container>
  );
};
