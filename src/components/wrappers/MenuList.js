import { Col, Row } from "reactstrap";
import Menu from "../items/Menu";
export default function MenuList(props) {
  var {menus,handleDelete} = props;
  return (
   
      <Row>
        {menus.map((menu) => (
         
            <Menu handleDelete={handleDelete} {...menu} />
         
        ))}
      </Row>
 
  );
}
