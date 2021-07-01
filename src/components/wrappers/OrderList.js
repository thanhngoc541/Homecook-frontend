import { Button } from "bootstrap";
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Table
} from "reactstrap";
import Popup from 'reactjs-popup';
import Items from "../items/OrderItem";
const OrderList = ({ orders }) => {
  const [openIndex, setOpenIndex]= useState(-1);
  console.log(orders);
  return (
    <div className="order-OrderNav">
      {orders == null ? (
        <h3>Choose a status</h3>
      ) : orders.length === 0 ? (
        <h3>No order here</h3>
      ) : (
        <div>
          <Table hover style={{ fontSize: "15px" }}>
            <thead>
              <tr>
                {/* <th>Order ID</th> */}
                <th>Time Stamp</th>
                <th>Order Date</th>
                <th>Receiver Phone</th>
                <th>Recevier Address</th>
                <th>Receiver Name</th>
                <th>Total</th>
                <th>Status</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
            {
              orders.map((order, index) => {
                const {
                  OrderID,
                  TimeStamp,
                  OrderDate,
                  Status,
                  Total,
                  ReceiverPhone,
                  ReceiverAddress,
                  ReceiverName,
                } = order;
                //From instant (epoch to date type)
                var timeStamp= new Date(TimeStamp.seconds*1000);
                var orderDate= new Date(OrderDate.seconds*1000);
                console.log(timeStamp);
                console.log(orderDate);
                let isOpen=false;
                return (
                    <tr key={OrderID} onClick={() => setOpenIndex(index)}>
                      <Popup open={index === openIndex} onClose={()=> setOpenIndex(-1)} position="right center">
                        <Items orderID={OrderID}/>
                      </Popup>
                      {/* <td>{OrderID}</td> */}
                      {/* <td>{TimeStamp}</td> */}
                      <td>{timeStamp.toLocaleDateString()} {timeStamp.toLocaleTimeString()}</td>
                      <td>{orderDate.toLocaleDateString()} {orderDate.toLocaleTimeString()}</td>
                      <td>{ReceiverPhone}</td>
                      <td>{ReceiverAddress}</td>
                      <td>{ReceiverName}</td>
                      <td>${Total}</td>
                      <td>{Status}</td>
                      {/* <td>{Status}</td> */}
                      {Status === 'Pending' ? (
                        <td><button info="danger">Cancel</button></td>
                      ) : (
                        <td></td>
                      )}
                    
                    </tr>
                
                );
              })}
              </tbody>
          </Table>
        </div>
      )}
    </div>
  );
  //-------------------------
};
export default OrderList;