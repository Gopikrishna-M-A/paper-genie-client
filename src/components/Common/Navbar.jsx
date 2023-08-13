import React, { useState } from "react";
import "./navbar.css";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  const toggleNav = () => {
    setIsNavExpanded(!isNavExpanded);
  };
  const closeNav = () => {
    setIsNavExpanded(false);
  };

  return (
    <>
      <nav className={`nav ${isNavExpanded ? "nav--expanded" : ""}`}>
        <div className="nav-left-sec">
        <MenuOutlined className="nav__collapser" onClick={toggleNav} />
        <Link onClick={closeNav} className="nav__brand" to="/">
          Paper Genie
        </Link>
        </div>

        <div className="nav__collapsable">
          <Link onClick={closeNav} to="/Add-question">Add</Link>
          <Link onClick={closeNav} to="/Create-paper">Create</Link>
          <Link onClick={closeNav} to="/view-questions">View</Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
