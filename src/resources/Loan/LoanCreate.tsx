import { Dispatch, SetStateAction } from "react";
import {
  Box,
  Divider,
  IconButton,
  Paper,
  Slider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import AddIcon from "@mui/icons-material/AddCircle";
import RemoveIcon from "@mui/icons-material/RemoveCircle";
import { NumberFormatValues } from "react-number-format";
import {
  MAX_MONEY,
  MAX_MONTH,
  MIN_MONEY,
  MIN_MONTH,
  toCurrencyString,
} from "../../common";
import { NumericFormat } from "@/components/NumericFormat";

const marksMoney = [
  {
    value: MIN_MONEY,
    label: toCurrencyString(MIN_MONEY),
  },
  {
    value: MAX_MONEY,
    label: toCurrencyString(MAX_MONEY),
  },
];

const marksMonth = [
  {
    value: MIN_MONTH,
    label: `${MIN_MONTH} mes`,
  },
  {
    value: MAX_MONTH,
    label: `${MAX_MONTH} meses`,
  },
];

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    "& td": {
      fontSize: "1.1rem",
    },
  },

  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export function LoanCreate({ values, setValues }: ICreateLoan) {
  const handleChange = (event: Event, newValue: number | number[]) => {
    const target = event.target as HTMLInputElement;
    setValues({ ...values, [target.name]: newValue });
  };

  const handleChangeMoney = (operation: "ADD" | "SUBSTRAC") => {
    let value =
      operation === "ADD" ? values.amount + 1000 : values.amount - 1000;
    if (value > MAX_MONEY) {
      value = MAX_MONEY;
    } else if (value < MIN_MONEY) {
      value = MIN_MONEY;
    }
    setValues({ ...values, amount: value });
  };

  const handleChangeMonth = (operation: "ADD" | "SUBSTRAC") => {
    let value =
      operation === "ADD" ? values.paymentTime + 1 : values.paymentTime - 1;
    if (value > MAX_MONTH) {
      value = MAX_MONTH;
    } else if (value < MIN_MONTH) {
      value = MIN_MONTH;
    }
    setValues({ ...values, paymentTime: value });
  };

  const handleInput = (event: NumberFormatValues) => {
    setValues({ ...values, amount: event.floatValue || MIN_MONEY });
  };

  return (
    <Box>
      <Box display="flex" alignItems="center">
        <Typography marginRight="auto" variant="h6">
          ¿Cuánto dinero necesitas?
        </Typography>
        <NumericFormat
          isAllowed={(values) => {
            const { floatValue } = values;
            return (floatValue || 0) <= MAX_MONEY;
          }}
          value={values.amount}
          sx={{ maxWidth: "150px" }}
          InputProps={{ sx: { fontWeight: "bolder", fontSize: "1.25rem" } }}
          onValueChange={handleInput}
        />
      </Box>
      <Box display="flex" gap="15px" alignItems="baseline">
        <IconButton
          aria-label="Menos"
          color="secondary"
          onClick={() => handleChangeMoney("SUBSTRAC")}
        >
          <RemoveIcon sx={{ fontSize: "40px" }} />
        </IconButton>
        <Slider
          sx={{
            maxWidth: "70%",
            margin: "auto",
          }}
          name="amount"
          color="secondary"
          min={MIN_MONEY}
          max={MAX_MONEY}
          step={10000}
          value={values.amount}
          marks={marksMoney}
          onChange={handleChange}
        />
        <IconButton
          aria-label="Mas"
          color="secondary"
          onClick={() => handleChangeMoney("ADD")}
        >
          <AddIcon sx={{ fontSize: "40px" }} />
        </IconButton>
      </Box>

      <Divider sx={{ margin: "40px 0px 20px" }} />

      <Box display="flex" alignItems="center">
        <Typography marginRight="auto" variant="h6">
          ¿En cuánto tiempo puedes pagarlo?
        </Typography>
        <Typography fontWeight="Bold" variant="h6">
          {values.paymentTime} {values.paymentTime === 1 ? "mes" : "meses"}
        </Typography>
      </Box>

      <Box display="flex" gap="15px" alignItems="baseline">
        <IconButton
          aria-label="Menos"
          color="secondary"
          onClick={() => handleChangeMonth("SUBSTRAC")}
        >
          <RemoveIcon sx={{ fontSize: "40px" }} />
        </IconButton>
        <Slider
          sx={{
            maxWidth: "70%",
            margin: "auto",
          }}
          name="paymentTime"
          color="secondary"
          min={MIN_MONTH}
          max={MAX_MONTH}
          step={1}
          value={values.paymentTime}
          marks={marksMonth}
          onChange={handleChange}
        />
        <IconButton
          aria-label="Mas"
          color="secondary"
          onClick={() => handleChangeMonth("ADD")}
        >
          <AddIcon sx={{ fontSize: "40px" }} />
        </IconButton>
      </Box>

      <TableContainer component={Paper} sx={{ marginTop: "30px" }}>
        <Table aria-label="customized table">
          <TableBody>
            <StyledTableRow>
              <TableCell>Monto solicitado</TableCell>
              <TableCell align="right">
                {toCurrencyString(values.amount)}
              </TableCell>
            </StyledTableRow>
            <StyledTableRow>
              <TableCell>Intereses</TableCell>
              <TableCell align="right">{toCurrencyString(0)}</TableCell>
            </StyledTableRow>
            <StyledTableRow>
              <TableCell>Iva</TableCell>
              <TableCell align="right">{toCurrencyString(0)}</TableCell>
            </StyledTableRow>
            <StyledTableRow>
              <TableCell>Gastos de cobranza</TableCell>
              <TableCell align="right">{toCurrencyString(0)}</TableCell>
            </StyledTableRow>
            <StyledTableRow>
              <TableCell>Valor de cada cuota (1)</TableCell>
              <TableCell align="right">
                {toCurrencyString(values.amount / values.paymentTime)}
              </TableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

interface ICreateLoan {
  values: {
    amount: number;
    paymentTime: number;
  };
  setValues: Dispatch<
    SetStateAction<{
      amount: number;
      paymentTime: number;
    }>
  >;
}
