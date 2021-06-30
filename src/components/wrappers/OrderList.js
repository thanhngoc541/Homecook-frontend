import { Button } from "bootstrap";
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Table
} from "reactstrap";
import Items from "../items/OrderItem";
const OrderList = ({ orders }) => {
  console.log(orders);
  // function onClikedDetails(orderId) {
  //   setSelectedOrder(orderId);
  //   setIsPopup(true);
  // }
  // const [selectedOrder, setSelectedOrder] = useState(null);
  // const [isPopup, setIsPopup] = useState(false);
  // console.log(orders);
  return (
    <div className="order-OrderNav">
      {orders == null ? (
        <h3>Choose a status</h3>
      ) : orders.length ===0 ? (
        <h3>No order here</h3>
      ) : (
        <div>
          <Table hover style={{ fontSize: "15px" }}>
            {/* <Items orderID={selectedOrder} popup={isPopup}/> */}
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Time Stamp</th>
                <th>Receiver Phone</th>
                <th>Recevier Address</th>
                <th>Receiver Name</th>
                <th>Total</th>
                <th>Status</th>
                <th>Edit</th>
              </tr>
            </thead>
            {
              orders.map((order) => {
                const {
                  OrderID,
                  TimeStamp,
                  Status,
                  Total,
                  ReceiverPhone,
                  ReceiverAddress,
                  ReceiverName,
                } = order;
                return (
                  <tbody key={OrderID}>
                    <tr>
                      <td>{OrderID}</td>
                      {/* <td>{TimeStamp}</td> */}
                      <td>Time Stamp</td>
                      <td>{ReceiverPhone}</td>
                      <td>{ReceiverAddress}</td>
                      <td>{ReceiverName}</td>
                      <td>${Total}</td>
                      {/* <td>{Status}</td> */}
                      {Status === 'Pending' ? (
                        <td>{Status}<button info="danger">Cancel</button></td>
                      ) : (
                        <td>{Status}</td>
                      )}
                      <td><button>Details</button></td>
                    </tr>
                  </tbody>
                );
              })}
              </Table>
        </div>
      )}
    </div>
  );
  //-------------------------
};
export default OrderList;