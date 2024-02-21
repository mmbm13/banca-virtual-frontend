import { useCallback } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormGroup, { FormGroupProps } from "@mui/material/FormGroup";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { FieldTitle, useInput } from "ra-core";

import { Checkbox } from "@mui/material";
import {
  sanitizeInputRestProps,
  InputPropTypes,
  InputHelperText,
  CommonInputProps,
} from "react-admin";

export const CheckBoxInput = (props: BooleanInputProps) => {
  const {
    className,
    row = false,
    defaultValue = false,
    format,
    label,
    helperText,
    onBlur,
    onChange,
    onFocus,
    disabled,
    parse,
    resource,
    source,
    validate,
    options = defaultOptions,
    sx,
    ...rest
  } = props;
  const {
    id,
    field,
    isRequired,
    fieldState: { error, invalid, isTouched },
    formState: { isSubmitted },
  } = useInput({
    defaultValue,
    format,
    parse,
    resource,
    source,
    onBlur,
    onChange,
    type: "checkbox",
    validate,
    ...rest,
  });

  const handleChange = useCallback(
    (event: any) => {
      field.onChange(event);
      // Ensure field is considered as touched
      field.onBlur();
    },
    [field]
  );

  const renderHelperText =
    helperText !== false || ((isTouched || isSubmitted) && invalid);

  return (
    <FormGroup
      className={clsx("ra-input", `ra-input-${source}`, className)}
      row={row}
      sx={sx}
    >
      <FormControlLabel
        inputRef={field.ref}
        control={
          <Checkbox
            id={id}
            name={field.name}
            onChange={handleChange}
            onFocus={onFocus}
            checked={Boolean(field.value)}
            {...sanitizeInputRestProps(rest)}
            {...options}
            disabled={disabled}
          />
        }
        label={
          <FieldTitle
            label={label}
            source={source}
            resource={resource}
            isRequired={isRequired}
          />
        }
      />
      {renderHelperText ? (
        <FormHelperText error={(isTouched || isSubmitted) && invalid}>
          <InputHelperText
            touched={isTouched || isSubmitted}
            error={error?.message}
            helperText={helperText}
          />
        </FormHelperText>
      ) : null}
    </FormGroup>
  );
};

CheckBoxInput.propTypes = {
  ...InputPropTypes,
  // @ts-ignore
  options: PropTypes.shape(Switch.propTypes),
  disabled: PropTypes.bool,
};

export type BooleanInputProps = CommonInputProps &
  SwitchProps &
  Omit<FormGroupProps, "defaultValue" | "onChange" | "onBlur" | "onFocus"> & {
    options?: SwitchProps;
  };

const defaultOptions = {};
