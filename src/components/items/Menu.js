import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import {
  Input,
  InputGroup,
  Button,
  Col,
  Navbar,
  Nav,
  NavItem,
  Form,
  FormGroup,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
  CardImg
} from "reactstrap";
import { Fade } from "react-animation-components";
import { Link } from "react-router-dom";
import '../../css/utilities.css'
import api from "../../api";
const Menu = (props) => {
  const [isRemoved, setIsRemove] = useState(false);
  if (props == null) return null;
  const { MenuID, MenuName, HomeCookName, rating, MenuURL, MenuDescription, removeable } = props;

  if (isRemoved) return null; else
    return (
      <Col
        key={MenuID}
        sm={6}
        lg={4}
        className="media bg-white shadow-sm rounded align-items-center text-sm p-3">
        <Fade in>
          <Card className="p-0">
            <Link to={`/menu/${MenuID}`}>
              <CardBody className="row p-2">
                <Col md={3} className="bg-light rounded p-0 mx-3" style={{ padding: 'none' }}>
                  <CardImg className="m-auto" top width="100%" height="100%" src={MenuURL} alt="MenuIMG" />
                </Col>
                <Col md={{ size: "auto" }} className="mx-0 py-0">
                  <CardTitle className="text-dark">
                    <strong>{MenuName}</strong>
                  </CardTitle>
                  <CardSubtitle tag="h6" className="mb-2 text-muted">{HomeCookName}</CardSubtitle>
                  {/* <ReactStars
                count={5}
                value={rating}
                size={24}
                isHalf={true}
                edit={false}
                activeColor="#ffd700"
              /> */}

                </Col>
              </CardBody>
            </Link>
            {removeable ?
              <div className="position-absolute fixed-bottom">
                <button onClick={() => { api.deleteMenu(MenuID); setIsRemove(true); }}
                  class="btn btn-outline-danger btn-lg rounded border-0 float-right
            "
                  type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i class="fa fa-trash"></i></button>
              </div> : null
            }
          </Card >
        </Fade >
      </Col>
    );
};
export default Menu;
