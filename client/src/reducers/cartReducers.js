
import {
    ADD_TO_CART,
    GET_CART_ITEMS,
    UPDATE_CART_ITEM,
    REMOVE_CART_ITEM,
    CLEAR_CART,
    SAVE_SHIPPING_INFO
  } from '../constants/cartConstants';
  
  const initialState = {
    cartItems: [],
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_TO_CART:
      case UPDATE_CART_ITEM:
        return {
          ...state,
          cartItems: action.payload.cartItems,
        };
      case GET_CART_ITEMS:
        return {
          ...state,
          cartItems: action.payload.cartItems,
        };
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
          shippingInfo: action.payload
        }
      default:
        return state;
    }
  };
  
  export default cartReducer;
  