import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import Loading from "../items/Loading";
import StatusBar from "../items/StatusBar";
import OrderList from "../wrappers/OrderList";

function Order() {
  var [orders, setOrders] = useState(null);
  let [orderList, setOrderList] = useState(orders);
  let [isInitialized, setIsInitialize] = useState(true);
  let [status, setStatus] = useState("Pending");
  const userData = JSON.parse(sessionStorage.getItem("user"));
  const getOrders = async () => {
    await api
      .getCustomerOrder(userData.UserID)
      .then((response) => {
        setOrders(response);
      });
  };
  useEffect(() => {
    getOrders();
    if (isInitialized && orders != null) {
      setIsInitialize(false);
    }
  },[]);

  //------------------
  const allStatuses = [
    "Pending",
    "All",
    "Accept",
    "Delivering",
    "Delivered",
    "Finished",
    "Rejected",
    "Cancelled",
  ];

  return (
    <div>
      <StatusBar
        filterOrders={(status) => {
          setStatus(status);
          console.log(status);
        }}
        statuses={allStatuses}
      />
      {orders != null ? (
        <OrderList
          role={userData.Role}
          statuses={allStatuses}
          status={status}
          orders={orders}
        />
      ) : (
        <Loading />
      )}
    </div>
  );
}
export default Order;
