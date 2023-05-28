// cartActions.js

import axios from 'axios';
import {
  ADD_TO_CART,
  GET_CART_ITEMS,
  UPDATE_CART_ITEM,
  REMOVE_CART_ITEM,
  CLEAR_CART,
  SAVE_SHIPPING_INFO
} from '../constants/cartConstants';

// Add product to cart
export const addToCart = (productId, name, price, image, quantity) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post('/api/v1/cart/add', {
      productId,
      name,
      price,
      image,
      quantity
    });

    dispatch({
      type: ADD_TO_CART,
      payload: data,
    });

        // Update local storage for non-authenticated users
        const { auth } = getState();
        if (!auth.isAuthenticated) {
          const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
          const newItem = { productId, name, price, image, quantity };
          cartItems.push(newItem);
          localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }

        

  } catch (error) {
    // Handle error
  }
};

// Get cart items
export const getCartItems = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get('/api/v1/cart');

    dispatch({
      type: GET_CART_ITEMS,
      payload: data,
    });

    // Update local storage for non-authenticated users
    const { auth } = getState();
    if (!auth.isAuthenticated) {
      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      dispatch({
        type: GET_CART_ITEMS,
        payload: { cartItems },
      });
    }
  } catch (error) {
    // Handle error
  }
};

// Update cart item quantity
export const updateCartItem = (itemId, quantity) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/api/v1/cart/item/${itemId}`, {
      quantity,
    });

    dispatch({
      type: UPDATE_CART_ITEM,
      payload: data,
    });
  } catch (error) {
    // Handle error
  }
};

// Remove item from cart
export const removeCartItem = (itemId) => async (dispatch, getState) => {
  try {
    const { data } = await axios.delete(`/api/v1/cart/item/${itemId}`);

    dispatch({
      type: REMOVE_CART_ITEM,
      payload: data,
    });

    // Update local storage for non-authenticated users
    const { auth } = getState();
    if (!auth.isAuthenticated) {
      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      const updatedCartItems = cartItems.filter(
        (item) => item.productId !== itemId
      );
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    }
  } catch (error) {
    // Handle error
  }
};


// Clear cart
export const clearCart = () => async (dispatch) => {
  try {
    const { data } = await axios.delete('/api/v1/cart/clear');

    dispatch({
      type: CLEAR_CART,
      payload: data,
    });
  } catch (error) {
    // Handle error
  }
};
export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data
    })


    localStorage.setItem('shippingInfo', JSON.stringify(data))
}