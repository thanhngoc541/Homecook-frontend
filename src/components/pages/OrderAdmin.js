import React, { useEffect, useState } from "react";
import Button from "reactstrap";
import api from "../../api";
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { DataGrid } from '@material-ui/data-grid';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

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


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

//---------------
export default function CollapsibleTable() {
  let [orders, setOrders] = useState([]);
  const [page, setPage] = React.useState(1);
  const [total, setTotal] = useState(1);

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('total');
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

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    console.log(order);
    // console.log(orderBy);
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);

  }
  //-----------SORTING
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    console.log(orders);
    return stabilizedThis.map((el) => el[0]);
  }
  return (
    <div className="featuredItem">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell
                key="ReceiverName"
                id="ReceiverName"
                style={{ fontWeight: "bold", fontSize: "20px" }}
                sortDirection={orderBy === 'ReceiverName' ? order : false}
              >
                <TableSortLabel
                  active={orderBy === 'ReceiverName'}
                  direction={orderBy === 'ReceiverName' ? order : 'asc'}
                  onClick={createSortHandler('ReceiverName')}
                >
                  {'Customer name'}
                  {orderBy === 'ReceiverName' ? (
                    console.log('name')
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell
                field='phone'
                style={{ fontWeight: "bold", fontSize: "20px" }}
                align="left">Phone
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", fontSize: "20px" }}
                align="left">Address</TableCell>
              <TableCell
                id= "Status"
                key="Status"
                style={{ fontWeight: "bold", fontSize: "20px" }}
                align="left"
                sortDirection={orderBy === 'Status' ? order : false}>
                  
                <TableSortLabel
                  active={orderBy === 'Status'}
                  direction={orderBy === 'Status' ? order : 'asc'}
                  onClick={createSortHandler('Status')}
                >
                  {'Status'}
                </TableSortLabel>
              </TableCell>
              <TableCell
                key="Total"
                id="Total"
                style={{ fontWeight: "bold", fontSize: "20px" }}
                align="left"
                sortDirection={orderBy === 'Total' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'Total'}
                  direction={orderBy === 'Total' ? order : 'asc'}
                  onClick={createSortHandler('Total')}
                >
                  {'Total'}                
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              stableSort(orders, getComparator(order, orderBy))
                .map((order) => {
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
