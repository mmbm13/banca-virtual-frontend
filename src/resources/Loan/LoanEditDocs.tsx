import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  styled,
} from "@mui/material";
import {
  Edit,
  SaveButton,
  SimpleForm,
  Toolbar,
  required,
  useDataProvider,
  useNotify,
  useRedirect,
} from "react-admin";
import { FileInput } from "@/components/root";
import { toExternalLink, transformFile } from "../../common";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { DataProviderWithCustomMethods } from "../../providers/dataProvider";

const StyledRow = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
  padding: "15px",
  width: "100%",
  display: "flex",
  gap: "15px",
  alignItems: "center",
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "& > p:first-of-type": {
    width: "70%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

const MyToolbar = ({ disabled }: { disabled: boolean }) => (
  <Toolbar>
    <Box sx={{ margin: "auto", textAlign: "center" }}>
      <SaveButton label="Continuar" color="secondary" disabled={disabled} />
    </Box>
  </Toolbar>
);

const ViewButton = ({ url }: { url: string }) => {
  return (
    <Button
      variant="contained"
      sx={{ marginLeft: { sm: "auto" } }}
      onClick={() => toExternalLink(url)}
    >
      Ver
    </Button>
  );
};

export function LoanEditDocs() {
  const [isLoading, setIsLoading] = useState(false);
  const notify = useNotify();
  const redirect = useRedirect();
  const { id } = useParams();
  const dataProvider = useDataProvider<DataProviderWithCustomMethods>();

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    try {
      setIsLoading(true);
      const [identificationFile, laborFile, supportFile] = await Promise.all([
        transformFile(data.userDocuments.identification),
        transformFile(data.userDocuments.labor),
        transformFile(data.userDocuments.support),
      ]);
      formData.append("identification", identificationFile);
      formData.append("labor", laborFile);
      formData.append("support", supportFile);

      await dataProvider.httpFetch(`products/user/documents/${id}`, {
        method: "POST",
        body: formData,
      });
      notify("documents.success", { type: "success" });
      redirect("/products");
    } catch (error: any) {
      notify(error.message, {
        type: "error",
        messageArgs: { _: error.message },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Edit mutationMode="pessimistic">
      <SimpleForm
        toolbar={<MyToolbar disabled={isLoading} />}
        onSubmit={onSubmit}
      >
        <Card>
          <CardHeader title="Documentos adjuntables requeridos" />
          <CardContent>
            <StyledRow>
              <Typography textAlign="justify" variant="body1" lineHeight={1}>
                Adjuntar cédula de ciudadanía del estudiante o codeudor.
              </Typography>
              <FileInput
                sx={{
                  width: "auto",
                  marginLeft: { sm: "auto" },
                  maxWidth: { sm: "30%" },
                }}
                source="userDocuments.identification"
                multiple={false}
                label={false}
                validate={required()}
              />
            </StyledRow>
            <StyledRow>
              <Typography textAlign="justify" variant="body1" lineHeight={1}>
                Los documentos válidos son algunos de los siguientes de acuerdo
                a la situación del estudiante o codeudor:
                <br />
                <br />
                <b>Empleado</b>: Adjuntar carta laboral no superior a 30 días
                (debe especificar cargo, tipo de contrato y salario). <br />
                <br />
                <b>Independiente:</b> Adjuntar certificado de ingresos firmado
                por un contador o comerciante.
              </Typography>
              <FileInput
                sx={{
                  width: "auto",
                  marginLeft: { sm: "auto" },
                  maxWidth: { sm: "30%" },
                }}
                source="userDocuments.labor"
                multiple={false}
                label={false}
                validate={required()}
              />
            </StyledRow>
            <StyledRow>
              <Typography textAlign="justify" variant="body1" lineHeight={1}>
                Los documentos válidos son algunos de los siguientes de acuerdo
                a la situación del estudiante o codeudor:
                <br />
                <br />
                <b>Empleado</b>: Adjuntar colillas de pago o comprobantes de
                nómina de los dos últimos meses. <br />
                <br />
                <b>Independiente:</b> Adjuntar tarjeta profesional del contador.{" "}
                <br />
                <br />
                Si recibe ingresos por arrendamientos, anexar el contrato de
                arrendamiento o extracto bancario en donde se visualice mes a
                mes el ingreso
              </Typography>
              <FileInput
                sx={{
                  width: "auto",
                  marginLeft: { sm: "auto" },
                  maxWidth: { sm: "30%" },
                }}
                source="userDocuments.support"
                multiple={true}
                label={false}
                validate={required()}
              />
            </StyledRow>
          </CardContent>
        </Card>

        <Card sx={{ marginTop: "20px", width: "100%" }}>
          <CardHeader title="Listado de documentos pendientes por aceptar y firmar" />
          <CardContent>
            <Box
              sx={{ display: { xs: "none", sm: "flex" }, padding: "0 15px" }}
              component="p"
            >
              <Typography variant="caption">Documento</Typography>
              <Typography
                sx={{ marginLeft: "auto", marginRight: "10px" }}
                variant="caption"
              >
                Acción
              </Typography>
            </Box>
            <StyledRow>
              <Typography textAlign="justify" variant="body1" lineHeight={1}>
                Carta de instrucciones
              </Typography>
              <ViewButton url="/pdfDocs/cartaInstrucciones.pdf" />
            </StyledRow>
            <StyledRow>
              <Typography textAlign="justify" variant="body1" lineHeight={1}>
                Pagaré
              </Typography>
              <ViewButton url="/pdfDocs/pagare.pdf" />
            </StyledRow>
          </CardContent>
        </Card>
      </SimpleForm>
    </Edit>
  );
}
