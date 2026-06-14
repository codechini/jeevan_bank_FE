import AllAccounts from "../../components/AllAccounts";
import AllCards from "../../components/AllCards";
import AllChequeBooks from "../../components/AllChequeBooks";
import AllLoans from "../../components/AllLoans";
import UpdateUser from "../../components/UpdateUser";
import ViewUser from "../../components/ViewUser";
import DashboardCreateUser from "../../pages/DashboardCreateUser";
import DashboardHome from "../../pages/DashboardHome";
import DashboardSearchUsers from "../../pages/DashboardSearchUsers";
import DashboardUpdateAccount from "../../pages/DashboardUpdateAccount";

export const DASHBOARD_ROUTES = [
  {
    path: "",
    name: "Dashboard Overview",
    element: <DashboardHome />,
  },
  {
    path: "users",
    name: "View Users",
    element: <ViewUser />,
  },
  {
    path: "createusers",
    name: "Create Users",
    element: <DashboardCreateUser />,
  },
  {
    path: "searchusers",
    name: "Search Users",
    element: <DashboardSearchUsers />,
  },
  {
    path: "updateusers",
    name: "Update Users",
    element: <UpdateUser />,
  },
  {
    path: "viewaccounts",
    name: "View Accounts",
    element: <AllAccounts />,
  },
  {
    path: "loans",
    name: "View Loans",
    element: <AllLoans />,
  },
  {
    path: "chequebooks",
    name: "View Cheque Books",
    element: <AllChequeBooks />,
  },
  {
    path: "cards",
    name: "View Cards",
    element: <AllCards />,
  },
  {
    path: "updateaccount",
    name: "SearchAccount",
    element: <DashboardUpdateAccount />,
  },
];