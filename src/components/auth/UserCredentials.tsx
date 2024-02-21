import { useFormContext } from "react-hook-form";
import { TextInput } from "../root";
import { PasswordInput, email, required } from "react-admin";
import { equalToPassword, strongPassword } from "../../common";

export const UserCredentials = ({ confirm = false }: { confirm?: boolean }) => {
  const { watch } = useFormContext();
  const type = watch("type");

  return (
    <>
      {type === "EMAIL" && (
        <TextInput
          source="email"
          label="login.email"
          validate={[email(), required()]}
        />
      )}
      {type === "TI" && (
        <TextInput
          source="identification"
          label="login.identification"
          validate={required()}
        />
      )}
      {type && (
        <PasswordInput
          source="password"
          label="login.password"
          validate={confirm ? [required(), strongPassword] : required()}
          helperText={false}
        />
      )}
      {type && confirm && (
        <PasswordInput
          source="confirm_password"
          label="Confirmar Contraseña"
          inputProps={{ autoComplete: "new-password" }}
          validate={[equalToPassword, strongPassword]}
          helperText={false}
        />
      )}
    </>
  );
};
