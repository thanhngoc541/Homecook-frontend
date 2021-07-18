import React, { useState } from "react";
import api from "../../api";
import { Col, Card, CardBody, CardTitle, CardText, CardImg } from "reactstrap";
import { Fade, Stagger } from "react-animation-components";
import { Link, NavLink } from "react-router-dom";
import Popup from "reactjs-popup";
import { useGlobalContext } from "./context";
import DishDetail from "./DishDetail";
import Swal from "sweetalert2";
import DishForm from "../items/DishForm";

const Dish = ({ dish, handleRemoveDish, key, deleteDish }) => {
  const { addToCart, amount } = useGlobalContext();
  const [isNull, setIsNull] = useState(false);
  const [Dish, setDish] = useState(dish);
  const updateDish = async (tDish) => {
    api.updateDish(tDish).then((res) => {
      if (res.ok) {
        setDish(tDish);
        Swal.fire("Updated!", "Your dish has been updated.", "success");
      }
    });
  };
  const handleAddCart = (e) => {
    if (amount > 19) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Your cart cannot have more than 20 dishes!",
      });
      return;
    } else {
      addToCart(e, Dish);
    }
  };

  if (!dish.ImageURL.startsWith("https"))
    dish.ImageURL =
      "https://upload.wikimedia.org/wikipedia/commons/f/fb/Vegan_logo.svg";

  let {
    DishId,
    Description,
    ImageURL,
  } = Dish;

  if (!ImageURL.startsWith("https"))
    ImageURL =
      "https://www.greenqueen.com.hk/wp-content/uploads/2020/03/pure-vegan-heaven-1.jpg";
  if (isNull) return null;
  else
    return (
      <Col
        key={key}
        sm={6}
        lg={3}
        className="mb-3 position-relative"
      >
        {/* <Popup trigger={ */}

        <div className="w-100 h-100">
          {/* <Col key={key} sm={6} lg={3} key={dish.DishId} className="mb-3 position-relative"> */}
          <Fade className="w-100 h-100" in>
            <Card>
              {deleteDish != null ? (
                <CardImg
                  top
                  src={Dish.ImageURL}
                  alt={Dish.DishName}
                  className="img-fluid dish-img rounded"
                />
              ) : (
                <Popup
                  trigger={
                    <CardImg
                      top
                      src={Dish.ImageURL}
                      alt={Dish.DishName}
                      className="img-fluid dish-img rounded"
                    />
                  }
                  modal
                >
                  {(close) => <DishDetail dish={Dish} close={close} />}
                </Popup>
              )}

              <CardBody className="dish-body">
                <CardTitle className="dish-header">
                  <h4>{Dish.DishName}</h4>
                  <h4 className="dish-price">${Dish.Price}</h4>
                </CardTitle>
                {deleteDish == null ? (
                  <button
                    className="btn btn-success"
                    onClick={(e) => handleAddCart(e)}
                  >
                    Buy Now
                  </button>
                ) : null}
                {/* {deleteDish == null && handleRemoveDish != null ? (
                    <button
                      onClick={() => {
                        handleRemoveDish(DishId, () => { setIsNull(true); })
                      }}
                      class="btn btn-outline-danger btn-lg rounded border-0 float-right 
                "
                      type="button"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Delete"
                    >
                      <i class="fa fa-trash"></i>
                    </button>
                  ) : null} */}
              </CardBody>
            </Card>
          </Fade>
        </div>
        {/* </Col > */}

        {/* } modal > */}
        {/* {(close) => <DishForm save={updateDish} isCreate={false} Dish={Dish} close={close} />} */}
        {/* </Popup > */}
        {deleteDish == null ? null : (
          <button
            onClick={() => {
              deleteDish(DishId, () => {
                setIsNull(true);
              });
            }}
            class=" position-absolute btn btn-outline-danger btn-lg rounded border-0 float-right mr-3 nhover
"
            style={{ zIndex: "10", right: "0", top: "0" }}
            type="button"
            data-toggle="tooltip"
            data-placement="top"
            title="Delete"
          >
            <i class="fa fa-remove"></i>
          </button>
        )}
      </Col>
    );
};

export default Dish;
