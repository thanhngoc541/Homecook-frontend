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
import Swal from "sweetalert2";
const Menu = (props) => {
  const [isRemoved, setIsRemove] = useState(false);
  if (props == null) return null;

  const { MenuID, MenuName, HomeCookName, rating, MenuURL, MenuDescription, handleDelete, setSelectedMenu } = props;
  function isImgLink(url) {
    if (typeof url !== 'string') return false;
    return (url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi) != null);
  }

  if (isRemoved) return null; else
    return (
      <Col
        key={MenuID}
        sm={6}
        lg={4}

        className="media bg-white shadow-sm rounded align-items-center text-sm p-3">
        <Fade in>
          {setSelectedMenu == null ? <Card className="p-0 " style={{ height: '100px' }} >
            <Link to={`/menu/${MenuID}`} style={{ height: '100%' }} >
              <CardBody className="row p-2" style={{ height: '100%' }} >
                <Col lg={3} md={4} sm={3} xs={2} width="100%" style={{ height: '100%', padding: 'none' }} className="bg-light rounded p-0 mx-3">
                  <CardImg className="m-auto" top style={{ height: '100%' }} src={isImgLink(MenuURL) ? MenuURL :
                    "https://incucdep.com/wp-content/uploads/2019/03/mau-thiet-ke-menu-bang-phan2.jpg"}
                    alt="MenuIMG" />
                </Col>
                <Col lg={{ size: "auto" }} md={{ size: "auto" }} sm={{ size: "auto" }} xs={9} className="mx-0 py-0">
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
            {handleDelete != null ?
              <div className="position-absolute fixed-bottom">
                <button onClick={() => { handleDelete(MenuID, () => { setIsRemove(true); }); }}
                  class="btn btn-outline-danger btn-lg rounded border-0 float-right nhover
            "
                  type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i class="fa fa-trash"></i></button>
              </div> : null
            }
          </Card > : <Card onClick={()=>{setSelectedMenu(MenuID)}} className="p-0 " style={{ height: '100px' }} >

            <CardBody className="row p-2" style={{ height: '100%' }} >
              <Col lg={3} md={4} sm={3} xs={2} width="100%" style={{ height: '100%', padding: 'none' }} className="bg-light rounded p-0 mx-3">
                <CardImg className="m-auto" top style={{ height: '100%' }} src={isImgLink(MenuURL) ? MenuURL :
                  "https://incucdep.com/wp-content/uploads/2019/03/mau-thiet-ke-menu-bang-phan2.jpg"}
                  alt="MenuIMG" />
              </Col>
              <Col lg={{ size: "auto" }} md={{ size: "auto" }} sm={{ size: "auto" }} xs={9} className="mx-0 py-0">
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

            {handleDelete != null ?
              <div className="position-absolute fixed-bottom">
                <button onClick={() => { handleDelete(MenuID, () => { setIsRemove(true); }); }}
                  class="btn btn-outline-danger btn-lg rounded border-0 float-right nhover
            "
                  type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i class="fa fa-trash"></i></button>
              </div> : null
            }
          </Card >}

        </Fade >
      </Col>
    );
};
export default Menu;
