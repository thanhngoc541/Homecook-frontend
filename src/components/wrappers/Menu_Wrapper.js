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
  CardImg,
  Row,
  Media,
} from "reactstrap";
import Menu from '../items/Menu'
export default function MenuList (props) {
    var menus=props.menus;
    console.log(menus);
    return (
      <div className="container-fluid my-3">
        <h2>Menu List</h2>
        <Row>
          {menus.map((menu) => (
              <Col
                key={menu.UserID}
                md={4}
                className="media bg-white shadow-sm rounded align-items-center text-sm p-3"
              >
                <Menu {...menu} />
              </Col>
            ))}
        </Row>

       
      </div>
    );
  };