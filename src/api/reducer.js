const reducer = (state, action) => {
  switch (action.type) {
    case "CLEAR_CART":
      return { ...state, cart: [] };

    case "REMOVE":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    case "GET_TOTALS":
      let { total, amount } = state.cart.reduce(
        (cartTotal, cartitem) => {
          const { price, amount } = cartitem;
          const itemTotal = price * amount;
          cartTotal.amount += amount;
          cartTotal.total += itemTotal;
          return cartTotal;
        },
        {
          total: 0,
          amount: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      return { ...state, total, amount };

    case "TOGGLE_AMOUNT":
      let tpCart = state.cart
        .map((item) => {
          if (item.id === action.payload.id) {
            if (action.payload.type === "inc") {
              return { ...item, amount: item.amount + 1 };
            }
            if (action.payload.type === "dec") {
              return { ...item, amount: item.amount - 1 };
            }
          }
          return item;
        })
        .filter((item) => item.amount !== 0);
      return { ...state, cart: tpCart };
    default:
      throw new Error("no matching error");
  }
};

export default reducer;
