import { useMediaQuery } from "@mui/material";
import { Menu, usePermissions, useSidebarState } from "react-admin";
import LabelIcon from "@mui/icons-material/Label";
import { useEffect } from "react";
import { Roles } from "../../common/enums";

export const MyMenu = () => {
  const { permissions } = usePermissions();
  const [open, setOpen] = useSidebarState();
  const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down("sm"), {
    noSsr: true,
  });

  useEffect(() => {
    if (!isSmall && !open) {
      setOpen(true);
    }
  }, [isSmall, open, setOpen]);

  return (
    <Menu>
      <Menu.DashboardItem />
      {permissions === Roles.TEACHER && (
        <Menu.Item
          to="/users"
          primaryText="Estudiantes"
          leftIcon={<LabelIcon />}
        />
      )}
      <Menu.Item
        to="/transactions"
        primaryText="Transacciones"
        leftIcon={<LabelIcon />}
      />
    </Menu>
  );
};
