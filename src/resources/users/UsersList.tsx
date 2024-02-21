import { ListHeader } from "@/components/root/listHeader/ListHeader";
import {
  Create,
  Datagrid,
  EditButton,
  FunctionField,
  List,
  SaveButton,
  SimpleForm,
  TextField,
  Toolbar,
  WrapperField,
  minValue,
  required,
  useNotify,
  useRecordContext,
  useRefresh,
} from "react-admin";
import { DateField, NumberInput, TextInput } from "@/components/root";
import { Button, IconButton, Tooltip } from "@mui/material";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { useState } from "react";
import { Dialog } from "@/components/Dialog";
import { Roles } from "../../common/enums";

const InputsFilters = () => {
  return (
    <>
      <TextInput resettable source="name" label="Nombre" fullWidth={false} />
      <TextInput resettable source="email" label="Correo" fullWidth={false} />
      <TextInput
        resettable
        source="identification"
        label="Identificacion"
        fullWidth={false}
      />
    </>
  );
};

const TransferButton = ({ handleClick }: { handleClick: any }) => {
  const record = useRecordContext();

  return (
    <Tooltip title="Transferir" arrow placement="top">
      <IconButton color="primary" onClick={() => handleClick(record)}>
        <CurrencyExchangeIcon />
      </IconButton>
    </Tooltip>
  );
};

const CustomToolBar = ({ onClose }: { onClose: () => void }) => {
  return (
    <Toolbar
      sx={{
        "&.RaToolbar-desktopToolbar": {
          display: "flex",
          gap: "10px",
          justifyContent: "end",
        },
      }}
    >
      <SaveButton
        label="Transferir"
        icon={<CurrencyExchangeIcon />}
        color="secondary"
      />
      <Button variant="outlined" color="error" onClick={onClose}>
        Cancelar
      </Button>
    </Toolbar>
  );
};

const TransferForm = ({
  user,
  handleSubmit,
  handleClose,
}: {
  user: any;
  handleSubmit: any;
  handleClose: any;
}) => {
  const transform = (data: any) => {
    data.toUserId = user.id;
    return data;
  };

  return (
    <Create
      resource="transactions"
      mutationOptions={{ onSuccess: handleSubmit }}
      transform={transform}
      component="div"
    >
      <SimpleForm toolbar={<CustomToolBar onClose={handleClose} />}>
        <NumberInput
          source="coins"
          label="monedas"
          validate={[minValue(1), required()]}
          min={1}
        />
        <TextInput
          source="toUserId"
          label="Transferir a:"
          defaultValue={user?.name}
          disabled
        />
      </SimpleForm>
    </Create>
  );
};

export const UsersList = () => {
  const [user, setUser] = useState<any>(null);
  const [open, setOpen] = useState<boolean>(false);
  const notify = useNotify();
  const refresh = useRefresh();

  const handleClick = (user: any) => {
    setUser(user), setOpen(true);
  };

  const handleClose = () => {
    setUser(null), setOpen(false);
  };

  const handleSubmit = () => {
    setUser(null), setOpen(false);
    notify("transactions.success", { type: "success" });
    refresh();
  };

  return (
    <List
      empty={false}
      filter={{ role: Roles.STUDENT }}
      actions={
        <ListHeader
          inputs={<InputsFilters />}
          title="Estudiantes"
          subTitle="Listado de Estudiantes"
          canCreate={false}
        />
      }
    >
      <Datagrid>
        <TextField source="id" />
        <TextField source="name" label="Nombre" />
        <TextField source="identification" label="Identificacion" />
        <TextField source="email" label="Correo" />
        <FunctionField
          source="coins"
          label="Monedas"
          render={(record: any) =>
            Number(record.coins) + Number(record.pendingCoins)
          }
        />
        <DateField source="createdAt" label="Fecha creación" />
        <WrapperField label="Opciones">
          <TransferButton handleClick={handleClick} />
          <EditButton />
        </WrapperField>
      </Datagrid>
      <Dialog
        title="Transferir Monedas"
        labelAction="Transferir"
        open={open}
        content={
          <TransferForm
            user={user}
            handleSubmit={handleSubmit}
            handleClose={handleClose}
          />
        }
        hasContinue={false}
        handleClose={handleClose}
      />
    </List>
  );
};
