import { Col, Row } from "reactstrap";
import Menu from "../items/Menu";
export default function MenuList(props) {
  var menus = props.menus;
  console.log("From MenuList "+menus);
  return (
    <div className="container-fluid my-3">
      <h2>Menu List</h2>
      <Row>
        {menus.map((menu) => (
          <Col
            key={menu.UserID}
            sm={6}
            lg={4}
            className="media bg-white shadow-sm rounded align-items-center text-sm p-3"
          >
            <Menu {...menu} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
