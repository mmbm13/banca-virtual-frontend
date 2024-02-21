import { regex } from "react-admin";

export const validatePhoneNumber = regex(
  /^\d{5,15}$/,
  "Debe ser un numero de telefono valido"
);

export const validateCountryCode = regex(
  /^[A-z]{1,3}$/,
  "Debe ser un codigo de paise valido"
);

export const equalToPassword = (value: string, allValues: any) => {
  if (value !== allValues.password) {
    return "Las dos contraseñas no coinciden";
  }
};

export const strongPassword = regex(
  /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/,
  "La contraseña debe ser minimo 8 caracteres y contener al menos una mayuscula, miniscula, numeros y un caracter especial"
);
