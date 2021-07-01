import React, { useState } from "react";
import { Link } from 'react-router-dom'
import CartItem from "./CartItem";
import { useGlobalContext } from "./context";

export default function Cart() {
  const { cart, total, clearCart, isCartOpen, closeCart } = useGlobalContext();

  // const handleCheckout = () =>{
  //   //navigate to checkout page
  //   //close cart
  //   closeCart();
  // }
  if (cart.length === 0) {
    return (
      <section
        className={`${isCartOpen ? "cart-overlay show-cart" : "cart-overlay "}`}
      >
        <div className="cart">
          {/* cart header */}
          <button className="close-btn" onClick={closeCart}>
            <i className="fa fa-times-circle" aria-hidden="true"></i>
          </button>
          <header>
            <h2>your bag</h2>
            <h4 className="empty-cart">is currently empty</h4>
          </header>
        </div>
      </section>
    );
  }

  return (
    <>
      <section
        className={`${isCartOpen ? "cart-overlay show-cart" : "cart-overlay "}`}
      >
        <div className="cart">
          {/* cart header */}
          <button className="close-btn" onClick={closeCart}>
            <i className="fa fa-times-circle" aria-hidden="true"></i>
          </button>
          <header className="cart-header">
            <h3>Your Cart</h3>
          </header>
          {/* cart items */}
          <div className="cart-items">
            {cart.map((item) => {
              return <CartItem key={item.id} {...item} />;
            })}
          </div>
          {/* cart footer */}
          <footer>
            <hr />
            <div className="cart-total">
              <h4>
                total <span>${total}</span>
              </h4>
            </div>
            <button
              className="btn clear-btn mr-3"
            >
              <Link to="/checkout">
                Checkout
              </Link>
            </button>
            <button className="btn clear-btn" onClick={clearCart}>
              Clear cart
            </button>
          </footer>
        </div>
      </section>
    </>
  );
}
