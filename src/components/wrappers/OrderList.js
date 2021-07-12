

import React, { useEffect, useState } from "react";
import {
  Table, Button
} from "reactstrap";
import Popup from 'reactjs-popup';
import Items from "../items/OrderItem";
import { useForm } from "react-hook-form";
import api from "../../api";
// import './component/css/orderlist.css';
const OrderList = ({ orders }) => {
  const [openIndex, setOpenIndex] = useState(-1);
  console.log(orders);
  let count = 0;
  const { update, handleSubmit } = useForm();
  // const onSubmit =  {

  // }
  return (
    <div className="order-OrderNav">
      {orders == null ? (
        <h3>Choose a status</h3>
      ) : orders.length === 0 ? (
        <h3 style={{ overflowX: "auto", width: "100%" }}>No order here</h3>
      ) : (
        <div>
          <Table hover style={{ fontSize: "15px" }}>
            <thead style={{ fontWeight: "bold" }}>
              <tr style={{ fontSize: "20px" }}>
                {/* <th>Order ID</th> */}
                {/* <th>Time Stamp</th> */}
                <th>#</th>
                <th>Receiver Name</th>
                <th>Recevier Address</th>
                <th>Receiver Phone</th>
                <th>Total</th>
                <th>Order Date</th>
                <th>Status</th>
                {/* <th>Edit</th> */}
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
                  function changeOrderStatus(OrderID, status) {
              
                    api.changeOrderStatus(OrderID, status);
                  }
                  //From instant (epoch to date type)
                  var timeStamp = new Date(TimeStamp.seconds * 1000);
                  var orderDate = new Date(OrderDate.seconds * 1000);
                  console.log(timeStamp);
                  console.log(orderDate);
                  count += 1;
                  let isOpen = false;
                  return (
                    <tr key={OrderID} onClick={() => setOpenIndex(index)}>
                      <Popup open={index === openIndex} onClose={() => setOpenIndex(-1)} position="right center">
                        <Items orderID={OrderID} />
                      </Popup>
                      <td>{count}</td>
                      {/* <td>{OrderID}</td> */}
                      {/* <td>{TimeStamp}</td> */}
                      {/* <td>{timeStamp.toLocaleDateString()} {timeStamp.toLocaleTimeString()}</td> */}
                      <td>{ReceiverName}</td>
                      <td>{ReceiverAddress}</td>
                      <td>{ReceiverPhone}</td>
                      <td>${Total}</td>
                      <td>{orderDate.toLocaleDateString()} {orderDate.toLocaleTimeString()}</td>
                      <td>{Status}</td>
                      {/* <td>{Status}</td> */}
                      {(Status === 'Pending') ? (
                        <td>
                          <Button onClick={()=>changeOrderStatus({ OrderID }, "Accept")} outline color="danger">Cancel</Button>                 
                        </td>
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