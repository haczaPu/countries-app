import React from "react";
import { FaMoon, FaRegMoon } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = ({ handleToggleTheme, darkMode }) => {
  return (
    <header>
      <Link to={`/`} style={{ textDecoration: "none" }}>
        <div className="title">Where in the world?</div>
      </Link>
      <div className="theme-toggler">
        {darkMode === "light" ? <FaRegMoon size={14} /> : <FaMoon size={14} />}
        <div onClick={handleToggleTheme}>Dark Mode</div>
      </div>
    </header>
  );
};

export default Header;
