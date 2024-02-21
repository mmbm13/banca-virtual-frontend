import {
  FileInput as MuiFileInput,
  FileInputProps,
  FileField,
} from "react-admin";

export const FileInput = (props: FileInputProps) => {
  return (
    <MuiFileInput
      helperText={false}
      placeholder={
        <p>Arrastre un archivo o presione aquí para seleccionarlo.</p>
      }
      accept="application/pdf, image/jpeg"
      {...props}
      sx={{
        "& .RaFileInput-dropZone": {
          border: "1px dashed",
        },
        ...props.sx,
      }}
    >
      <FileField source="src" title="title" target="_blank" />
    </MuiFileInput>
  );
};
