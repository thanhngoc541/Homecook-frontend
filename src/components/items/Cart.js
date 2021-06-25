import React, { useState } from "react";
import CartItem from "./CartItem";
import { useGlobalContext } from "./context";

export default function Cart() {
  const { cart, total, clearCart, isCartOpen, closeCart } = useGlobalContext();

  if (cart.length === 0) {
    return (
      <section className={`${isCartOpen ? "cart show-cart" : "cart"}`}>
        {/* cart header */}
        <button className="close-btn" onClick={closeCart}>
          <i class="fa fa-times-circle" aria-hidden="true"></i>
        </button>
        <header>
          <h2>your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }

  return (
    <>
      <section className={`${isCartOpen ? "cart show-cart" : "cart"}`}>
        {/* cart header */}
        <button className="close-btn" onClick={closeCart}>
          <i class="fa fa-times-circle" aria-hidden="true"></i>
        </button>
        <header className="cart-header">
          <h3>Your Cart</h3>
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
              total <span>${total}</span>
            </h4>
          </div>
          <button className="btn clear-btn" onClick={clearCart}>
            clear cart
          </button>
        </footer>
      </section>
    </>
  );
}
