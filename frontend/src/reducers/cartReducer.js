import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      console.log("item = " + item);

      const itemExist = state.cartItems.find((i) => i.product === item.product);
      if (itemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === itemExist.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };
      break;

    default:
      return state;
  }
};
