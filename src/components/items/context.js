import React, { useContext, useReducer, useEffect, useState } from "react";
import Swal from "sweetalert2";

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
  const remove = (id) => {
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
        dispatch({ type: "REMOVE", payload: id });
        Swal.fire("Deleted!", "Your item has been deleted.", "success");
      }
    });
  };

  const toggleAmount = (id, type) => {
    if (type === "inc" && state.amount > 19) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Your cart cannot have more than 20 dishes!",
      });
      return;
    }
    dispatch({ type: "TOGGLE_AMOUNT", payload: { id, type } });
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const addToCart = (e, dish) => {
    e.preventDefault();
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "Your dish has been added!",
    });
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
