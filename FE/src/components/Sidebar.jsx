import { Link } from "react-router-dom";
import { DASHBOARD_ROUTES } from "../constants/router/DashboardRoute";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 h-screen p-4">
      <div className="text-white text-xl font-bold mb-6">Dashboard Menu</div>
      <nav>
        {DASHBOARD_ROUTES.map((route) => (
          <Link
            key={route.path}
            to={`/dashboard/${route.path}`}
            className="block text-gray-300 hover:text-white py-2 px-4 rounded hover:bg-gray-700"
          >
            {route.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;