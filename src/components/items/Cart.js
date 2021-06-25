import React, { useState } from "react";
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
import CartItem from "./CartItem";

export default function Cart() {
  //   const { cart, total, clearCart } = useGlobalContext();
  const cart = [
    {
      id: 1,
      title: "Samsung Galaxy S7",
      price: 599.99,
      img: "https://res.cloudinary.com/diqqf3eq2/image/upload/v1583368215/phone-2_ohtt5s.png",
      amount: 1,
    },
    {
      id: 2,
      title: "google pixel ",
      price: 499.99,
      img: "https://res.cloudinary.com/diqqf3eq2/image/upload/v1583371867/phone-1_gvesln.png",
      amount: 1,
    },
  ];

  const [isCartOpen, setIsCartOpen] = useState(false);
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  return (
    <>
      <Navbar light expand="md" className="container shadow-sm">
        <Nav navbar className="ml-auto">
          <NavItem>
            <Button onClick={toggleCart}>
              <i
                class="fa fa-shopping-cart fa-lg cart-toggle"
                aria-hidden="true"
              ></i>
            </Button>
          </NavItem>
        </Nav>
      </Navbar>

      <section className={`${isCartOpen ? "cart show-cart" : "cart"}`}>
        {/* cart header */}
        <header>
          <h2>Your Cart</h2>
        </header>
        {/* cart items */}
        <div>
          {cart.map((item) => {
            return <CartItem key={item.id} {...item} />;
          })}
        </div>
        {/* cart footer */}
        <footer>
          <hr />
          <div className="cart-total">
            <h4>
              total <span>$0</span>
            </h4>
          </div>
          <button className="btn clear-btn" onClick={console.log("clear")}>
            clear cart
          </button>
        </footer>
      </section>
    </>
  );
}
