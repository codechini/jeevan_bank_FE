import Dashboard from "../../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";

const DashboardWrapper = () => (
  <ProtectedRoute requireAdmin>
    <Dashboard />
  </ProtectedRoute>
);

export default DashboardWrapper;