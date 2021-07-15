import { Col, Row } from "reactstrap";
import Menu from "../items/Menu";
export default function MenuList(props) {
  var {menus,handleDelete,setSelectedMenu} = props;
  return (
   
      <Row>
        {menus.map((menu) => (
            <Menu setSelectedMenu={setSelectedMenu} handleDelete={handleDelete} {...menu} />
        ))}
      </Row>
 
  );
}
