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

function NavBar(props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { amount, toggleCart } = useGlobalContext();
  const userData = JSON.parse(sessionStorage.getItem("user"));

  // console.log(userData);

  let Role;
  if (userData != null) {
    Role = userData["Role"];
  }
  //TODO: classify nav item based on role
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
              {/* Only customer can access home */}
              {Role === "customer" && (
                <NavItem key="homepage" className="">
                  <NavLink className="nav-link px-3" to="/home">
                    <i className="fa fa-home fa-lg mx-1" aria-hidden="true"></i>
                    <span className="">Home</span>
                  </NavLink>
                </NavItem>
              )}
              {/* Only homecook can access homecook page */}
              {Role === "homecook" && (
                <NavItem key="homecookpage" className="">
                  <NavLink
                    className="nav-link px-3"
                    to="/homecook/6ABE8D62-72D2-4F13-B790-C35EA529365B"
                  >
                    <i
                      className="fa fa-cutlery fa-lg mx-1"
                      aria-hidden="true"
                    ></i>
                    <span className="">HomeCook Page</span>
                  </NavLink>
                </NavItem>
              )}
              {/* Homecook and customer both share Order Page */}
              {(Role === "homecook" || Role === "customer") && (
                <NavItem key="orderpage" className="">
                  <NavLink className="nav-link px-3" to="/order">
                    <i
                      className="fa fa-shopping-cart fa-lg mx-1"
                      aria-hidden="true"
                    ></i>
                    <span className="">Order</span>
                  </NavLink>
                </NavItem>
              )}
              {/* Only if user doesn't not log in that has Sign in button */}
              {!!userData === false ? (
                <NavItem key="sigin" className="">
                  <NavLink className="nav-link px-3" to="/login">
                    <i
                      className="fa fa-sign-in fa-lg mx-1"
                      aria-hidden="true"
                    ></i>
                    <span className="">Sign in</span>
                  </NavLink>
                </NavItem>
              ) : (
                <NavItem key="signout" className="">
                  <NavLink
                    className="nav-link px-3"
                    to="/login"
                    onClick={() => sessionStorage.removeItem("user")}
                  >
                    <i
                      className="fa fa-sign-in fa-lg mx-1"
                      aria-hidden="true"
                    ></i>
                    <span className="">Sign out</span>
                  </NavLink>
                </NavItem>
              )}
            </Nav>
            <Nav className="ml-auto">
              {/* Only customer has Cart */}
              {Role !== "admin" && Role !== "homecook" && (
                <NavItem className="nav-container-cart">
                  <button
                    type="button"
                    className="cart-btn"
                    onClick={toggleCart}
                  >
                    <i
                      className="fa fa-shopping-bag fa-lg"
                      aria-hidden="true"
                    ></i>
                    <div className="amount-container">
                      <p className="total-amount">{amount}</p>
                    </div>
                  </button>
                </NavItem>
              )}
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    </>
  );
}
export default NavBar;
