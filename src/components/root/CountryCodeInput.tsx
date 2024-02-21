import { countryCodes } from "../../common";
import { AutocompleteInputProps, AutocompleteInput } from "react-admin";

export const CountryOption = (r: any) => {
  const shortenedName =
    r?.record?.name?.length > 20
      ? r?.record?.name?.substring(0, 20) + "..."
      : r?.record?.name;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <img
        src={r?.record?.flag}
        alt={r?.record?.id}
        loading="lazy"
        style={{ height: 40 }}
      />
      <span>
        +{r?.record?.code} {shortenedName}
      </span>
    </div>
  );
};

export const CountryCodeInput = (props: AutocompleteInputProps) => {
  const { label, source, ...rest } = props;

  return (
    <AutocompleteInput
      helperText={false}
      label={label}
      source={source}
      choices={countryCodes}
      optionText={(record) => <CountryOption record={record} />}
      fullWidth
      optionValue="id"
      matchSuggestion={(filterValue, choice) =>
        choice?.name?.toLowerCase().includes(filterValue.toLowerCase()) ||
        ("+" + choice.code.toString()).includes(filterValue.toLowerCase())
      }
      inputText={(r) => `+${r?.code} ${r?.name}`}
      {...rest}
    />
  );
};
