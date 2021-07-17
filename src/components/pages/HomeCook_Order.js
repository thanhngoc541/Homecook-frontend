import React, { useEffect, useState } from 'react';
import api from "../../api";
import Button from '@material-ui/core/Button';
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import { Alert } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Swal from "sweetalert2";
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';
import { green } from '@material-ui/core/colors';
import Loading from "../items/Loading";
const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});
const theme = createTheme({
  palette: {
    primary: green,
  },
});


function OrderRow(props) {
  let [items, setItems] = useState([]);
  const { order } = props;

  const [open, setOpen] = React.useState(false);
  const orderId = order.OrderID;
  const classes = useRowStyles();
  //----------------
  const onClicked = (OrderID, status) => {
    if (status !== "Accept" && status !== "Delivering") {
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
              Swal.fire(status, "Your cart has been " + { status }, "success");
            }
          });
        }
      });
    }
    else {
      api.changeOrderStatus(OrderID, status).then((res) => {
        console.log(res);
      });
    }

  }
  //-----------------
  const getItems = () => {
    api.getOrderItems(orderId).then((response) => {
      console.log(response);
      setItems(response);
    })
  };
  useEffect(() => {
    getItems();
    console.log(items);
  }, []);
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {order.ReceiverName}
        </TableCell>
        <TableCell align="left">{order.ReceiverPhone}</TableCell>
        <TableCell align="left">{order.ReceiverAddress}</TableCell>
        <TableCell align="left">${order.Total}</TableCell>
        {/* <TableCell align="left">{order.Status}</TableCell> */}
        {
          order.Status === "Pending" ? (
            <TableCell>
              <ThemeProvider theme={theme}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<CheckIcon />}
                  onClick={() => { onClicked(order.OrderID, "Accept"); }}
                >
                  Accept
                </Button>
              </ThemeProvider>

              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<CancelIcon />}
                onClick={() => { onClicked(order.OrderID, "Cancelled"); }}
              >
                Reject
              </Button>
            </TableCell>
          ) : order.Status === "Accept" ? (
            <TableCell>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<LocalShippingIcon />}
                onClick={() => { onClicked(order.OrderID, "Cancelled") }}
              >
                Delivering
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<CancelIcon />}
                onClick={() => { onClicked(order.OrderID, "Cancelled") }}
              >
                Cancel
              </Button>

            </TableCell>
          ) : <TableCell></TableCell>
        }

      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead >
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold" }}>HomeCook</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>Dish name</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>Quantity</TableCell>
                    <TableCell style={{ fontWeight: "bold" }} align="right">Price</TableCell>
                    <TableCell style={{ fontWeight: "bold" }} align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    items.map((item) => {
                      const {
                        ItemID,
                        Quantity,
                        Dish,
                        TotalPrice
                      } = item;
                      return (
                        <TableRow key={ItemID}>
                          <TableCell component="th" scope="row">
                            {Dish.HomeCookID}
                          </TableCell>
                          <TableCell>{Dish.DishName}</TableCell>
                          <TableCell>{Quantity}</TableCell>
                          <TableCell align="right">{Dish.Price}</TableCell>
                          <TableCell align="right">
                            {TotalPrice}
                          </TableCell>
                        </TableRow>
                      )
                    })
                  }
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function CollapsibleTable({ HomeCookID, orderPerPage, status }) {
  //-------------
  let [orders, setOrders] = useState([]);
  let [prevOrder, setprevOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = React.useState(1);
  const [total, setTotal] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    console.log(page);
  };

  const getOrderCount = () => {
    api.countHomeCookOrderByIDAndStatus(HomeCookID, status).then((response) => {
      setTotal(response);
    })
  }
  const getOrders = () => {
    if (status === "All") {
      api.getHomeCookOrder(HomeCookID).then((res) => {
        setOrders(res);
        console.log(orders);
      })
    } else {
      api.getOrderByHomeCookIDAndStatus(HomeCookID, status, page).then((response) => {
        setOrders(response);;
      })
    }
  }
  let count = 0;
  if (Math.ceil(total / orderPerPage)) {
    count = 1;
  }
  else count = Math.ceil(total / orderPerPage);
  useEffect(() => {
    getOrderCount();
    getOrders();
    setprevOrder(orders);
    setLoading(false);
  }, [page, count, status]);
  return (
    <div>
      {orders.length === 0 ? (
        <div>
          <h1>{status}</h1>
          <Alert variant="filled">
            <h3>No order here</h3>
          </Alert>
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell style={{ fontWeight: "bold", fontSize: "20px" }}>Customer Name</TableCell>
                <TableCell style={{ fontWeight: "bold", fontSize: "20px" }} align="left">Phone</TableCell>
                <TableCell style={{ fontWeight: "bold", fontSize: "20px" }} align="left">Address</TableCell>
                <TableCell style={{ fontWeight: "bold", fontSize: "20px" }} align="left">Total</TableCell>
                <TableCell style={{ fontWeight: "bold", fontSize: "20px" }} align="left">Action</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>

              {/* {orders.length==0?<h4 className="ml-3">No {status} Order</h4>:null} */}
              {orders.map((order) => {
                const {
                  OrderID,
                  HomeCookID,
                  OrderDate,
                  Status,
                  Total,
                  ReceiverPhone,
                  ReceiverAddress,
                  ReceiverName,
                } = order;
                return (
                  <OrderRow key={OrderID} order={order} />
                )
              })}
            </TableBody>
          </Table>
          <Pagination variant="outlined" shape="rounded" size="large" count={count} page={page} onChange={handleChange} />
        </TableContainer>
      )}
    </div>
  );
}
export default function OrderMain() {
  const userData = JSON.parse(sessionStorage.getItem("user"));
  const allStatuses = [
    "All",
    "Pending",
    "Accept",
    "Delivering",
    "Delivered",
    "Finished",
    "Rejected",
    "Cancelled",
   
  ];
  const useStyles = makeStyles({
    root: {
      flexGrow: 1,
      maxWidth: 1500,
    },
  });
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  let [selected, setSelected] = useState("Pending");
  const main = () => {
    return <CollapsibleTable HomeCookID={userData.UserID} orderPerPage={15} status={selected} />
  }
  console.log(userData.UserID);
  return (
    <div>
      <div>Filter Search</div>
      <div>
        <Paper square >
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            aria-label="icon label tabs example"
          >
            {allStatuses.map((status, index) => {
              return (
                <Tab key={index} onClick={() => setSelected(status)} label={status} style={{ fontWeight: "bold" }} />
              );
            })}
          </Tabs>
        </Paper>
        {main()}
      </div>
    </div>
  );
}