import React, { useEffect, useState } from "react";
import Button from "reactstrap";
import api from "../../api";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function OrderRow(props) {
  let [items, setItems] = useState([]);
  const { order } = props;

  const [open, setOpen] = React.useState(false);
  const orderId = order.OrderID;
  const classes = useRowStyles();

  const getItems = () => {
    api.getOrderItems(orderId).then((response) => {
      setItems(response);
    });
  };
  useEffect(() => {
    getItems();
    // console.log(items);
  }, []);
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {order.ReceiverName}
        </TableCell>
        <TableCell align="left">{order.ReceiverPhone}</TableCell>
        <TableCell align="left">{order.ReceiverAddress}</TableCell>
        <TableCell align="left">{order.Status}</TableCell>
        <TableCell align="left">${order.Total}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold" }}>
                      HomeCook
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Dish name
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Quantity
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }} align="right">
                      Price
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }} align="right">
                      Total price ($)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item) => {
                    const { ItemID, Quantity, Dish, TotalPrice } = item;
                    return (
                      <TableRow key={ItemID}>
                        <TableCell component="th" scope="row">
                          {Dish.HomeCookID}
                        </TableCell>
                        <TableCell>{Dish.DishName}</TableCell>
                        <TableCell>{Quantity}</TableCell>
                        <TableCell align="right">{Dish.Price}</TableCell>
                        <TableCell align="right">{TotalPrice}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
export default function CollapsibleTable() {
  let [orders, setOrders] = useState([]);
  const [page, setPage] = React.useState(1);
  const [total, setTotal] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    console.log(page);
  };
  const getOrderCount = () => {
    api.getTotalCount().then((response) => {
      setTotal(response);
    });
  };
  const getOrders = async () => {
    await api.getAllOrder(page).then((response) => {
      setOrders(response);
      // console.log(orders);
      // console.log(page);
    });
  };
  const count = Math.ceil(total / 15);
  useEffect(() => {
    getOrders();
    getOrderCount();
  }, [page, count]);

  console.log(orders);
  return (
    <div className="featuredItem">
      <TableContainer component={Paper}>
        <Table
          aria-label="collapsible table"
          sortModel={[
            {
              field: "name",
              sort: "asc",
            },
          ]}
        >
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell
                field="name"
                style={{ fontWeight: "bold", fontSize: "20px" }}
              >
                Customer Name
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", fontSize: "20px" }}
                align="left"
              >
                Phone
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", fontSize: "20px" }}
                align="left"
              >
                Address
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", fontSize: "20px" }}
                align="left"
              >
                Status
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", fontSize: "20px" }}
                align="left"
              >
                Total
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
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
              return <OrderRow key={OrderID} order={order} />;
            })}
          </TableBody>
        </Table>
        <Pagination
          color="primary"
          variant="outlined"
          shape="rounded"
          size="large"
          count={count}
          page={page}
          onChange={handleChange}
        />
      </TableContainer>
    </div>
  );
}
