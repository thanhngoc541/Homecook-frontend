import React from "react";
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
const   Menu = (props) => {
  if (props == null) return null;
  const { MenuID,MenuName, HomeCookName, rating, MenuURL, MenuDescription } = props;

  return (
    <Fade in>
      <Link to={`/menu/${MenuID}`}>
        <Card className="p-0">
          <CardBody className="row p-2">
            <Col md={3} className="bg-light rounded p-0 mx-3" style={{ padding: 'none' }}>
              <CardImg className="m-auto" top width="100%" height="100%" src={MenuURL} alt="MenuIMG" />
            </Col>
            <Col md={{ size: "auto" }} className="mx-3 py-2">
              <CardTitle className="text-dark">
                <strong>{MenuName}</strong>
              </CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">{HomeCookName}</CardSubtitle>
              <ReactStars
                count={5}
                value={rating}
                size={24}
                isHalf={true}
                edit={false}
                activeColor="#ffd700"
              />
            </Col>
          </CardBody>
        </Card>
        </Link>
      </Fade>
  );
};
export default Menu;
