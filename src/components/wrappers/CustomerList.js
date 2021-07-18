import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import api from "../../api";
import Pagination from '@material-ui/lab/Pagination';
import Swal from "sweetalert2";
import Fab from '@material-ui/core/Fab';



function CustomerList(props) {
  //------------
  let [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    console.log(page);
  }
  const getCustomerCount = () => {
    api.countByRole("customer").then((response) => {
      setTotal(response);
    })
  }
  const getCustomers = () => {
    api.getAllAccountByRole("customer").then((response) => {
      setCustomers(response);
    })
  }
  let stt = 0;
  const count = Math.ceil(total / 15);

  useEffect(() => {
    getCustomers();
    getCustomerCount();
    console.log(customers);
  }, [page, count]);
  //------------
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "80%"
    },
    button: {
      margin: theme.spacing(1),
    },
  }));
  const classes = useStyles();
  //----------------
  //--click status
  const onClicked = (id, status) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change the status!",
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        api.changeUserStatus(id, status).then((res) => {
          console.log(res);
          if (res.ok) {
            Swal.fire("Changed!", "The user status has been changed", "success");
          }
        })
      }
    })
  }
  return (
    <div className="featuredItem">
      <Table striped hover style={{ fontSize: "15px" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Full name</th>
            <th>Address</th>
            <th>Phone number</th>
            <th>Email</th>
            {/* <th>Active</th> */}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            customers.map((customer) => {
              const {
                UserID,
                FullName,
                Address,
                PhoneNumber,
                Email,
                IsActive
              } = customer;
              stt += 1;
              return (
                <tr key={UserID}>
                  <td>{stt}</td>
                  <td>{FullName}</td>
                  <td>{Address}</td>
                  <td>{PhoneNumber}</td>
                  <td>{Email}</td>
                  {IsActive ?
                    <td>
                      <Fab 
                      size="small" 
                      color="primary" 
                      aria-label="add"
                      onClick={() => {onClicked(UserID, "False")}}>
                        <ErrorIcon />
                      </Fab>
                      {/* <Button
                        classes={{ root: classes.root }}
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<ErrorIcon />}
                        onClick={() => { onClicked(UserID, "False") }}
                      >
                        DeActivate
                      </Button> */}
                    </td> :
                    <td>
                      <Fab 
                      size="small" 
                      color="secondary" 
                      aria-label="add"
                      onClick={() => {onClicked(UserID, "True")}}>
                        <CheckCircleIcon />
                      </Fab>
                      {/* <Button
                        classes={{ root: classes.root }}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<CheckCircleIcon />}
                        onClick={() => { onClicked(UserID, "True") }}
                      >
                        Activate
                      </Button> */}
                    </td>
                  }
                </tr>
              )
            })
          }
        </tbody>
      </Table>
      <Pagination color="primary" variant="outlined" shape="rounded" size="large" count={count} page={page} onChange={handleChange} />
    </div>
  );
}

export default CustomerList;