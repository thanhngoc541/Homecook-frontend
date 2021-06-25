import React, { useContext, useReducer, useEffect, useState } from "react";
import { cartItems } from "../../dishData";
import reducer from "../../api/reducer";

const AppContext = React.createContext();

const initialState = {
  cart: cartItems,
  total: 0,
  amount: 0,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
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
  
    useEffect(() => {
      dispatch({ type: "GET_TOTALS" });
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
