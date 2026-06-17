import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Links from "./Links";

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  const links = (
    <>
      <Links href="/">Home</Links>
      <Links href="/login">login</Links>
      <Links href="/register">Register</Links>
      <Links href="/services">Services</Links>
      {isAuthenticated && <Links href="/profile">Profile</Links>}
    </>
  );

  return (
    <nav className="bg-purple-200">
      <div className="hidden md:flex justify-center p-4 gap-4">
        {links}
      </div>

      <div className="md:hidden flex items-center justify-between p-4">
        <span className="text-sm font-semibold text-purple-800">
          Jeevan Bank
        </span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-purple-800 text-xl"
          aria-label="Toggle menu"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {isOpen && (
        <div
          className="md:hidden flex flex-col items-center gap-2 pb-4"
          onClick={closeMenu}
        >
          {links}
        </div>
      )}
    </nav>
  );
}
export default Navbar;
