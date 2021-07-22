import { Col, Row } from "reactstrap";
import Menu from "../items/Menu";
export default function MenuList(props) {
  var {menus,handleDelete,setSelectedMenu} = props;
  console.log(menus);
  return (
    <Row className="container my-0 px-0 mx-auto">
      {menus.map((menu) => (
        <Menu
          key={menu.MenuID}
          setSelectedMenu={setSelectedMenu}
          handleDelete={handleDelete}
          {...menu}
        />
      ))}
    </Row>
  );
}
