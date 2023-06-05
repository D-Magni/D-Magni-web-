import axios from 'axios';
import {
  ADD_TO_CART,
  GET_CART_ITEMS,
  UPDATE_CART_ITEM,
  REMOVE_CART_ITEM,
  CLEAR_CART,
  SAVE_SHIPPING_INFO
} from '../constants/cartConstants';

// Get cart items
export const getCartItems = () => async (dispatch, getState) => {
  try {
    const { auth } = getState();

    if (auth.isAuthenticated) {
      const { data } = await axios.get('/api/v1/cart');
      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      const mergedCartItems = [...cartItems, ...data.cartItems.filter(item => !cartItems.some(existingItem => existingItem._id === item._id))];

      localStorage.setItem('cartItems', JSON.stringify(mergedCartItems));

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
// Add product to cart
  export const addToCart = (productId, quantity) => async (dispatch, getState) => {
    try {
      const { auth, cart } = getState();
  
      const { data } = await axios.get(`/api/v1/product/${productId}`);
      if (auth.isAuthenticated) {
  
        const cartItem = {
          productId, 
          name: data.product.name,
          price: data.product.price,
          image: data.product.images[0].url,
          quantity
        };
  
        // Post the cartItem to '/api/v1/cart/add'
        await axios.post('/api/v1/cart/add', cartItem);
  
        const cartItems = [...cart.cartItems];
        const existingItemIndex = cartItems.findIndex(item => item._id === productId);
        if (existingItemIndex !== -1) {
          cartItems[existingItemIndex].quantity += parseInt(quantity);
        } else {
          cartItems.push(cartItem);
        }
  
        // Filter out any duplicates from the merged cartItems
        const mergedCartItems = cartItems.filter(item => !cart.cartItems.some(existingItem => existingItem._id === item._id));
  
        localStorage.setItem('cartItems', JSON.stringify(mergedCartItems));
  
        dispatch({
          type: ADD_TO_CART,
          payload: { cartItem },
        });
        await dispatch(getCartItems()); 
      } else {
  
        const cartItem = {
          productId,
          _id: productId, 
          name: data.product.name,
          price: data.product.price,
          image: data.product.images[0].url,
          quantity
        }
  
        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        const existingItemIndex = cartItems.findIndex(item => item._id === productId);
        if (existingItemIndex !== -1) {
          cartItems[existingItemIndex].quantity += parseInt(quantity);
        } else {
          cartItems.push(cartItem);
        }
  
  
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        dispatch({
          type: ADD_TO_CART,
          payload: cartItem,
        });
        await dispatch(getCartItems()); 
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };
  

// Update cart item quantity
export const updateCartItem = (itemId, quantity) => async (dispatch, getState) => {
  try {
    const { auth, cart } = getState();

    if (auth.isAuthenticated) {
      const { data } = await axios.put(`/api/v1/cart/item/${itemId}`, {
        quantity,
      });
      const cartItems = [...cart.cartItems];
      const updatedCartItems = cartItems.map((item) => {
        if (item._id === itemId) {
          return { ...item, quantity: parseInt(quantity) };
        }
        return item;
      });
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  
  
      dispatch({
        type: UPDATE_CART_ITEM,
        payload: data
      });
      await dispatch(getCartItems()); 

    } else {
 
      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      const updatedCartItems = cartItems.map((item) => {
        if (item._id === itemId) {
          return { ...item, quantity: parseInt(quantity) };
        }
        return item;
      });

      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      dispatch({
        type: UPDATE_CART_ITEM,
        payload: { _id: itemId, quantity: parseInt(quantity) },
      });
      await dispatch(getCartItems()); 

    }
  } catch (error) {
    // Handle error
  }
};





export const removeCartItem = (id) => async (dispatch, getState) => {
  try {
    const { auth, cart } = getState();
    const cartItems = [...cart.cartItems];

    if (auth.user) {
      // User is authenticated
      await axios.delete(`/api/v1/cart/item/${id}`);
      const updatedCartItems = cartItems.filter((item) => item._id !== id);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    
      dispatch({
        type: REMOVE_CART_ITEM,
        payload: id,
      });
    } else {
      // User is unauthenticated
      const updatedCartItems = cartItems.filter((item) => item._id !== id);
      
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
      await axios.delete('/api/v1/cart/');
    

    dispatch({
      type: CLEAR_CART,
    });
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
