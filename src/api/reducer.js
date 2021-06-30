const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_CART":
      let newDish = { ...action.payload.dish, amount: 1 };
      return {
        ...state,
        cart: [...state.cart, newDish],
      };

    case "CLEAR_CART":
      return { ...state, cart: [] };

    case "REMOVE":
      return {
        ...state,
        cart: state.cart.filter((item) => item.DishId !== action.payload.id),
      };

    case "GET_TOTALS":
      let { total, amount } = state.cart.reduce(
        (cartTotal, cartitem) => {
          const { Price, amount } = cartitem;
          const itemTotal = Price * amount;
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
          if (item.DishId === action.payload.id) {
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
