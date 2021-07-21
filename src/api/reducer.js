const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_DISH_CART":
      let newDish = { ...action.payload.dish, quantity: 1 };
      return {
        ...state,
        cart: { ...state.cart, DishItem: [...state.cart.DishItem, newDish] },
      };
    case "ADD_MENU_CART":
      let newMenu = { ...action.payload.menu, quantity: 1 };
      return {
        ...state,
        cart: { ...state.cart, MenuItem: [...state.cart.MenuItem, newMenu] },
      };
    case "CLEAR_CART":
      return {
        ...state, cart: {
          DishItem: [],
          MenuItem: []
        }
      };

    case "REMOVE":
      if (action.payload.itemType === 'dish')
        return {
          ...state,
          cart: {
            ...state.cart,
            DishItem: state.cart.DishItem.filter((item) => item.DishId !== action.payload.id)
          },
        };
      else
        return {
          ...state,
          cart: {
            ...state.cart,
            MenuItem: state.cart.MenuItem.filter((item) => item.MenuID !== action.payload.id)
          },
        };


    case "GET_TOTALS":
      let { totalDish, amountDish } = state.cart.DishItem.reduce(
        (cartTotal, cartitem) => {
          const { Price, quantity } = cartitem;
          const itemTotal = Price * quantity;
          cartTotal.amountDish += quantity;
          cartTotal.totalDish += itemTotal;
          return cartTotal;
        },
        {
          totalDish: 0,
          amountDish: 0,
        }
      );
      let { totalMenu, amountMenu } = state.cart.MenuItem.reduce(
        (cartTotal, cartitem) => {
          const { Price, quantity } = cartitem;
          const itemTotal = Price * quantity;
          cartTotal.amountMenu += quantity;
          cartTotal.totalMenu += itemTotal;
          return cartTotal;
        },
        {
          totalMenu: 0,
          amountMenu: 0,
        }
      )
      let total = parseFloat(totalDish.toFixed(2)) 
      
      + 
      
      parseFloat(totalMenu.toFixed(2));
      let amount = amountDish + amountMenu;
      return { ...state, total, amount };

    case "TOGGLE_AMOUNT":
      if (action.payload.itemType === 'dish') {
        let tpCart = state.cart.DishItem
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
        return { ...state, cart: { ...state.cart, DishItem: tpCart } };
      } else {
        let tpCart = state.cart.MenuItem
          .map((item) => {
            if (item.MenuID === action.payload.id) {
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
        return { ...state, cart: { ...state.cart, MenuItem: tpCart } };
      }
    default:
      throw new Error("no matching error");
  }
};

export default reducer;
