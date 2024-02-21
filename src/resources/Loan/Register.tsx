import {
  Create,
  SimpleForm,
  useDataProvider,
  useNotify,
  useRedirect,
} from "react-admin";
import { IStep, Stepper } from "../../components/Stepper";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { Step4 } from "./Step4";
import { LoanCreate } from "./LoanCreate";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { DataProviderWithCustomMethods } from "providers/dataProvider";

const CompleteMessage = () => {
  return (
    <Box>
      <Typography variant="h4">
        Tu solicitud de crédito esta en proceso
      </Typography>
      <Typography marginTop="15px" textAlign="justify">
        ¡Enhorabuena! tu crédito en linea está en proceso, en pocos minutos
        recibirás en tu correo electrónico información sobre tu solicitud. Si
        nuestro email no llega a tu bandeja principal, busca en spam y luego
        mueve el correo a tu bandeja de entrada principal.
      </Typography>
    </Box>
  );
};

const CreateStepper = ({ hasDetails }: { hasDetails: boolean }) => {
  const [values, setValues] = useState({ amount: 50000, paymentTime: 1 });
  const redirect = useRedirect();
  const { getValues } = useFormContext();
  const notify = useNotify();
  const dataProvider = useDataProvider<DataProviderWithCustomMethods>();

  const handleReset = () => {
    redirect("/products");
  };

  const steps: IStep[] = [
    {
      label: "Datos Personales",
      title: "Información personal",
      subTitle: "Ingresa la información según el documento de identificación",
      component: <Step1 />,
    },
    {
      label: "Datos Básicos",
      title: "Información personal",
      subTitle: "Ingresa la información de tu entorno personal",
      component: <Step2 />,
    },
    {
      label: "Datos adicionales",
      title: "Información laboral y financiera",
      subTitle: "Ingresa la información de tu situación económica y laboral",
      component: <Step3 />,
    },
    {
      label: "Referencias",
      title: "Referencias personales y/o familiares",
      subTitle: "Ingresa la información de tus referencias",
      customLabelNext: "Actualizar",
      customNext: async () => {
        try {
          const values = getValues();
          delete values.id;
          delete values.userId;
          delete values.productsCount;
          delete values.email;
          delete values.phone;
          delete values.identification;
          delete values.typeIdentification;
          delete values.firstName;
          delete values.lastName;
          await dataProvider.httpFetch(`students/details`, {
            method: hasDetails ? "PUT" : "POST",
            body: JSON.stringify(values),
          });
        } catch (error: any) {
          notify(error.message, {
            type: "error",
            messageArgs: { _: error.message },
          });
          throw error;
        }
      },
      component: <Step4 />,
    },
    {
      label: "Valor",
      title: "Valor de la financiación",
      subTitle: "Ingresa el valor y plazo de financiación",
      component: <LoanCreate values={values} setValues={setValues} />,
      customNext: async () => {
        try {
          await dataProvider.httpFetch(`products`, {
            method: "POST",
            body: JSON.stringify({ ...values, type: "Esumer 1" }),
          });
        } catch (error: any) {
          notify(error.message, {
            type: "error",
            messageArgs: { _: error.message },
          });
          throw error;
        }
      },
      disableBack: true,
      customLabelNext: "Solicita tu financiación de matrícula",
      boxButtonProps: {
        sx: { margin: "auto", mt: "30px" },
      },
      buttonProps: {
        color: "secondary",
        variant: "contained",
        sx: { fontWeight: "bolder" },
      },
    },
  ];

  return (
    <Stepper
      steps={steps}
      completed={<CompleteMessage />}
      shouldValidateForm={false}
      handleReset={handleReset}
    />
  );
};

export function Register() {
  const [data, setData] = useState({});
  const [hasDetails, setHasDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const notify = useNotify();
  const dataProvider = useDataProvider<DataProviderWithCustomMethods>();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const dataRequest = await dataProvider.httpFetch("students/details", {
        method: "GET",
      });
      const dataJson = dataRequest.json;
      delete dataJson?.personalInformation?.acceptedTermsAndConditions;
      if (Object.keys(dataJson).length > 5) {
        setHasDetails(true);
      }
      setData(dataJson);
    } catch (error: any) {
      notify(error.message, {
        type: "error",
        messageArgs: { _: error.message },
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) return null;

  return (
    <Create
      resource="products"
      sx={{ "& .RaCreate-card": { backgroundColor: "transparent" } }}
      record={data}
    >
      <SimpleForm toolbar={false}>
        <CreateStepper hasDetails={hasDetails} />
      </SimpleForm>
    </Create>
  );
}
