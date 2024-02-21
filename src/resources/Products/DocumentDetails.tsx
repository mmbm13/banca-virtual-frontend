import { Box, Divider, Theme, Typography } from "@mui/material";
import { Column } from "./Column";
import { ViewButton } from "./ViewButton";
import { useRecordContext } from "react-admin";
import { CollapseCard } from "@/components/CollapseCard";

export const DocumentDetails = () => {
  const record = useRecordContext();

  if (Object.keys(record.userDocuments).length === 0) {
    return null;
  }

  return (
    <CollapseCard title="Documentos del solicitante" sx={{ marginTop: "15px" }}>
      <Box
        sx={{
          "& > :nth-of-type(even)": {
            backgroundColor: (theme: Theme) => theme.palette.action.hover,
          },
        }}
      >
        <Column
          sx={{ padding: "3px 10px", gridTemplateColumns: "1fr 1fr 1fr" }}
        >
          <Typography
            component="span"
            sx={{ width: "50%", display: "inline-block" }}
            color="GrayText"
          >
            Documentos legales
          </Typography>
          <Typography component="span" color="GrayText">
            Ver
          </Typography>
          <Typography component="span" color="GrayText">
            Documento técnico
          </Typography>
        </Column>
        <Column
          title="Pagare y Carta de instrucciones"
          sx={{ gridTemplateColumns: "1fr 1fr 1fr" }}
        >
          <ViewButton url={record.legalDocuments?.support?.src} />
          <ViewButton url="/pdfDocs/pagare_carta.pdf" />
        </Column>
        <Divider sx={{ margin: "20px 0" }} />
        <Column sx={{ padding: "3px 10px", gridTemplateColumns: "2fr 1fr" }}>
          <Typography
            component="span"
            sx={{ width: "50%", display: "inline-block" }}
            color="GrayText"
          >
            Documentos personales
          </Typography>
          <Typography component="span" color="GrayText">
            Ver
          </Typography>
        </Column>
        <Column sx={{ gridTemplateColumns: "2fr 1fr" }}>
          <Box>
            <Typography>
              Cédula de ciudadanía del estudiante o del codeudor si es
              desempleado
            </Typography>
          </Box>
          <ViewButton url={record.userDocuments?.identification?.src} />
        </Column>
        <Column sx={{ gridTemplateColumns: "2fr 1fr" }}>
          <Box>
            <Typography>
              <b>Empleado</b>: Adjuntar carta laboral no superior a 30 días
              (debe especificar cargo, tipo de contrato y salario).
            </Typography>
            <Typography>
              <b>Independiente:</b> Adjuntar certificado de ingresos firmado por
              un contador o comerciante.
            </Typography>
          </Box>
          <ViewButton url={record.userDocuments?.labor?.src} />
        </Column>
        <Column sx={{ gridTemplateColumns: "2fr 1fr" }}>
          <Box>
            <Typography>
              <b>Empleado</b>: Adjuntar colillas de pago o comprobantes de
              nómina de los dos últimos meses. <br />
            </Typography>
            <Typography>
              <b>Independiente:</b> Adjuntar tarjeta profesional del contador.{" "}
            </Typography>
            <Typography sx={{ marginTop: "10px" }}>
              Si recibe ingresos por arrendamientos, anexar el contrato de
              arrendamiento o extracto bancario en donde se visualice mes a mes
              el ingreso
            </Typography>
          </Box>
          <ViewButton url={record.userDocuments?.support?.src} />
        </Column>
      </Box>
    </CollapseCard>
  );
};
