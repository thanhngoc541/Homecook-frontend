import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Table
} from "reactstrap";
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Swal from "sweetalert2";
import Fab from '@material-ui/core/Fab';
import api from "../../api";
import Pagination from '@material-ui/lab/Pagination';

function HomecookList(props) {
  let [homecooks, setHomecooks] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    console.log(page);
  }
  const getHomecookCount = () => {
    api.countByRole("homecook").then((response) => {
      setTotal(response);
    })
  }
  const getHomecook = () => {
    api.getAllAccountByRole("homecook").then((response) => {
      setHomecooks(response);
    })
  }
  let stt = 0;
  const count = Math.ceil(total / 15);
  useEffect(() => {
    getHomecook();
    getHomecookCount();
    console.log(total);
    console.log(homecooks);
  }, [page, count, homecooks]);
  //--------
  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));
  const classes = useStyles();
  //--------
  const userData = JSON.parse(sessionStorage.getItem("user"));
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
      if (result.isConfirmed) {
        api.changeUserStatus(id, status).then((res) => {
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
        <thead scope="row">
          <tr>
            <th>#</th>
            <th>Full name</th>
            <th>Address</th>
            <th>Phone number</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            homecooks.map((homecook) => {
              const {
                UserID,
                FullName,
                Address,
                PhoneNumber,
                Email,
                IsActive
              } = homecook;
              stt += 1;
              return (
                <tr key={Email}>
                  <td scope="row">{stt}</td>
                  <td>{FullName}</td>
                  <td>{Address}</td>
                  <td>{PhoneNumber}</td>
                  <td>{Email}</td>
                  {IsActive ?
                    <td>
                      {/* <Fab
                        size="small"
                        color="primary"
                        aria-label="add"
                        onClick={() => { onClicked(UserID, "False") }}>
                        <ErrorIcon />
                      </Fab> */}
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<ErrorIcon />}
                        onClick={() => { onClicked(UserID, "False"); console.log({ IsActive }) }}
                      >
                        DeActivate
                      </Button>
                    </td> :
                    <td>
                      {/* <Fab
                        size="small"
                        color="secondary"
                        aria-label="add"
                        onClick={() => { onClicked(UserID, "True") }}>
                        <CheckCircleIcon />
                      </Fab> */}
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<CheckCircleIcon />}
                        onClick={() => { onClicked(UserID, "True"); console.log({ IsActive }) }}
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
      <Pagination color="primary" variant="outlined" shape="rounded" size="large" count={count} page={page} onChange={handleChange} />
    </div>
  );
}

export default HomecookList;