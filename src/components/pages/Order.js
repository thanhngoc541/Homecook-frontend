import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import StatusBar from "../items/StatusBar";
import OrderList from "../wrappers/OrderList";


function Order() {
  var [orders, setOrders] = useState(null);
  let [orderList, setOrderList] = useState(orders);
  let [isInitialized, setIsInitialize] = useState(true);
  let [status, setStatus]= useState("Pending");

  const getOrders = async () => {
    await api.getCustomerOrder("6bb74684-993e-4286-b4be-7e723bba1614").then((response) => {
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
  const allStatuses = ["All","Pending", "Accept", "Delivering", "Delivered", "Finished", "Rejected", "Cancelled"];

  return (
    <div>
      <StatusBar filterOrders={(status) => {setStatus(status); console.log(status)}} statuses={allStatuses} />
      {orders != null ? (
        <OrderList role="admin" statuses={allStatuses} status={status} orders={orders}/>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};
export default Order;