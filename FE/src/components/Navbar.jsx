// import { useState } from "react";
// import { href } from "react-router-dom";
import Links from "./Links";

const Navbar = () => {
  // const [activeLink, setActiveLink] = useState("/");

  return (
    <div className="flex justify-center bg-purple-200 p-4 gap-4">
      <Links href="/" >
        Home
      </Links>
      <Links href="/login" >
        login
      </Links>
      <Links href="/register" >
        Register
      </Links>
      <Links href="/services" >
        Services
      </Links>
    </div>
  );
}
export default Navbar;
