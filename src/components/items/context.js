import React, { useContext, useReducer, useEffect, useState } from "react";
import Swal from "sweetalert2";

// import { cartItems } from "../../dishData";
import reducer from "../../api/reducer";

const AppContext = React.createContext();

const getLocalStorage = () => {
  let list = localStorage.getItem("cartList");
  return list ? JSON.parse(localStorage.getItem("cartList")) : {
    DishItem: [],
    MenuItem: []
  };
};

const AppProvider = ({ children }) => {
  let list = localStorage.getItem("cartList");

  let initialCart = {
    cart: getLocalStorage(),
    total: 0,
    amount: 0,
  };
  if (list) initialCart = {
    cart: JSON.parse(localStorage.getItem("cartList")),
    total: 0,
    amount: 0,
  };

  const [state, dispatch] = useReducer(reducer, initialCart);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const clearCart = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: "CLEAR_CART" });
        Swal.fire("Deleted!", "Your cart has been deleted.", "success");
      }
    });
  };
  const remove = (id, itemType) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: "REMOVE", payload: { id, itemType } });
        Swal.fire("Deleted!", "Your item has been deleted.", "success");
      }
    });
  };

  const toggleAmount = (id, type, itemType) => {

    dispatch({ type: "TOGGLE_AMOUNT", payload: { id, type, itemType } });
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const addToCart = (e, dish) => {
    e.preventDefault();
    if (state.amount > 19) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Your cart cannot have more than 20 dishes/menus!",
      });
      return;
    }
    const dishInCart = state.cart.DishItem.find((d) => d.DishId === dish.DishId);
    if (!!dishInCart) {
      toggleAmount(dish.DishId, "inc", "dish");
    } else dispatch({ type: "ADD_DISH_CART", payload: { dish } });
  };
  const addMenuToCart = (e, menu) => {
    e.preventDefault();
    if (state.amount > 19) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Your cart cannot have more than 20 dishes/menus!",
      });
      return;
    }
    const menuInCart = state.cart.MenuItem.find((m) => m.MenuID === menu.MenuID);
    if (!!menuInCart) {
      toggleAmount(menu.MenuID, "inc", "menu");
    } else dispatch({ type: "ADD_MENU_CART", payload: { menu } });
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
        addMenuToCart
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
