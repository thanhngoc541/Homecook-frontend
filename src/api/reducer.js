const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_CART":
      let newDish = { ...action.payload.dish, quantity: 1 };
      return {
        ...state,
        cart: [...state.cart, newDish],
      };

    case "CLEAR_CART":
      return { ...state, cart: [] };

    case "REMOVE":
      return {
        ...state,
        cart: state.cart.filter((item) => item.DishId !== action.payload),
      };

    case "GET_TOTALS":
      let { total, amount } = state.cart.reduce(
        (cartTotal, cartitem) => {
          const { Price, quantity } = cartitem;
          const itemTotal = Price * quantity;
          cartTotal.amount += quantity;
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
              return { ...item, quantity: item.quantity + 1 };
            }

            if (action.payload.type === "dec") {
              return { ...item, quantity: item.quantity - 1 };
            }
          }
          return item;
        })
        .filter((item) => item.quantity !== 0);
      return { ...state, cart: tpCart };
    default:
      throw new Error("no matching error");
  }
};

export default reducer;
