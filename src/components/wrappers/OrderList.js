import React, { useEffect, useState, useMemo } from "react";
import {
  Table
} from "reactstrap";
import Pagination from '@material-ui/lab/Pagination';
import Popup from 'reactjs-popup';
import Items from "../items/OrderItem";
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/More';
import { Alert } from '@material-ui/lab';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { makeStyles, ThemeProvider, createTheme, withStyles } from '@material-ui/core/styles';
import api from "../../api";
import Swal from "sweetalert2";
import Loading from "../items/Loading";

const OrderList = ({ status, userID, page, search }) => {
  let [orderList, setOrderList] = useState([]);
  let [prevOrder, setprevOrder] = useState([]);
  //-----------paging
  const [total, setTotal] = useState(1);
  const [itemCount, setItemCount] = useState();
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState(page);
  let stt = 0;
  const handleChangePage = (event, value) => {
    console.log(value);
    setLoading(true);
    setPages(value);
    // setItemCount(count);
    console.log(pages);
  }
  const countCustomerOrder = (name) => {
    if (status === "All") {
      api.countCustomerOrder(userID).then((res) => {
        setTotal(res);
      })
    }
    else {
      api.countCustomerOrderByIDAndStatus(userID, status, name).then((res) => {
        console.log(res);
        setTotal(res);
        console.log(total);
      })
    }

  }
  const styleCancel = {
    background: 'crimson'
  }
  //---------
  //Click cancel
  const onClicked = async (OrderID, status, HomeCookID) => {
    const homecook = await api.getAccountByID(HomeCookID);
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
            let datas = {
              title: "Order Status",
              message: "Order number " + OrderID + " is " + status,
            }
            let NotifcationValues = {
              data: datas,
              to: homecook.token,
            }
            api.sendNotification(NotifcationValues).then((res) => {
              console.log(NotifcationValues);
            })
            getOrders(search);
            setprevOrder(orderList);
          }
        });
      }
    });
  }
  //--------
  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: 'midnightblue',
    },
    button: {
      margin: theme.spacing(1),
    },
    IconButton: {
      color: 'midnightblue',
    }
  }));
  const classes = useStyles();
  //----------

  const getOrders = (name) => {
    if (status === "All") {
      api.getAllOrder(name, pages).then((res) => {
        setOrderList(res);
        console.log(res);
      })
    } else {
      api.getOrderByCustomerIDAndStatus(userID, status, name, pages).then((res) => {
        setOrderList(res);
        console.log(res);
      })
    }
  }
  let count = Math.ceil(total / 15);
  if (count < 0) {
    count = 1;
  }

  useEffect(() => {
    countCustomerOrder(search);
  }, [search, pages, status]);
  useEffect(() => {
    getOrders(search);
    setprevOrder(orderList);
    setLoading(false);
    console.log(orderList);
  }, [search, pages, status]);
  console.log(pages);
  console.log(count);
  return (
    <div className="order-OrderNav featuredItem">
      {orderList?.length === 0 ? (
        <div>
          {/* <h1>{status}</h1> */}
          <Alert variant="filled">
            <h3>No order here</h3>
          </Alert>
        </div>
      ) : (
        <div>
          <div>
            {
              loading || orderList === prevOrder ? (
                <Loading />
              ) : status !== 'All' ? (
                <div>
                  <Table striped hover style={{ fontSize: "15px" }}>
                    <thead style={{ fontWeight: "bold" }}>
                      <tr style={{ fontSize: "20px", fontWeight: "bold" }}>
                        <th style={{ fontWeight: "bold" }}>#</th>
                        <th style={{ fontWeight: "bold" }}>Deliver Date</th>
                        <th style={{ fontWeight: "bold" }}>Order date</th>
                        <th style={{ fontWeight: "bold" }}>Receiver Phone</th>
                        <th style={{ fontWeight: "bold" }}>Total</th>
                        {/* <th style={{ fontWeight: "bold" }}>Items</th>  */}
                        <th style={{ fontWeight: "bold" }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        orderList.map((order, index) => {
                          const {
                            OrderID,
                            HomeCookID,
                            TimeStamp,
                            OrderDate,
                            Status,
                            Total,
                            ReceiverPhone,
                            ReceiverAddress,
                            ReceiverName,
                          } = order;
                          var orderDate = new Date(OrderDate.seconds * 1000);
                          var timeStamp = new Date(TimeStamp.seconds * 1000);
                          //  const itemCount = api.countOrderItem(OrderID);
                          // const itemCount= useMemo(() => {
                          //   return api.countOrderItem(OrderID);
                          // }, [OrderID])
                          stt += 1;
                          let isOpen = false;
                          return (
                            <tr key={OrderID}>
                              <td>{stt}</td>
                              <td>{orderDate.toLocaleDateString()}</td>
                              <td>{timeStamp.toLocaleDateString()}</td>
                              <td>{ReceiverPhone}</td>
                              <td>${Total}</td>
                              {/* <td>{itemCount}</td> */}
                              {/* role admin chi xem them duoc detail order */}
                              {status === "Pending" ? (
                                <td className="order-action">
                                  <Button
                                    style={styleCancel}
                                    variant="contained"
                                    color="secondary"
                                    // className={classes.button}
                                    startIcon={<CancelIcon />}
                                    onClick={() => { onClicked(OrderID, "Cancelled", HomeCookID); console.log(OrderID); }}
                                  >
                                    Cancel
                                  </Button>
                                  <Popup trigger={
                                    <IconButton
                                      aria-label="see more"
                                      className={classes.IconButton}
                                      color="primary"
                                    >
                                      <MoreIcon fontSize="large" />
                                    </IconButton>} modal>
                                    {(close) => <Items close={close} key={OrderID} orderID={OrderID} address={ReceiverAddress} name={ReceiverName} />}
                                  </Popup>
                                </td>
                              ) : (
                                <td>
                                  <Popup trigger={
                                    <IconButton
                                      aria-label="see more"
                                      className={classes.IconButton}
                                      classes={{ root: 'MuiIconButton-colorPrimary' }}
                                      color="primary"
                                    >
                                      <MoreIcon fontSize="large" />
                                    </IconButton>} modal>
                                    {(close) => <Items close={close} key={OrderID} orderID={OrderID} address={ReceiverAddress} name={ReceiverName} />}
                                  </Popup>
                                </td>
                              )}
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                  <Pagination
                    color="primary"
                    variant="outlined"
                    shape="rounded"
                    size="large"
                    count={count}
                    page={pages}
                    onChange={handleChangePage} />
                </div>
              ) : (
                <div>
                  <Table striped hover style={{ fontSize: "15px" }}>
                    <thead style={{ fontWeight: "bold" }}>
                      <tr style={{ fontSize: "20px", fontWeight: "bold" }}>
                        <th style={{ fontWeight: "bold" }}>#</th>
                        <th style={{ fontWeight: "bold" }}>Deliver Date</th>
                        <th style={{ fontWeight: "bold" }}>Order date</th>
                        <th style={{ fontWeight: "bold" }}>Receiver Phone</th>
                        <th style={{ fontWeight: "bold" }}>Total</th>
                        {/* <th style={{ fontWeight: "bold" }}>Items</th>  */}
                        <th style={{ fontWeight: "bold" }}>Status</th>
                        <th style={{ fontWeight: "bold" }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        orderList.map((order, index) => {
                          const {
                            OrderID,
                            HomeCookID,
                            TimeStamp,
                            OrderDate,
                            Status,
                            Total,
                            ReceiverPhone,
                            ReceiverAddress,
                            ReceiverName,
                          } = order;
                          var orderDate = new Date(OrderDate.seconds * 1000);
                          var timeStamp = new Date(TimeStamp.seconds * 1000);
                          //  const itemCount = api.countOrderItem(OrderID);
                          // const itemCount= useMemo(() => {
                          //   return api.countOrderItem(OrderID);
                          // }, [OrderID])
                          stt += 1;
                          let isOpen = false;
                          return (
                            <tr key={OrderID}>
                              <td>{stt}</td>
                              <td>{orderDate.toLocaleDateString()}</td>
                              <td>{timeStamp.toLocaleDateString()}</td>
                              <td>{ReceiverPhone}</td>
                              <td>${Total}</td>
                              {Status === 'Cancelled' || Status === 'Rejected' ? (
                                <td style={{ fontWeight: 'bold', color: 'red' }}>{Status}</td>
                              ) : (
                                <td style={{ fontWeight: 'bold', color: 'green' }}>{Status}</td>
                              )}

                              {/* <td>{itemCount}</td> */}
                              {/* role admin chi xem them duoc detail order */}
                              {status === "Pending" ? (
                                <td className="order-action">
                                  <Button
                                    style={styleCancel}
                                    variant="contained"
                                    color="secondary"
                                    // className={classes.button}
                                    startIcon={<CancelIcon />}
                                    onClick={() => { onClicked(OrderID, "Cancelled", HomeCookID); console.log(OrderID); }}
                                  >
                                    Cancel
                                  </Button>
                                  <Popup trigger={
                                    <IconButton
                                      aria-label="see more"
                                      className={classes.IconButton}
                                      color="primary"
                                    >
                                      <MoreIcon fontSize="large" />
                                    </IconButton>} modal>
                                    {(close) => <Items close={close} key={OrderID} orderID={OrderID} address={ReceiverAddress} name={ReceiverName} />}
                                  </Popup>
                                </td>
                              ) : (
                                <td>
                                  <Popup trigger={
                                    <IconButton
                                      aria-label="see more"
                                      className={classes.IconButton}
                                      classes={{ root: 'MuiIconButton-colorPrimary' }}
                                      color="primary"
                                    >
                                      <MoreIcon fontSize="large" />
                                    </IconButton>} modal>
                                    {(close) => <Items close={close} key={OrderID} orderID={OrderID} address={ReceiverAddress} name={ReceiverName} />}
                                  </Popup>
                                </td>
                              )}
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                  <Pagination
                    color="primary"
                    variant="outlined"
                    shape="rounded"
                    size="large"
                    count={count}
                    page={pages}
                    onChange={handleChangePage} />
                </div>
              )
            }
          </div>
        </div>
      )}
    </div >

  );
};
export default OrderList;
