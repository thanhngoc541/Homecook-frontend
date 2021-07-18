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
import Popup from 'reactjs-popup';
import MenuForm from "../items/MenuForm";
function HomeCookMenuList({ HomeCookID, HomeCookName, setSelectedMenu }) {
  //------------
  let [menus, setMenus] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);

  var [isCreating, setIsCreating] = useState(false);
  const handleChange = (event, value) => {
    setPage(value);
    console.log(page);
  }
  const getMenuCount = () => {
    api.getTotalHomeCookMenu(HomeCookID).then((response) => {
      setTotal(response);
    })
  }
  const getMenus = () => {
    api.getMenuByHomeCookID(HomeCookID).then((response) => {
      setMenus(response);
    })
  }
  const createMenu = async (menu) => {
    if (menus.length > 5) {
      Swal.fire({
        icon: "error",
        title: "Alert!",
        text: "You cannot have more than 6 menus!",
      });
    } else {
      await api.createMenu(menu).then((res) => { menus.push(res); Swal.fire("Create success!", "Your menu has been added.", "success"); });
    }
  }
  let stt = 0;
  const count = Math.ceil(total / 15);

  useEffect(() => {
    getMenuCount();
    getMenus();
  }, [page, count]);
  //------------
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "75%"
    },
    button: {
      margin: theme.spacing(0.4),
    },
    w40: {
      width: "40%"
    }
  }));
  const classes = useStyles();
  //----------------
  //--click status
  const toggleStatus = (id, status) => {
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
        // api.changeUserStatus(id, status).then((res) => {
        //   console.log(res);
        //   if (res.ok) {
        //     Swal.fire("Changed!", "The user status has been changed", "success");
        //   }
        // })
      }
    })
  }
  const updateMenu = async (tmenu) => {
    api.updateMenu(tmenu).then((res) => {
      if (res.ok) {
        setMenus({
          ...menus,
          MenuName: tmenu.MenuName,
          MenuDescription: tmenu.MenuDescription,
          MenuURL: tmenu.MenuURL,
          IsServing: tmenu.IsServing,
        });
        Swal.fire("Updated!", "Your menu has been updated.", "success");
      }
    });
  };
  const handleDelete = (MenuID) => {
    Swal.fire({
      title: "Do you want to delete this menu?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        api.deleteMenu(MenuID).then((res) => {
          console.log(res);
          if (res != null && res.ok) {
            Swal.fire("Deleted!", "Your menu has been deleted.", "success");
      
            menus.forEach((menu, index) => {
              console.log(menu.MenuID);
              console.log(MenuID);
              console.log(index);
              console.log((menu.MenuID === MenuID));
              if (menu.MenuID == MenuID) {
                menus.splice(index, 1);
                return;
              }

            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              //footer: '<a href="">Why do I have this issue?</a>'
            })
          }
        });

      }
    });
  }
  return (
    <div className="h-100">
      <Popup open={isCreating} position="right center" onClose={() => setIsCreating(false)}>
        <MenuForm save={createMenu} isCreate={true} menu={{ HomeCookID, HomeCookName }} close={() => setIsCreating(false)}></MenuForm>
      </Popup>

      <div className="container px-5 py-3" >
        <h2>menus<span><button className=" mx-3 rounded-pill  btn btn-success"
          onClick={() => { setIsCreating(true); console.log(isCreating); }}>
          <i class=" fa fa-plus .text-dark"></i> <span>New</span>
        </button></span></h2>
        {/* <MenuList setSelectedMenu={(ID) => { selectedMenu = ID; setSelectedMenu(ID); console.log(ID); }} handleDelete={handleDelete} menus={menus}></MenuList> */}
      </div>
      <div className="featuredItem" style={{ width: "100%", height: "75vh" }}>

        <Table hover style={{ fontSize: "16px" }}>
          <thead>
            <tr>
              <th>Menu name</th>
              <th>Status</th>
              <th>Action</th>
              {/* <th>Delete</th> */}
            </tr>
          </thead>
          <tbody>
            {
              menus.map((menu) => {
                const {
                  MenuID,
                  MenuName,
                  MenuDescription,
                  IsServing,
                } = menu;
                return (


                  <tr key={MenuID} onClick={()=>{setSelectedMenu(MenuID);}}>

                    <td>{MenuName}</td>
                    {IsServing ?
                      <td>
                        <Button
                          classes={{ root: classes.root }}
                          variant="contained"
                          color="secondary"
                          className={classes.button}
                          startIcon={<ErrorIcon />}
                          onClick={() => { }}
                        >
                          Disable
                        </Button>
                      </td> :
                      <td>
                        <Button
                          classes={{ root: classes.root }}
                          variant="contained"
                          color="primary"
                          className={classes.button}
                          startIcon={<CheckCircleIcon />}
                          onClick={() => { }}
                        >
                          Active
                        </Button>
                      </td>
                    }
                    <td>
                      <Popup modal trigger={<Button
                        classes={{ root: classes.root }}
                        variant="contained"
                        color="primary"
                        className={[classes.button, classes.w40]}
                        // startIcon={<CheckCircleIcon />}
                        onClick={() => {  }}
                      >
                        Update
                      </Button>}
                        position="center center"
                      >{(close) => <MenuForm
                        save={updateMenu}
                        isCreate={false}
                        menu={menu}
                        close={() => close()}
                      ></MenuForm>}

                      </Popup>
                      <Button
                        classes={{ root: classes.root }}
                        variant="contained"
                        color="secondary"
                        className={[classes.button, classes.w40]}
                        // startIcon={<CheckCircleIcon />}
                        onClick={() => {handleDelete(MenuID) }}
                      >
                        Delete
                      </Button>
                    </td>


                  </tr>

                )
              })
            }
          </tbody>
        </Table>
      </div>
      <Pagination className="m-3" color="primary" variant="outlined" shape="rounded" size="large" count={count} page={page} onChange={handleChange} />
    </div>
  );
}

export default HomeCookMenuList;