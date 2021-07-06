import { Col, Row } from "reactstrap";
import Menu from "../items/Menu";
export default function MenuList(props) {
  var {menus,removeable} = props;
  return (
   
      <Row>
        {menus.map((menu) => (
         
            <Menu removeable={removeable} {...menu} />
         
        ))}
      </Row>
 
  );
}
