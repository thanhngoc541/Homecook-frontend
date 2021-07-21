import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import Loading from "../items/Loading";
import StatusBar from "../items/StatusBar";
import OrderList from "../wrappers/OrderList";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter, Redirect } from "react-router-dom";

function Order(props) {
  const [userData, setUserData] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  const useStyles = makeStyles({
    root: {
      flexGrow: 1,
      maxWidth: 1500,
    },
  });
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [search, setSearch] = useState("all");
  const [page, setPage] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //------------------
  const allStatuses = [
    "Pending",
    "Accept",
    "Delivering",
    "Delivered",
    "Finished",
    "Rejected",
    "Cancelled",
    "All",
  ];
  let [selected, setSelected] = useState("Pending");
  const main = () => {
    if (!!userData) {
      const role = userData.Role;
      const id = userData.UserID;
      return <OrderList userID={id} role={role} status={selected} page={page} search={search}/>;
    } else {
      console.log(
        "%cUserData is null",
        "color: blue; font-size: 15px; background-color: yellow;"
      );
      return <Redirect to="/login" />;
    }
  };
  return (
    <div>
      <h1>Order History</h1>
      <div>
        <div class="search-form">
          <i class="fa fa-search search-icon" aria-hidden="true"></i>
          <input
            type="text"
            class="search-input"
            placeholder="Order ID"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                // setPage(1);
                setSearch(e.target.value === "" ? "all" : e.target.value);
              }
            }}
          />
        </div>
      </div>
      <hr></hr>
      <div>
        <Paper square>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            aria-label="icon label tabs example"
          >
            {allStatuses.map((status, index) => {
              return (
                <Tab
                  key={index}
                  onClick={() => setSelected(status)}
                  label={status}
                  // disabled={true}
                  style={{ fontWeight: "bold" }}
                />
              );
            })}
          </Tabs>
        </Paper>
      </div>
      {main()}
    </div>
  );
}
export default withRouter(Order);
