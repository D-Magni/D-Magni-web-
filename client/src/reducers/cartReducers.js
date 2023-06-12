import {
  ADD_TO_CART,
  GET_CART_ITEMS,
  UPDATE_CART_ITEM,
  REMOVE_CART_ITEM,
  CLEAR_CART,
  SAVE_SHIPPING_INFO,
  ADD_CART_LOGS,
  GET_ALL_CART,
} from "../constants/cartConstants";

const cartReducer = (state = { cartItems: [], shippingInfo: {} }, action) => {
  switch (action.type) {
      case ADD_TO_CART:
        const newItem = action.payload.cartItems[action.payload.cartItems.length - 1];
        const existingItemIndex = state.cartItems.findIndex(
          (item) => item.product._id === newItem.product._id
        );
      
        if (existingItemIndex !== -1) {
          // Product already exists in the cart, update quantity
          return {
            ...state,
            cartItems: state.cartItems.map((item, index) =>
              index === existingItemIndex ? { ...item, quantity: newItem.quantity } : item
            ),
          };
        } else {
          // Product doesn't exist in the cart, add new item
          return {
            ...state,
            cartItems: [...state.cartItems, newItem],
          };
        }
    case GET_ALL_CART:
    case GET_CART_ITEMS:
      return {
        ...state,
        cartItems: action.payload.cartItems,
      };
      case UPDATE_CART_ITEM:
        const { _id, quantity } = action.payload;
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item._id === _id ? { ...item, quantity } : item
          ),
        };
  
    // cartReducer function
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item._id !== action.payload.id
        ),
      };
      case ADD_CART_LOGS:
        return {
          ...state,
          cartItems: action.payload.cartItems,
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
