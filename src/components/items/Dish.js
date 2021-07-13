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
  const [Dish,setDish] =useState(dish);
  const updateDish = async (tDish) => {

    api.updateDish(tDish).then((res) => {
      if (res.ok) {
        setDish(tDish);
        Swal.fire("Updated!", "Your dish has been updated.", "success");
      }

    });
  }
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
    HomeCookID,
    DishName,
    Price,
    IsAvailable,
    Description,
    ImageURL,
  } = Dish;
  console.log("asdasdasdadasda");
  console.log(Dish);
  if (!ImageURL.startsWith("https"))
    ImageURL =
      "https://upload.wikimedia.org/wikipedia/commons/f/fb/Vegan_logo.svg";
  if (isNull) return null;
  else
    return (<Popup trigger={

      <Col key={key} sm={6} lg={3} key={dish.DishId} className="mb-3">
        <Fade in>

          <Card>
            {deleteDish != null ? <CardImg
              top
              src={ImageURL}
              alt={DishName}
              className="img-fluid dish-img rounded"
            /> : <Popup
              trigger={
                <CardImg
                  top
                  src={ImageURL}
                  alt={DishName}
                  className="img-fluid dish-img rounded"
                />
              }
              modal
            >
              {(close) => <DishDetail dish={dish} close={close} />}
            </Popup>}

            <CardBody className="dish-body">
              <CardTitle className="dish-header">
                <h4>{DishName}</h4>
                <h4 className="dish-price">${Price}</h4>
              </CardTitle>
              <CardText>
                <p>
                  {`${Description.substring(0, 50)}...`}
                  {deleteDish != null ? null : <Popup
                    trigger={<button className="see-more">See more</button>}
                    modal
                  >
                    {(close) => <DishDetail dish={dish} close={close} />}
                  </Popup>}
                </p>
              </CardText>
              {deleteDish == null ? <button
                className="btn btn-success"
                onClick={(e) => handleAddCart(e)}
              >
                Add To Cart
              </button> : null}
              {deleteDish == null && handleRemoveDish != null ? (
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
              ) : null}
              {deleteDish == null ? null : <button
                onClick={() => {
                  deleteDish(DishId, () => { setIsNull(true); })
                }}
                class="btn btn-outline-danger btn-lg rounded border-0 float-right
                "
                type="button"
                data-toggle="tooltip"
                data-placement="top"
                title="Delete"
              >
                <i class="fa fa-trash"></i>
              </button>}
            </CardBody>
          </Card>


        </Fade>
      </Col >
    } modal > 
    {(close) => <DishForm save={updateDish} isCreate={false} Dish={dish} close={close} />}
    </Popup>

    );
};

export default Dish;
