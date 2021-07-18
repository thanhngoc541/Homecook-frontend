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
      return <OrderList userID={id} role={role} status={selected} />;
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
