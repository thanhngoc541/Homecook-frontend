import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import api from "../../api";
import Loading from "../items/Loading";
import Pagination from '@material-ui/lab/Pagination';
import Swal from "sweetalert2";
import Fab from '@material-ui/core/Fab';



function CustomerList() {
  //------------
  let [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  let [prevAccount, setprevAccount] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("all");
  const handleChange = (event, value) => {
    setLoading(true);
    setPage(value);
    console.log(page);
  }
  const countCustomers = (username) => {
    api.getTotalSearchedAccount("customer", username).then((res) => {
      setTotal(res);
    })
  };
  const fetchAccounts = (username) => {
    api.getSearchedAccount("customer",username, page).then((res) => {
      setCustomers(res);
    })
  }
  let stt = 0;
  const count = Math.ceil(total / 15);
  useEffect(() => {
    countCustomers(search);
  }, [search]);
  useEffect(() => {
    fetchAccounts(search);
    setprevAccount(customers);
    // getCustomers();
    // getCustomerCount();
    setLoading(false);
    console.log(customers);
  }, [search, page]);
  //------------
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "60%"
    },
    button: {
      margin: theme.spacing(1),
    },
  }));
  const classes = useStyles();
  const styleActivate = {
    backgroundColor: 'crimson'
  }
  const styleDeActivate = {
    backgroundColor: 'green'
  }
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
      <div>
        <div class="search-form">
          <i class="fa fa-search search-icon" aria-hidden="true"></i>
          <input
            type="text"
            class="search-input"
            placeholder="User name"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setPage(1);
                setSearch(e.target.value == "" ? "all" : e.target.value);
              }
            }}
          />
        </div>
      </div>
      <div>
        {
          loading || customers.length < 1 || customers === prevAccount ? (
            <Loading />
          ) : (
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
                            <Button
                              classes={{ root: classes.root }}
                              variant="contained"
                              color="secondary"
                              style={styleActivate}
                              className={classes.button}
                              startIcon={<ErrorIcon />}
                              onClick={() => { onClicked(UserID, "False") }}
                            >
                              DeActivate
                            </Button>
                          </td> :
                          <td>
                            <Button
                              classes={{ root: classes.root }}
                              variant="contained"
                              color="primary"
                              style={styleDeActivate}
                              className={classes.button}
                              startIcon={<CheckCircleIcon />}
                              onClick={() => { onClicked(UserID, "True") }}
                            >
                              Activate
                            </Button>
                          </td>
                        }
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
          )
        }
      </div>
      <Pagination color="primary" variant="outlined" shape="rounded" size="large" count={count} page={page} onChange={handleChange} />
    </div>
  );
}

export default CustomerList;