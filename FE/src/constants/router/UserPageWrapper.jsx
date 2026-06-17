import ProtectedRoute from "./ProtectedRoute";

const UserPageWrapper = ({ children }) => (
  <ProtectedRoute>{children}</ProtectedRoute>
);

export default UserPageWrapper;
