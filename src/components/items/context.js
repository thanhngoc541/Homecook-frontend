import React, { useContext, useReducer, useEffect, useState } from "react";
// import { cartItems } from "../../dishData";
import reducer from "../../api/reducer";

const AppContext = React.createContext();

const getLocalStorage = () => {
  let list = localStorage.getItem("cartList");
  return list ? JSON.parse(localStorage.getItem("cartList")) : [];
};

const AppProvider = ({ children }) => {
  const initialCart = {
    cart: getLocalStorage(),
    total: 0,
    amount: 0,
  };

  const [state, dispatch] = useReducer(reducer, initialCart);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };
  const remove = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  };
  const toggleAmount = (id, type) => {
    dispatch({ type: "TOGGLE_AMOUNT", payload: { id, type } });
  };
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const addToCart = (e, dish) => {
    e.preventDefault();
    const dishInCart = state.cart.find((d) => d.DishId === dish.DishId);  
    if (!!dishInCart) {
      toggleAmount(dish.DishId, "inc");
    } else dispatch({ type: "ADD_CART", payload: { dish } });
  };

  useEffect(() => {
    dispatch({ type: "GET_TOTALS" });
    //store cart items in local storage
    localStorage.setItem("cartList", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        isCartOpen,
        openCart,
        closeCart,
        clearCart,
        remove,
        toggleAmount,
        toggleCart,
        addToCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
