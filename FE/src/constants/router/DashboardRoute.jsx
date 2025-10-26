// import UserCount from "../../components/UserCount";
import UpdateUser from "../../components/UpdateUser";
import ViewUser from "../../components/ViewUser";
import DashboardCreateUser from "../../pages/DashboardCreateUser";
import DashboardHome from "../../pages/DashboardHome";
import DashboardSearchUsers from "../../pages/DashboardSearchUsers";

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
  }
];