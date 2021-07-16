import React, { useEffect, useState } from "react";
import {
  Table
} from "reactstrap";
import Popup from 'reactjs-popup';
import Items from "../items/OrderItem";
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';
import { Alert, AlertTitle } from '@material-ui/lab';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { makeStyles } from '@material-ui/core/styles';
import api from "../../api";
import Swal from "sweetalert2";
// import './component/css/orderlist.css';
const OrderList = ({ status, orders, role }) => {
  let [orderList, setOrderList] = useState([]);
  let [openIndex, setOpenIndex] = useState(-1);
  let [order, setOrder] = useState(null);

  useEffect(() => {
    filterOrders(status);
    console.log(status);
  }, [status]);

  let count = 0;

  // }
  const filterOrders = (status) => {

    console.log("isFilterling");
    console.log(status);
    if (status === "All") {
      setOrderList(orders);
      return;
    }
    const newOrders = orders.filter((order) => order.Status === status);
    orderList = newOrders;
    console.log(newOrders);
    console.log(orderList);
    setOrderList(orderList);
  }
  //Click cancel
  const onClicked = (OrderID, status) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        api.changeOrderStatus(OrderID, status).then((res) => {
          console.log(res);
          if (res.ok) {
            Swal.fire("Canceled!", "Your cart has been Canceled.", "success");
          }
        });
      }
    });
  }
  //--------
  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: "Red",
    },
    button: {
      margin: theme.spacing(1),
    },
  }));
  const classes = useStyles();
  return (
    <div className="order-OrderNav featuredItem">
      {orderList == null ? (
        <h3>Choose a status</h3>
      ) : orderList.length === 0 ? (
        <div>
          <h1>{status}</h1>
          <Alert variant="filled">

            <h3>No order here</h3>
          </Alert>
        </div>
      ) : (
        <div>
          <h1>{status}</h1>
          <Table striped hover style={{ fontSize: "15px" }}>
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
                <th>Edit</th>
                {/* <th>Edit</th> */}
              </tr>
            </thead>
            <tbody>
              {
                orderList == null ? null :
                  orderList.map((order, index) => {
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
                    var orderDate = new Date(OrderDate.seconds * 1000);
                    count += 1;
                    let isOpen = false;
                    return (
                      <tr key={OrderID} onClick={() => setOpenIndex(index)}>
                        <td>{count}</td>
                        {/* <td>{OrderID}</td> */}
                        {/* <td>{TimeStamp}</td> */}
                        {/* <td>{timeStamp.toLocaleDateString()} {timeStamp.toLocaleTimeString()}</td> */}
                        <td>{ReceiverName}</td>
                        <td>{ReceiverAddress}</td>
                        <td>{ReceiverPhone}</td>
                        <td>${Total}</td>
                        <td>{orderDate.toLocaleDateString()}</td>
                        <td>{Status}</td>
                        {/* role admin chi xem them duoc detail order */}
                        {role === "customer" ? (
                          status === "Pending" ? (
                            <td>
                              <Popup trigger={
                                <Button
                                  variant="contained"
                                  color="primary"
                                  className={classes.button}
                                >
                                  See more
                                </Button>} modal>
                                <Items key={OrderID} orderID={OrderID} />
                                <div>Pop up</div>
                              </Popup>
                              <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                startIcon={<CancelIcon />}
                                onClick={() => { onClicked(OrderID, "Cancelled"); console.log(OrderID); }}
                              >
                                Cancel
                              </Button>
                            </td>
                          ) : (
                            <td>
                             <Popup trigger={
                                <Button
                                  variant="contained"
                                  color="primary"
                                  className={classes.button}
                                >
                                  See more
                                </Button>} modal>
                                <Items key={OrderID} orderID={OrderID} />
                                <div>Pop up</div>
                              </Popup>
                            </td>
                          )
                        )
                          // role homecook cancel order => rejected
                          : (
                            status === "Pending" ? (
                              <td>
                                <Button onClick={() => { onClicked(OrderID, "Rejected"); console.log(OrderID); }} color="danger">Cancel</Button>
                                <Button onClick={() => { onClicked(OrderID, "Accept"); console.log(OrderID); }} color="success">Accept</Button>
                                <Popup trigger={
                                <Button
                                  variant="contained"
                                  color="primary"
                                  className={classes.button}
                                >
                                  See more
                                </Button>} modal>
                                <Items key={OrderID} orderID={OrderID} />
                                <div>Pop up</div>
                              </Popup>
                              </td>
                            ) : status === "Accept"(
                              <td>
                                <Button onClick={() => { onClicked(OrderID, "Delivering"); console.log(OrderID); }} color="danger">Delivering</Button>
                                <Popup trigger={
                                <Button
                                  variant="contained"
                                  color="primary"
                                  className={classes.button}
                                >
                                  See more
                                </Button>} modal>
                                <Items key={OrderID} orderID={OrderID} />
                                <div>Pop up</div>
                              </Popup>
                              </td>
                            )
                          )}
                      </tr>
                    );
                  })}
            </tbody>
          </Table>
        </div >
      )}
    </div >
  );
};
export default OrderList;