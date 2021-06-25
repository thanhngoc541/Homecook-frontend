import React, { useState } from "react";
import {
  Nav,
  Navbar,
  NavItem,
  Collapse,
  NavbarToggler,
  NavbarBrand,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "./context";

const links = [
  {
    id: "link1",
    url: "/home",
    text: "Home",
    icon: "fa fa-home",
  },
  {
    id: "link2",
    url: "/menu",
    text: "Menu",
    icon: "fa fa-cutlery",
  },
  {
    id: "link3",
    url: "/order",
    text: "Order",
    icon: "fa fa-shopping-cart",
  },
  {
    id: "link4",
    url: "/setting",
    text: "Setting",
    icon: "fa fa-sliders",
  },
  {
    id: "link5",
    url: "login",
    text: "Login",
    icon: "fa fa-sign-in",
  },
];

function NavBar(props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const { amount, toggleCart } = useGlobalContext();
  return (
    <>
      <Navbar dark expand="md" className="bg-dark sticky-top">
        <div className="container">
          <NavbarToggler className="px-2" onClick={toggle} />
          <NavbarBrand className="mr-auto" href="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/f/fb/Vegan_logo.svg"
              height="30"
              width="41"
              alt="Vegan logo"
            />
          </NavbarBrand>
          <Collapse isOpen={isOpen} navbar>
            <Nav className="" navbar>
              {links.map((link) => {
                const { id, url, text, icon } = link;
                return (
                  <NavItem key={id} className="">
                    <NavLink className="nav-link px-3" to={url}>
                      <i
                        className={`${icon} fa-lg mx-1`}
                        aria-hidden="true"
                      ></i>
                      <span className="">{text}</span>
                    </NavLink>
                  </NavItem>
                );
              })}
            </Nav>
            <Nav className="ml-auto">
              <NavItem className="nav-container-cart">
                <button type="button" className="cart-btn" onClick={toggleCart}>
                  <i
                    className="fa fa-shopping-bag fa-lg"
                    aria-hidden="true"
                  ></i>
                  <div className="amount-container">
                    <p className="total-amount">{amount}</p>
                  </div>
                </button>
              </NavItem>
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    </>
  );
}
export default NavBar;
