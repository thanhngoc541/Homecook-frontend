import React, { useState } from "react";
import { Nav, Navbar, NavItem, Collapse, NavbarToggler } from "reactstrap";
import { NavLink } from "react-router-dom";

const links = [
  {
    id: 1,
    url: "/home",
    text: "Home",
    icon: "fa fa-home",
  },
  {
    id: 2,
    url: "/menu",
    text: "Menu",
    icon: "fa fa-cutlery",
  },
  {
    id: 3,
    url: "/order",
    text: "Order",
    icon: "fa fa-shopping-cart",
  },
  {
    id: 4,
    url: "/setting",
    text: "Setting",
    icon: "fa fa-sliders",
  },
  {
    id: 5,
    url: "login",
    text: "Login",
    icon: "fa fa-sign-in",
  },
];

function SideBar(props) {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Navbar light className="sidebar-nav-menu">
        <NavbarToggler className="px-2" onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="sidebar-nav-menu-items" navbar>
            {links.map((link) => {
              const { id, url, text, icon } = link;
              return (
                <NavItem key={id} className="sidebar-nav-text">
                  <NavLink className="nav-link px-3" to={url}>
                    <i className={`${icon} fa-lg mx-1`} aria-hidden="true"></i>
                    <span className="">{text}</span>
                  </NavLink>
                </NavItem>
              );
            })}
          </Nav>
        </Collapse>
      </Navbar>
    </>
  );
}
export default SideBar;
