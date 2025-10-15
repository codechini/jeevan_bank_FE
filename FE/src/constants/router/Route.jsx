import UserCount from "../../components/UserCount";
import ViewUser from "../../components/ViewUser";
import Dashboard from "../../pages/Dashboard";
import Home from "../../pages/Home";
import LoginPage from "../../pages/LoginPage";
import RegistrationPage from "../../pages/RegistrationPage";

export const ROUTES = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegistrationPage />,
  },
  {
    path: "/dashboard/*",
    element: <Dashboard />,
  },
  // {
  //   path: "/dashboard/users",
  //   element: <ViewUser />,
  // }
];
