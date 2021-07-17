import React from "react";
import { Link } from "react-router-dom";

function SidebarHome() {
  return (
    
      <nav className="SidebarHome-nav-menu sticky">
        <ul className="SidebarHome-nav-menu-items">
          <li key={123} className="SidebarHome-nav-text">
            <Link to="/menus">All Menu</Link>
          </li>
          <li key={123} className="SidebarHome-nav-text">
            <Link to="/dishes">All Dishes</Link>
          </li>
        </ul>
      </nav>
    
  );
}

export default SidebarHome;
