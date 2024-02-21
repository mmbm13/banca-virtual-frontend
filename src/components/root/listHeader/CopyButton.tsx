import { Button } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useListContext, useNotify } from "react-admin";

export const CopyButton = () => {
  const { data, total } = useListContext();
  const notify = useNotify();

  const onCLick = () => {
    let csvText = Object.keys(data[0]).join(",") + "\n";
    csvText += data
      .map((line) =>
        Object.values(line)
          .map((value) => (typeof value !== "object" ? value : "-"))
          .join(",")
      )
      .join("\n");
    navigator.clipboard.writeText(csvText);
    notify("actions.copy", { type: "success" });
  };

  return (
    <Button
      onClick={onCLick}
      disabled={total === 0}
      startIcon={<ContentCopyIcon />}
    >
      Copiar
    </Button>
  );
};
