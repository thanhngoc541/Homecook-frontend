import React, { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarToggler, Nav, Collapse, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from "reactstrap";
//----------------------------------
const StatusBar = ({ statuses, filterOrders }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [filterState, setFilterState] = useState('All');
    return (
        <div className="container-status statusbar">
            <div className="menu">
                <ul className="main-menu">
                    {statuses.map((status, index) => {
                        return (
                            <li key={index} className="fa col-12 col-lg-6"><span onClick={() => {filterOrders(status); setFilterState(status)}}>{status}</span></li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};
export default StatusBar;
