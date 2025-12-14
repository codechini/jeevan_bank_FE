import { NavLink } from "react-router-dom";

// Example for a standard <a> tag link
const Links = ({ href, children, isActive = false }) => {
  const baseClasses =
    "inline-block px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ease-in-out";

  const inactiveClasses =
    "bg-purple-200 text-purple-800 hover:bg-purple-100";

  const activeClasses =
    "bg-purple-800 text-white hover:bg-purple-900";

  return (
    <NavLink
      to={href}
      // className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
      className={({ isActive }) =>
        `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
      }
    >
      {children}
    </NavLink>
  );
};

export default Links;