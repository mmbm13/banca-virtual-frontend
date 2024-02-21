import { Layout } from "react-admin";
import { palette } from "../../theme/palette";
import { MySideBar } from "./MySideBar";
import { MyMenu } from "./MyMenu";
import { MyAppBar } from "./MyAppBar";

export const MyLayout = (props: any) => (
  <Layout
    {...props}
    appBarAlwaysOn
    sx={{
      "& .RaLayout-content": {
        padding: { sm: "20px 40px 0px", xs: "10px 5px" },
        backgroundColor: palette.common.gray,
        overflow: "auto",
      },
    }}
    appBar={MyAppBar}
    menu={MyMenu}
    sidebar={MySideBar}
  />
);
