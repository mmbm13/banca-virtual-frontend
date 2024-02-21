import PropTypes from "prop-types";
import clsx from "clsx";
import { TextFieldProps } from "@mui/material/TextField";
import { useInput, FieldTitle } from "ra-core";
import {
  DatePicker,
  DatePickerProps,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  CommonInputProps,
  InputHelperText,
  sanitizeInputRestProps,
} from "react-admin";
import dayjs, { isDayjs } from "dayjs";

export const DateInput = ({
  className,
  defaultValue,
  fullWidth,
  placeholder = "DD/MM/YYYY",
  views = ["year", "month", "day"],
  format,
  formatDate = "DD/MM/YYYY",
  label,
  name,
  source,
  resource,
  helperText = false,
  onBlur,
  onChange,
  parse,
  validate,
  disabled = false,
  ...rest
}: DateInputProps & DatePickerProps<any> & { formatDate?: string }) => {
  const { field, fieldState, formState, isRequired } = useInput({
    defaultValue,
    name,
    format: format || getDateFromString,
    parse: parse || ((value) => getStringFromDate(value, formatDate)),
    onBlur,
    onChange,
    resource,
    source,
    validate,
    ...rest,
  });
  const { error, invalid, isTouched } = fieldState;
  const { isSubmitted } = formState;
  const renderHelperText =
    helperText !== false || ((isTouched || isSubmitted) && invalid);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        {...field}
        value={field.value || null}
        disableFuture
        className={clsx("ra-input", `ra-input-${source}`, className)}
        views={views}
        format={formatDate}
        slotProps={{
          field: { clearable: true },
          textField: {
            fullWidth,
            disabled: disabled,
            placeholder,
            error: (isTouched || isSubmitted) && invalid,
            helperText: renderHelperText ? (
              <InputHelperText
                touched={isTouched || isSubmitted}
                error={error?.message}
                helperText={helperText}
              />
            ) : null,
          },
        }}
        label={
          <FieldTitle
            label={label}
            source={source}
            resource={resource}
            isRequired={isRequired}
          />
        }
        {...sanitizeInputRestProps(rest)}
      />
    </LocalizationProvider>
  );
};

DateInput.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.element,
  ]),
  resource: PropTypes.string,
  source: PropTypes.string,
};

const convertDateToString = (value: Date) => {
  if (!(value instanceof Date) || isNaN(value.getDate())) return "";
  const pad = "00";
  const yyyy = value.getFullYear().toString();
  const MM = (value.getMonth() + 1).toString();
  const dd = value.getDate().toString();
  return `${yyyy}-${(pad + MM).slice(-2)}-${(pad + dd).slice(-2)}`;
};

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const getStringFromDate = (
  value: string | Date | dayjs.Dayjs,
  format: string
) => {
  // null, undefined and empty string values should not go through dateFormatter
  // otherwise, it returns undefined and will make the input an uncontrolled one.
  if (value == null || value === "") {
    return "";
  }

  if (value instanceof Date) {
    return convertDateToString(value);
  }

  if (isDayjs(value)) {
    return value.format(format.split("/").reverse().join("-"));
  }

  // valid dates should not be converted
  if (dateRegex.test(value)) {
    return value;
  }

  return convertDateToString(new Date(value));
};

const getDateFromString = (value: string) => {
  if (value == null || value === "") {
    return "";
  }
  return dayjs(value);
};

export type DateInputProps = CommonInputProps &
  Omit<TextFieldProps, "helperText" | "label">;
