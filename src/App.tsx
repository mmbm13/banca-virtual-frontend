import { Admin, CustomRoutes, Resource } from "react-admin";
import { BrowserRouter, Route } from "react-router-dom";
import { myTheme } from "./theme/theme";
import { MyLayout } from "./components/layout/Layout";
import authProvider from "./providers/authProvider";
import dataProvider from "./providers/dataProvider";
import queryClient from "./queryClient";
import { i18nProvider } from "./providers/i18nProvider";
import MyLoginPage from "./components/auth/MyLoginPage";
import { ProfilePage } from "./resources/customRoutes/ProfilePage";
import {
  TransactionsCreate,
  TransactionsEdit,
  TransactionsList,
} from "./resources/Transactions";
import { UsersEdit, UsersList } from "./resources/users";
import { Register } from "./resources/Loan";
import { ProductList, ProductShow } from "./resources/Products";
import { AuthRegister } from "./components/auth/Register";
import { Roles } from "./common/enums";
import { DashBoard } from "./resources/DashBoard/DashBoard";
import "./index.css";

export const App = () => (
  <BrowserRouter>
    <Admin
      theme={myTheme}
      title="ESumer"
      requireAuth
      layout={MyLayout}
      dashboard={DashBoard}
      loginPage={MyLoginPage}
      authProvider={authProvider}
      dataProvider={dataProvider}
      i18nProvider={i18nProvider}
      queryClient={queryClient}
    >
      {(permissions: string) => (
        <>
          {permissions === Roles.TEACHER ? (
            <Resource
              name="products"
              create={Register}
              list={ProductList}
              edit={ProductShow}
            />
          ) : null}
          {permissions === Roles.TEACHER ? (
            <Resource name="users" list={UsersList} edit={UsersEdit} />
          ) : null}
          <Resource
            name="transactions"
            list={TransactionsList}
            create={TransactionsCreate}
            edit={TransactionsEdit}
          />
          <CustomRoutes>
            <Route path="/profile" element={<ProfilePage />} />
          </CustomRoutes>
          <CustomRoutes noLayout>
            <Route path="/register" element={<AuthRegister />} />
          </CustomRoutes>
        </>
      )}
    </Admin>
  </BrowserRouter>
);
