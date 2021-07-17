import React, { useEffect, useState } from "react";
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
import { makeStyles } from '@material-ui/core/styles';
import api from "../../api";
import Swal from "sweetalert2";

const OrderList = ({ status, userID }) => {
  let [orderList, setOrderList] = useState([]);
  console.log(status);
  let count = 0;
  //-----------paging`
  const [page, setPage] = React.useState(1);
  const [total, setTotal] = useState(1);

  const handleChangePage = (event, value) => {
    setPage(value);
    console.log(page);
  }
  const countCustomerOrder = () => {
    api.countCustomerOrderByIDAndStatus(userID, status).then((res) => {
      setTotal(res);
    })
  }

  //---------
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
  //----------

  const getOrders = () => {
    if (status === "All") {
      api.getAllOrder(1).then((res) => {
        setOrderList(res);
        console.log(res);
      })
    } else {
      api.getOrderByCustomerIDAndStatus(userID, status, 1).then((res) => {
        setOrderList(res);
        console.log(res);
      })
    }
  }
  let countpage = 0;
  if (Math.ceil(total / 15)) {
    countpage = 1;
  }
  else countpage = Math.ceil(total / 15);


  useEffect(() => {
    getOrders();
    countCustomerOrder();
    console.log(orderList);
  }, [page, countpage, status]);
  console.log(orderList);
  return (
    <div className="order-OrderNav featuredItem">
      {orderList.length === 0 ? (
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
                <th>#</th>
                <th>Receiver Name</th>
                <th>Recevier Address</th>
                <th>Receiver Phone</th>
                <th>Total</th>
                <th>Order Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
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
                    <tr key={OrderID}>
                      <td>{count}</td>
                      <td>{ReceiverName}</td>
                      <td>{ReceiverAddress}</td>
                      <td>{ReceiverPhone}</td>
                      <td>${Total}</td>
                      <td>{orderDate.toLocaleDateString()}</td>
                      {/* role admin chi xem them duoc detail order */}
                      {status === "Pending" ? (
                        <td>
                          <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            startIcon={<CancelIcon />}
                            onClick={() => { onClicked(OrderID, "Cancelled"); console.log(OrderID); }}
                          >
                            Cancel
                          </Button>
                          <Popup trigger={
                            <IconButton
                              aria-label="see more"
                              className={classes.margin}
                              color="primary"
                            >
                              <MoreIcon fontSize="large" />
                            </IconButton>} modal>
                            <Items key={OrderID} orderID={OrderID} />
                          </Popup>
                        </td>
                      ) : (
                        <td>
                          <Popup trigger={
                            <IconButton
                              aria-label="see more"
                              className={classes.margin}
                              color="primary"
                            >
                              <MoreIcon fontSize="large" />
                            </IconButton>} modal>
                            <Items key={OrderID} orderID={OrderID} />
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
            count={countpage}
            page={page}
            onChange={handleChangePage} />
        </div >

      )}
    </div >

  );
};
export default OrderList;
