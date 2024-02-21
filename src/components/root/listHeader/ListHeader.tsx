import { Box, Button } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import {
  CreateButton,
  ExportButton,
  TopToolbar,
  useListContext,
} from "react-admin";
import { Title } from "../Title";
import { SubTitle } from "../SubTitle";
import { CopyButton } from "./CopyButton";
import { FormProvider, useForm } from "react-hook-form";
import { ReactNode } from "react";

interface ListHeaderProps {
  intermediate?: ReactNode;
  inputs?: ReactNode;
  canCopy?: boolean;
  canExport?: boolean;
  canPrint?: boolean;
  canCreate?: boolean;
  title: string;
  subTitle: string;
}

export const ListHeader = ({
  intermediate,
  canCopy = true,
  canExport = true,
  canPrint = true,
  canCreate = true,
  inputs,
  title,
  subTitle,
}: ListHeaderProps) => {
  const { setFilters, filterValues } = useListContext();
  const form = useForm({ defaultValues: filterValues });

  const onSubmit = (values: any) => {
    if (Object.keys(values).length > 0) {
      setFilters(values, null);
    } else {
      setFilters(null, null);
    }
  };

  return (
    <TopToolbar>
      <Box>
        <Box display="flex" alignItems="center" width="100%">
          <Title value={title} />
          {canCreate && (
            <CreateButton
              variant="contained"
              color="secondary"
              size="medium"
              sx={{ marginLeft: "20px" }}
            />
          )}
        </Box>
        <SubTitle value={subTitle} />
      </Box>
      <FormProvider {...form}>
        <Box width="100%">
          {inputs && (
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Box display="flex" gap="10px">
                {inputs}
                <Button
                  variant="outlined"
                  color="primary"
                  type="submit"
                  sx={{ mb: "4px", marginTop: "37px", maxHeight: "35px" }}
                >
                  Buscar
                </Button>
              </Box>
            </form>
          )}
        </Box>
      </FormProvider>
      {intermediate}
      {/* {canPrint && (
        <Button onClick={() => window.print()} startIcon={<PrintIcon />}>
          Imprimir
        </Button>
      )}
      {canCopy && <CopyButton />}
      {canExport && <ExportButton />} */}
    </TopToolbar>
  );
};
