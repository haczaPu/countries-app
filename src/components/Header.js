import React from "react";
import { FaMoon } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to={`/`} style={{ textDecoration: "none" }}>
        <div className="title">Where in the world?</div>
      </Link>
      <div className="theme-toggler">
        <FaMoon size={14} />
        <div>Dark Mode</div>
      </div>
    </header>
  );
};

export default Header;
