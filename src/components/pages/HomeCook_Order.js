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
import { TableSortLabel } from '@material-ui/core';
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
const styleCancel = {
  background: 'crimson'
}
const styleActivate = {
  backgroundColor: 'green'
}


function OrderRow(props) {
  let [items, setItems] = useState([]);
  const { order, status } = props;

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

        {
          status === "Pending" ? (
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
                style={styleCancel}
                className={classes.button}
                startIcon={<CancelIcon />}
                onClick={() => { onClicked(order.OrderID, "Rejected"); }}
              >
                Reject
              </Button>
            </TableCell>
          ) : status === "Accept" ? (
            <TableCell>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<LocalShippingIcon />}
                onClick={() => { onClicked(order.OrderID, "Delivering") }}
              >
                Delivering
              </Button>
              <Button
                variant="contained"
                color="secondary"
                style={styleCancel}
                className={classes.button}
                startIcon={<CancelIcon />}
                onClick={() => { onClicked(order.OrderID, "Cancelled") }}
              >
                Cancel
              </Button>

            </TableCell>
          ) : status === "All" ? <TableCell>{order.Status}</TableCell> : null
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

function CollapsibleTable({ homeCookID, orderPerPage, status, page, search }) {
  //-------------
  let [orders, setOrders] = useState([]);
  let [prevOrder, setprevOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('asc');
  const [sortBy, setSortBy] = useState('total');
  
  const [total, setTotal] = useState(1);

  const handleChange = (event, value) => {
    setLoading(true);
    // setPage(value);
    page= value;
    console.log(page);
  };

  const getOrderCount = (name) => {
    api.countHomeCookOrderByIDAndStatus(homeCookID, status, name).then((response) => {
      setTotal(response);
    })
  }
  const getOrders = (name) => {
    if (status === "All") {
      api.getHomeCookOrder(homeCookID, name, page).then((res) => {
        setOrders(res);
        console.log(orders);
      })
    } else {
      api.getOrdersByHomeCookIDAndStatus(homeCookID, status, name, page).then((response) => {
        setOrders(response);
      })
    }
  }
  let count = 0;
  if (Math.ceil(total / orderPerPage)) {
    count = 1;
  }
  else count = Math.ceil(total / orderPerPage);
  useEffect(() => {
    getOrderCount(search)
  }, [search]);
  useEffect(() => {
    // getOrderCount();
    getOrders(search);
    setprevOrder(orders);
    setLoading(false);
  }, [search, page, count, status]);


  //------------SORT
  const handleRequestSort = (event, property) => {
    const isAsc = sortBy === property && sort === 'asc';
    setSort(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  }
  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  }
  function descendingComparator(a, b, sortBy) {
    if (b[sortBy] < a[sortBy]) {
      return -1;
    }
    if (b[sortBy] > a[sortBy]) {
      return 1;
    }
    return 0;
  }
  function getComparator(sort, sortBy) {
    return sort === 'desc'
      ? (a, b) => descendingComparator(a, b, sortBy)
      : (a, b) => -descendingComparator(a, b, sortBy);
  }
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const sort = comparator(a[0], b[0]);
      if (sort !== 0) return sort;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
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
        <div>

          <div>
            {
              loading || orders.length < 1 || orders === prevOrder ? (
                <Loading />
              ) : (

                <TableContainer component={Paper}>
                  <Table aria-label="collapsible table">
                    <TableHead>
                      <TableRow>
                        <TableCell />
                        <TableCell
                          style={{ fontWeight: "bold", fontSize: "20px" }}
                          key="ReceiverName"
                          id="ReceiverName"
                          sortDirection={sortBy === 'ReceiverName' ? sort : false}>
                          <TableSortLabel
                            active={sortBy === 'ReceiverName'}
                            direction={sortBy === 'ReceiverName' ? sort : 'asc'}
                            onClick={createSortHandler('ReceiverName')}>
                            Customer name
                          </TableSortLabel>
                        </TableCell>
                        <TableCell style={{ fontWeight: "bold", fontSize: "20px" }} align="left">
                          Phone
                        </TableCell>
                        <TableCell style={{ fontWeight: "bold", fontSize: "20px" }} align="left">
                          Address
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: "bold", fontSize: "20px" }}
                          align="left"
                          key="Total"
                          id="Total"
                          sortDirection={sortBy === 'Total' ? sort : false}>
                          <TableSortLabel
                            active={sortBy === 'Total'}
                            direction={sortBy === 'Total' ? sort : 'asc'}
                            onClick={createSortHandler('Total')}>
                            Total
                          </TableSortLabel>
                        </TableCell>
                        {
                          status !== "All" ? null : (
                            <TableCell
                              style={{ fontWeight: "bold", fontSize: "20px" }}
                              align="left"
                              key="Status"
                              id="Status"
                              sortDirection={sortBy === 'Status' ? sort : false}>
                              <TableSortLabel
                                active={sortBy === 'Status'}
                                direction={sortBy === 'Status' ? sort : 'asc'}
                                onClick={createSortHandler('Status')}>
                                Status
                              </TableSortLabel>
                            </TableCell>
                          )
                        }

                        {
                          status !== "All" ? <TableCell></TableCell> : null
                        }
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* {orders.length==0?<h4 className="ml-3">No {status} Order</h4>:null} */}
                      {stableSort(orders, getComparator(sort, sortBy)).map((order) => {
                        const {
                          OrderID,
                        } = order;
                        return (
                          <OrderRow key={OrderID} order={order} status={status} />
                        )
                      })}
                    </TableBody>
                  </Table>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className=" mx-3 my-3">Showing 1 to 15 of {total} entries </div>
                    <Pagination className=" mx-3 my-3" variant="outlined" shape="rounded" size="large" count={count} page={page} onChange={handleChange} />
                  </div>
                </TableContainer>
              )
            }
          </div>
        </div>
      )}
    </div>
  );
}
export default function OrderMain() {
  const userData = JSON.parse(sessionStorage.getItem("user"));
  const allStatuses = [

    "Pending",
    "Accept",
    "Delivering",
    "Delivered",
    "Finished",
    "Rejected",
    "Cancelled",
    "All",
  ];


  const useStyles = makeStyles({
    root: {
      flexGrow: 1,
      maxWidth: 1500,
    },
  });
  //------------FILTER
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [search, setSearch] = useState("all");
  const [page, setPage] = React.useState(1);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  let [selected, setSelected] = useState("Pending");
  const main = () => {
    return <CollapsibleTable homeCookID={userData.UserID} orderPerPage={15} status={selected} page={page} search={search}/>
  }
  return (
    <div className="featuredItem px-5">
      <div>
        <div class="search-form">
          <i class="fa fa-search search-icon" aria-hidden="true"></i>
          <input
            type="text"
            class="search-input"
            placeholder="Phone number"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setPage(1);
                setSearch(e.target.value == "" ? "all" : e.target.value);
              }
            }}
          />
        </div>
      </div>
      <hr></hr>
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