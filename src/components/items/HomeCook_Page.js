import React, { useState } from "react";
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import HomeCookHome from "./HomeCook_Home";
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import CustomerList from "../wrappers/CustomerList";
import DishManagement from "../pages/HomeCook_DIsh";
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import OrderAdmin from "../pages/OrderAdmin";
import Menu from "../pages/HomeCook_Menu"
import OrderMain from "../pages/HomeCook_Order";
import { Row, Col } from "reactstrap";
import HomeCook_DishList from "../wrappers/HomeCook_DishList";
import { withRouter } from "react-router";
import { Redirect } from "react-router-dom";
import KitchenIcon from "@material-ui/icons/Kitchen";

 function NavBarDashBoard(props) {
    let [selected, setSelected] = useState("home");
    var user = JSON.parse(sessionStorage.getItem("user"));
    if(user?.Role !== "homecook") return <Redirect to="/"/>
    console.log(user);
    const main = () => {
        if (selected === "home") return <HomeCookHome HomeCookID={user?.UserID} />
        if (selected === "menu") return <Menu HomeCookID={user?.UserID} HomeCookName={user?.FullName}/>
        if (selected === "dish") return <HomeCook_DishList HomeCookID={user?.UserID} />
        if (selected === "order") return <OrderMain />
    }
    
    return (
      <div>
        <Row className="m-0">
          <Col xs="2" className="p-0" style={{ height: "100vh !important" }}>
            <div
              className="dashboard-sidebar position-fixed "
              style={{ height: "100vh !important", width: "inherit" }}
            >
              <div className="dashboard-sidebarWrapper">
                <div className="dashboard-sidebarMenu">
                  <h3 className="dashboard-sidebarTitle">Dashboard</h3>
                  <ul className="dashboard-sidebarList">
                    <li className="dashboard-sidebarListItem">
                      <KitchenIcon fontSize="large" />
                      <button
                        className="btnDashboard"
                        onClick={() => setSelected("home")}
                      >
                        <h4>Home</h4>
                      </button>
                    </li>
                  </ul>
                  <h3 className="dashboard-sidebarTitle">Management</h3>
                  <ul className="dashboard-sidebarList">
                    <li className="dashboard-sidebarListItem">
                      <LibraryBooksIcon fontSize="large" />
                      <button
                        className="btnDashboard"
                        onClick={() => setSelected("menu")}
                      >
                        <h4>Menu</h4>
                      </button>
                    </li>
                    <li className="dashboard-sidebarListItem">
                      <RestaurantIcon fontSize="large" />
                      <button
                        className="btnDashboard"
                        onClick={() => setSelected("dish")}
                      >
                        <h4>Dish</h4>
                      </button>
                    </li>
                  </ul>
                  <h3 className="dashboard-sidebarTitle">History</h3>
                  <ul className="dashboard-sidebarList">
                    <li className="dashboard-sidebarListItem">
                      <ShoppingCartIcon fontSize="large" />
                      <button
                        className="btnDashboard"
                        onClick={() => setSelected("order")}
                      >
                        <h4>Order</h4>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Col>
          <Col xs="10" className="p-0">
            {main()}
          </Col>
        </Row>
      </div>
    );
}

export default withRouter(NavBarDashBoard);