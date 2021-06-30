import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import StatusBar from "../items/StatusBar";
import OrderList from "../wrappers/OrderList";


function Order() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState(null);
  // const fetchOrders = async () => {
  //   const response = await fetch(url);
  //   const newOrder = await response.json();
  //   setOrders(newOrder);
  // }
  // useEffect(() => {
  //   fetchOrders();
  // }, []);
  const getOrders = async () => {
    await api.getCustomerOrder("535340B1-8053-4819-8772-488577A10639").then((response) => {
      setOrders(response);
    });
  };
  useEffect(() => {
    getOrders();
  }, []);


  //------------------
  const allStatuses = ["All", "Pending", "Accept", "Delivering", "Delivered", "Finished", "Rejected", "Cancelled"];
  const [orderList, setOrderList] = useState(orders);
  const [status, setStatus] = useState(allStatuses);
  status.setStatus= 'All';
  const filterOrders = (status) => {
    if (status === 'All') {
      setOrderList(orders);
      return;
    }
    const newOrders = orders.filter((order) => order.Status === status);
    setOrderList(newOrders);
    console.log(status);
  }
  //----------------
  return (
    <div>
      <StatusBar filterOrders={filterOrders} statuses={allStatuses} setStatus={(status) => (setStatus(status))}/>
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