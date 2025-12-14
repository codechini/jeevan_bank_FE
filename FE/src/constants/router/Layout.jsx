import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";

const Layout = () => (
  <>
    <Navbar />
    <main>
      <Outlet />
    </main>
  </>
);

export default Layout;