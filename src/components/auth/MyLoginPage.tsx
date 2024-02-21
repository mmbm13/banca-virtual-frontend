import { Typography } from "@mui/material";
import { SimpleForm, required, useLogin, useNotify } from "react-admin";
import { SelectInput } from "../root";
import { MyToolBar } from "./MyToolBar";
import { UserCredentials } from "./UserCredentials";
import { ModalForgotPassword } from "./ModalForgotPassword";
import { Container } from "./Container";

const MyLoginPage = () => {
  const login = useLogin();
  const notify = useNotify();

  const handleLogin = (data: any) => {
    login(data).catch((err) => {
      notify(err, {
        type: "error",
        messageArgs: { _: err },
      });
    });
  };

  return (
    <Container>
      <Typography
        align="center"
        variant="h5"
        fontWeight="bolder"
        paddingTop="35px"
      >
        Bienvenido de nuevo
      </Typography>
      <SimpleForm toolbar={<MyToolBar />} onSubmit={handleLogin}>
        <SelectInput
          source="type"
          validate={required()}
          label="login.type"
          choices={[
            { id: "TI", name: "Tarjeta de identidad" },
            { id: "EMAIL", name: "Correo electronico" },
          ]}
        />
        <UserCredentials />
      </SimpleForm>
      <ModalForgotPassword />
    </Container>
  );
};

export default MyLoginPage;
