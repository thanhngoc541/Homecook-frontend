import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Table, Button
} from "reactstrap";
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
  let stt= 0;
  const count = Math.ceil(total / 15);
  useEffect(() => {
    getHomecook();
    getHomecookCount();
    console.log(total);
    console.log(homecooks);
  }, [page, count]);
  return (
    <div>
      <Table bordered striped hover style={{ fontSize: "15px" }}>
        <thead>
          <th>#</th>
          <th>Full name</th>
          <th>Address</th>
          <th>Phone number</th>
          <th>Email</th>
          <th>Active</th>
          <th>Action</th>
        </thead>
        <tbody>
          {
            homecooks.map((homecook) => {
              const {
                FullName,
                Address,
                PhoneNumber,
                Email,
                IsActive
              } = homecook;
              stt +=1;
              return (
                <tr key={Email}>
                  <td>{stt}</td>
                  <td>{FullName}</td>
                  <td>{Address}</td>
                  <td>{PhoneNumber}</td>
                  <td>{Email}</td>
                  {IsActive ? <td>True</td> : <td>False</td>}
                  {/* <td>{IsActive}</td> */}
                  <td>action</td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
      <Pagination variant="outlined" shape="rounded" size="large" count={count} page={page} onChange={handleChange} />
    </div>
  );
}

export default HomecookList;