import { Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { DASHBOARD_ROUTES } from "../constants/router/DashboardRoute";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <div className="p-4">
          {/* <RouterProvider router={dashboardrouter} /> */}

          <Routes>
            {DASHBOARD_ROUTES.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;