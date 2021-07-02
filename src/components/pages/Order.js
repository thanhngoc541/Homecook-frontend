import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import StatusBar from "../items/StatusBar";
import OrderList from "../wrappers/OrderList";


function Order() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState(null);
  const [isInitialized, setIsInitialize] = useState(true);
  // const fetchOrders = async () => {
  //   const response = await fetch(url);
  //   const newOrder = await response.json();
  //   setOrders(newOrder);
  // }
  // useEffect(() => {
  //   fetchOrders();
  // }, []);
  const getOrders = async () => {
    await api.getCustomerOrder("6bb74684-993e-4286-b4be-7e723bba1614").then((response) => {
      setOrders(response);
    });
  };
  useEffect(() => {
    getOrders();
    console.log(isInitialized);
    console.log("checked");
    if (isInitialized && orders != null) {
      filterOrders("All");
      setIsInitialize(false);
    }
  }, []);


  //------------------
  const allStatuses = ["All", "Pending", "Accept", "Delivering", "Delivered", "Finished", "Rejected", "Cancelled"];
  const [orderList, setOrderList] = useState(orders);
  
  const filterOrders = (status) => {
    console.log("isFilterling");
    console.log(status);
    if (status === "All") {
      setOrderList(orders);
      console.log(orders);
      return;
    }
    const newOrders = orders.filter((order) => order.Status === status);
    setOrderList(newOrders);
    console.log(status);
    console.log(newOrders);
  }
  // filterOrders("All");
  //----------------
  return (
    <div>

      <StatusBar filterOrders={filterOrders} statuses={allStatuses} />
      {orders == null ? (
        <h1>Loading...</h1>
      ) : (
        <OrderList orders={orderList} />
      )}
    </div>
  );
};
export default Order;

// (<OrderList orders={orderList} />
//   )