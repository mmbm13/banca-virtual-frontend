import polyglotI18nProvider from "ra-i18n-polyglot";
import es from "ra-language-spanish";

const esMessages: any = {
  ...es,
  ra: {
    ...es.ra,
    auth: {
      ...es.ra.auth,
      auth_check_error: "Inicie sesion para continuar",
    },
    action: {
      ...es.ra.action,
      clear_input_value: "Limpiar",
      unselect: "No seleccionado",
      export: "Exportar",
      confirm: "Confirmar",
    },
    message: {
      ...es.ra.message,
      not_found: "URL o Link invalido",
      error:
        "Se ha producido un error del cliente y no se ha podido completar tu solicitud.",
    },
    navigation: {
      ...es.ra.navigation,
      page_rows_per_page: "Filas por pagina",
    },
    page: {
      ...es.ra.page,
      error: "Ocurrio algo inesperado",
    },
    notification: {
      ...es.ra.notification,
      logged_out: "Sesión expirada",
    },
    input: {
      ...es.ra.input,
      password: {
        toggle_visible: "ver",
        toggle_hidden: "Ocultar",
      },
    },
    sort: {
      ...es.ra.sort,
      DESC: "Descendente",
      ASC: "Ascendente",
    },
  },
  login: {
    type: "Tipo",
    email: "Correo electronico",
    password: "Contraseña",
    identification: "Identificación",
    register: "Registro exitoso",
  },
  transactions: {
    success:
      "Transferencia exitosa, el estudiante tiene que reclamarlas para abonar las monedas.",
  },
  type: "tipo",
  actions: {
    copy: "Copiado",
  },
  documents: {
    success: "Documentos cargados",
  },
  status: {
    preApproved: "Producto Pre-aprobado",
    denied: "Producto Denegado",
    approve: "Producto Aprobado",
    revert: "Producto cambiado a en estudio",
    disbursement: "Producto desembolsado",
    incompleteDocs: "Producto cambiado a documentos incompletos",
    pay: "Producto marcado como pagado",
  },
  resources: {
    users: {
      name: "usuario",
    },
    roles: {
      name: "rol",
    },
  },
  user: {
    success: "Usuario creado.",
    profileUpdate: "Datos actualizados.",
    passwordUpdate: "Contraseña actualizada.",
  },
  COMPLETED: "Completado",
  PENDING: "Pendiente",
};

export const i18nProvider = polyglotI18nProvider(() => esMessages, "es");
