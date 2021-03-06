import React from "react";
import { withRouter } from "react-router-dom";
import CartItem from "./CartItem";
import CartMenuItem from "./CartMenuItem";
import { useGlobalContext } from "./context";

function Cart(props) {
  const { cart, total, clearCart, isCartOpen, closeCart } = useGlobalContext();

  const userData = JSON.parse(sessionStorage.getItem("user"));
  const handleCheckout = () => {
    closeCart();
    if (userData == null) {
      return props.history.push("/login");
    } else {
      return props.history.push("/checkout");
    }
  };

  if (cart?.MenuItem?.length === 0 && cart?.DishItem?.length === 0) {
    return (
      <>
        {isCartOpen && (
          <section className="bg-mask" onClick={closeCart}></section>
        )}
        <section
          className={`${
            isCartOpen ? " cart empty-cart show-cart" : "cart empty-cart"
          }`}
        >
          {/* cart header */}
          <button className="close-btn" onClick={closeCart}>
            <i className="fa fa-times-circle" aria-hidden="true"></i>
          </button>
          <header>
            <h2>your bag</h2>
            <h4 className="empty-cart-text">is currently empty</h4>
          </header>
        </section>
      </>
    );
  }

  return (
    <>
      {isCartOpen && (
        <section className="bg-mask" onClick={closeCart}></section>
      )}
      <section className={`${isCartOpen ? " cart show-cart" : "cart"}`}>
        {/* cart header */}
        <button className="close-btn" onClick={closeCart}>
          <i className="fa fa-times-circle" aria-hidden="true"></i>
        </button>
        <header className="cart-header">
          <h3>Your Cart</h3>
        </header>
        {/* cart items */}
        <div className="cart-items">
          {cart.MenuItem?.length > 0 && <h6>Menu List</h6>}
          {cart.MenuItem.map((item) => {
            return <CartMenuItem key={item.id} {...item} />;
          })}
          {cart.DishItem?.length > 0 && <h6>Dishes List</h6>}
          {cart.DishItem.map((item) => {
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

          <button className="btn clear-btn mr-3" onClick={handleCheckout}>
            Checkout
          </button>

          <button className="btn clear-btn" onClick={clearCart}>
            Clear cart
          </button>
        </footer>
      </section>
    </>
  );
}

export default withRouter(Cart);
