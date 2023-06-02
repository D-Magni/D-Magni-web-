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
export const addToCart = (productId, quantity) => async (dispatch, getState) => {
  try {
    const { auth } = getState();

    const { data } = await axios.get(`/api/v1/product/${productId}`);
    const cartItem = {
      productId,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      quantity
    };

    if (auth.isAuthenticated) {
      // Post the cartItem to '/api/v1/cart/add'
      await axios.post('/api/v1/cart/add', cartItem);
    } else {
      dispatch({
        type: ADD_TO_CART,
        payload: cartItem,
      });

      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      const existingItem = cartItems.find(item => item.productId === productId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cartItems.push(cartItem);
      }
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    dispatch({
      type: ADD_TO_CART,
      payload: cartItem,
    });
  } catch (error) {
    console.error('Error adding item to cart:', error);
  }
};
// Get cart items
export const getCartItems = () => async (dispatch, getState) => {
  try {
    const { auth } = getState();

    if (auth.isAuthenticated) {
      const { data } = await axios.get('/api/v1/cart');

      dispatch({
        type: GET_CART_ITEMS,
        payload: data,
      });
    } else {
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
export const updateCartItem = (itemId, quantity) => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    
    if (auth.isAuthenticated) {
      const { data } = await axios.put(`/api/v1/cart/item/${itemId}`, {
        quantity,
      });

      dispatch({
        type: UPDATE_CART_ITEM,
        payload: data,
      });
    } else {
      dispatch({
        type: UPDATE_CART_ITEM,
        payload: { _id: itemId, quantity },
      });

      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      const updatedCartItems = cartItems.map(item => {
        if (item._id === itemId) {
          return { ...item, quantity };
        }
        return item;
      });

      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    }
  } catch (error) {
    // Handle error
  }
};

export const removeCartItem = (id) => async (dispatch, getState) => {
  try {
    const { auth } = getState();

    if (auth.user) {
      // User is authenticated
      await axios.delete(`/api/v1/cart/item/${id}`);
      dispatch({
        type: REMOVE_CART_ITEM,
        payload: id,
      });
    } else {
      // User is unauthenticated
      const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      const updatedCartItems = cartItems.filter(
        (item) => item._id !== id
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      dispatch({
        type: REMOVE_CART_ITEM,
        payload: id,
      });
    }
  } catch (error) {
    // Handle error
  }
};



// Clear cart
export const clearCart = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CLEAR_CART,
    });

    const { auth } = getState();

    if (auth.isAuthenticated) {
      await axios.delete('/api/v1/cart/clear');
    } else {
      localStorage.removeItem('cartItems');
    }
  } catch (error) {
    // Handle error
  }
};

export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data
  });

  localStorage.setItem('shippingInfo', JSON.stringify(data));
};
