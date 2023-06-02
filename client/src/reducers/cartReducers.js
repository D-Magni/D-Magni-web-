import {
  ADD_TO_CART,
  GET_CART_ITEMS,
  UPDATE_CART_ITEM,
  REMOVE_CART_ITEM,
  CLEAR_CART,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";

const cartReducer = (state = { cartItems: [], shippingInfo: {} }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
    case UPDATE_CART_ITEM:
      const newItem = action.payload;

      const existingItem = state.cartItems.find(
        (item) => item.productId === newItem.productId
      );

      if (existingItem) {
        // Product already exists in the cart, update quantity
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.productId === existingItem.productId ? newItem : item
          ),
        };
      } else {
        // Product doesn't exist in the cart, add new item
        return {
          ...state,
          cartItems: [...state.cartItems, newItem],
        };
      }
    case GET_CART_ITEMS:
      return {
        ...state,
        cartItems: action.payload.cartItems,
      };

    // cartReducer function
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item._id !== action.payload.itemId
        ),
      };

    case CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      };
    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
