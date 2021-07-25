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
import { green } from '@material-ui/core/colors';
import DatePicker from "react-datepicker";
import Loading from "../items/Loading";
import { TableSortLabel } from '@material-ui/core';
import { right, start } from '@popperjs/core';
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
  const { order, status, stt } = props;

  const [open, setOpen] = React.useState(false);
  const orderId = order.OrderID;
  const classes = useRowStyles();
  //----------------
  //-----------------
  const getItems = () => {
    api.getOrderItems(orderId).then((response) => {
      setItems(response);
    })
  };
  useEffect(() => {
    getItems();
  }, []);
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          {stt}
        </TableCell>
        <TableCell component="th" scope="row">
          {order.ReceiverName}
        </TableCell>
        <TableCell align="left">{order.ReceiverPhone}</TableCell>
        <TableCell align="left">{order.ReceiverAddress}</TableCell>
        {
          status !== "All" ? null : (
            <TableCell align="left">
              {
                order.Status === 'Cancelled' || order.Status === 'Rejected' ? (
                  <td style={{ fontWeight: 'bold', color: 'red' }}>{order.Status}</td>
                ) : (
                  <td style={{ fontWeight: 'bold', color: 'green' }}>{order.Status}</td>
                )
              }
            </TableCell>
          )
        }
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
                    order.IsMenu === false ? (
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
                    ) : (
                      items.map((menu) => {
                        const {
                          ItemID,
                          Quantity,
                          Note,
                          Menu,
                          TotalPrice
                        } = menu;
                        return (
                          <TableRow key={ItemID}>
                            <TableCell component="th" scope="row">
                              {Menu.HomeCookName}
                            </TableCell>
                            <TableCell>{Menu.MenuName}</TableCell>
                            <TableCell>{Quantity}</TableCell>
                            <TableCell align="right">{Menu.Price}</TableCell>
                            <TableCell align="right">
                              {TotalPrice}
                            </TableCell>
                          </TableRow>
                        )
                      })
                    )
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

function CollapsibleTable({ orderPerPage, status, search }) {
  //-------------
  console.log(status);
  let [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  // console.log(page);
  const [sort, setSort] = useState('asc');
  const [sortBy, setSortBy] = useState('total');
  const [prevOrder, setprevOrder] = useState([]);
  // const [page, setPage] = React.useState(1);
  const [total, setTotal] = useState(1);
  const handleChange = (event, value) => {
    if (value !== page) {
      setLoading(true);
      setPage(value);
    }
  };

  const countOrderByStatus = (name) => {
    if (status === "All") {
      api.getTotalCount(name).then((response) => {
        setTotal(response);
        console.log(total);
      })
    } else {
      api.countAllOrderByStatus(status, name).then((response) => {
        setTotal(response);
      })
    }

  }
  const getOrders = async (name) => {
    if (status === "All") {
      await api.getAllOrder(name, page).then((res) => {
        setOrders(res);
      })
    } else {
      await api.getOrderByStatus(status, name, page).then((response) => {
        setOrders(response);
      })
    }
  }
  let count = Math.ceil(total / orderPerPage);
  if (count < 0) {
    count = 1;
  }

  useEffect(() => {
    countOrderByStatus(search);
  }, [search, status])
  useEffect(() => {
    getOrders(search);
    setprevOrder(orders);
    setLoading(false);
  }, [search, page, status]);

  //------------SORT
  const handleRequestSort = (event, property) => {
    const isAsc = sortBy === property && sort === 'asc';
    setSort(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  }
  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
    console.log("click");
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
    // console.log(stabilizedThis.map((el) => el[0]));
    return stabilizedThis.map((el) => el[0]);
  }
  let stt = 0;
  console.log(orders);
  return (
    <div>
      {orders === null ? (
        <div>
          <h1>{status}</h1>
          <Alert variant="filled">
            <h3>No order here</h3>
          </Alert>
        </div>
      ) : loading || prevOrder === orders ? (
        <Loading />
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>
                  #
                </TableCell>
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
              </TableRow>
            </TableHead>
            <TableBody>
              {stableSort(orders, getComparator(sort, sortBy)).map((order) => {
                const {
                  OrderID,
                } = order;
                stt += 1;
                return (
                  <OrderRow key={OrderID} order={order} status={status} stt={stt} />
                )
              })}
            </TableBody>
          </Table>
          <div className="d-flex justify-content-between align-items-center">
            <div className=" mx-3 my-3">Showing 1 to 15 of {total} entries </div>
            <Pagination className=" mx-3 my-3" variant="outlined" shape="rounded" size="large" count={count} page={page} onChange={handleChange} />
          </div>
        </TableContainer>
      )}
    </div>
  );
}

//----------------------------------
export default function OrderMain() {
  // const userData = JSON.parse(sessionStorage.getItem("user"));
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
  //------------FILTER
  const [value, setValue] = React.useState(0);
  let startDate = null;
  let endDate = null;
  const [search, setSearch] = useState("all");
  // const [page, setPage] = React.useState(1);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  let [selected, setSelected] = useState("Pending");
  const main = () => {
    console.log(selected)
    return <CollapsibleTable orderPerPage={15} status={selected} search={search} />
  }
  useEffect(() => {

  }, [startDate, endDate, search]);
  return (

    <div className="featuredItem">
      <h2>Order management</h2>
      <div>
        <div class="search-form">
          <i class="fa fa-search search-icon" aria-hidden="true"></i>
          <input
            type="text"
            class="search-input"
            placeholder="OrderID"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                // setPage(1);
                setSearch(e.target.value === "" ? "all" : e.target.value);
              }
            }}
          />
        </div>
      </div>
      <hr>
      </hr>
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