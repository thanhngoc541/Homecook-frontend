import React, { useEffect, useState } from "react";
import StatusBar from "../StatusBar";
import OrderList from "../OrderList";


function Order() {
  const url = "http://localhost:8080/Homecook_war_exploded/orders/customer/535340B1-8053-4819-8772-488577A10639";

  //--------------------------
  // const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const response = await fetch(url);
    const newOrder = await response.json();
    setOrders(newOrder);
    // setLoading(false);
  }
  useEffect(() => {
    fetchOrders();
  }, []);
  // if (loading) {
  //   return (
  //     <setion>
  //       <h1>Loading...</h1>
  //     </setion>
  //   )
  // };

  //------------------
  const allStatuses = ["All", "Pending", "Accept", "Delivering", "Delivered", "Finished", "Rejected", "Cancelled"];
  const [orderList, setOrderList] = useState(orders);
  const [statuses, setStatuses] = useState(allStatuses);

  const filterOrders = (status) => {
    if (status === 'All') {
      setOrderList(orders);
      return;
    }
    const newOrders = orders.filter((order) => order.Status === status);
    setOrderList(newOrders);
  }
  //---------------
  function checkOrder({ orders }) {
    if (orders != null) {
      <div>
        <StatusBar filterOrders={filterOrders} statuses={statuses} />
        <OrderList orders={orderList} />
      </div>
    }
    else {
      <div>
        <StatusBar filterOrders={filterOrders} statuses={statuses} />
        <div>There's no orders here</div>
      </div>
    }
  }
  //----------------
  return (
    <div>
    <StatusBar filterOrders={filterOrders} statuses={statuses} />
      <OrderList orders={orderList} />
    </div>
  );
};
export default Order;


