import React, { useState } from "react";
import {
  Nav,
  Navbar,
  NavItem,
  NavbarBrand,
} from "reactstrap";
import { NavLink, Link } from "react-router-dom";
import { useGlobalContext } from "./context";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
}));

function NavBar(props) {
  const { amount, toggleCart } = useGlobalContext();

  const userData = JSON.parse(sessionStorage.getItem("user"));

  const Role = userData?.["Role"];

  console.log(Role);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

  console.log(userData);
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (userData && prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  //TODO: classify nav item based on role
  return (
    <>
      <Navbar dark expand="md" className="bg-dark sticky-top">
        <div className="container">
          <NavbarBrand className="mr-auto" href="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/f/fb/Vegan_logo.svg"
              height="40"
              alt="Vegan logo"
            />
          </NavbarBrand>

          <Nav navbar>
            <NavItem key="appname" className="">
              <NavLink className="nav-link px-3" to="/home">
                <h3 style={{ color: "#67A22A" }}>Vegan For Life</h3>
              </NavLink>
            </NavItem>
          </Nav>
          <Nav className="ml-auto">
            {/* Only customer has Cart */}
            {Role !== "admin" && Role !== "homecook" && (
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
            )}

            {/* Only if user doesn't not log in that has Sign in button */}
            {!!userData === false ? (
              <NavItem key="sigin">
                <NavLink className="nav-link text-white px-3" to="/login">
                  <i
                    className="fa fa-sign-in fa-lg mx-1"
                    aria-hidden="true"
                  ></i>
                  <span className="">Sign in</span>
                </NavLink>
              </NavItem>
            ) : (
              <NavItem key="profile-menu" className="text-white">
                <Button
                  ref={anchorRef}
                  aria-controls={open ? "menu-list-grow" : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src="https://png.pngtree.com/png-clipart/20201223/ourlarge/pngtree-piggy-hand-drawn-cartoon-avatar-png-image_2592041.jpg"
                    className={classes.large}
                  />
                  <strong className="text-white ml-2">
                    {userData.FullName}
                  </strong>
                </Button>
                <Popper
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === "bottom"
                            ? "center top"
                            : "center bottom",
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList
                            autoFocusItem={open}
                            id="menu-list-grow"
                            onKeyDown={handleListKeyDown}
                          >
                            <MenuItem onClick={handleClose}>
                              <Link
                                className="px-3 text-black"
                                to={`/account/${userData.UserID}`}
                              >
                                <AccountCircleIcon />
                                <span className="mx-1">My account</span>
                              </Link>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                              <Link className="px-3 text-black" to="/order">
                                <ShoppingCartIcon />
                                <span className="mx-1">Order</span>
                              </Link>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                              <Link
                                className="px-3 text-black"
                                to="/login"
                                onClick={() =>
                                  sessionStorage.removeItem("user")
                                }
                              >
                                <ExitToAppIcon />
                                <span className="mx-1">Sign out</span>
                              </Link>
                            </MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </NavItem>
            )}
          </Nav>
        </div>
      </Navbar>
    </>
  );
}
export default NavBar;
