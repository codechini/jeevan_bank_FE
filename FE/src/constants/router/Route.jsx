import Dashboard from "../../pages/Dashboard";
import Home from "../../pages/Home";
import LoginPage from "../../pages/LoginPage";

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
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
];
