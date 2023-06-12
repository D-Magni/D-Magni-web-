import axios from 'axios';
import {
  ADD_TO_CART,
  ADD_CART_LOGOUT,
  GET_CART_ITEMS,
  UPDATE_CART_ITEM,
  REMOVE_CART_ITEM,
  CLEAR_CART,
  GET_ALL_CART,
  SAVE_SHIPPING_INFO
} from '../constants/cartConstants';
//when users logs in
export const getAllCart = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/v1/cart');
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const mergedCartItems = [
      ...cartItems,
      ...data.cartItems.filter(
        (item) => !cartItems.some((existingItem) => existingItem._id === item._id)
      ),
    ];

    localStorage.setItem('cartItems', JSON.stringify(mergedCartItems));

    dispatch({
      type: GET_ALL_CART,
      payload: { cartItems: mergedCartItems },
    });

  } catch (error) {
    // Handle error
    console.error("Error fetching cart items:", error);
  }
};
export const getCartItems = () => async (dispatch, getState) => {
  try {

      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

      dispatch({
        type: GET_CART_ITEMS,
        payload: { cartItems }
      });
    
  } catch (error) {
    // Handle error
  }
};
export const addToCart = (productId, quantity) => async (dispatch, getState) => {
  try {

    const { data } = await axios.get(`/api/v1/product/${productId}`);
      const cartItem = {
        productId,
        product: data.product,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        quantity,
      };

      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      const existingItemIndex = cartItems.findIndex((item) => item.productId === productId);
      if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity += parseInt(quantity);
      } else {
        cartItems.push(cartItem);
      }

      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      dispatch({
        type: ADD_TO_CART,
        payload: { cartItems }
      });
      dispatch(getCartItems());
  } catch (error) {
    console.error('Error adding item to cart:', error);
  }
};

export const addCartLogout = (productId, quantity) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/v1/product/${productId}`);
    console.log('Product:', data.product); // Log the product details

    const cartItem = {
      productId,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      quantity,
    };

    await axios.post('/api/v1/cart/add', cartItem);

    dispatch({
      type: ADD_CART_LOGOUT,
      payload: { cartItems: [cartItem] }
    });
  } catch (error) {
    console.error('Error adding item to cart:', error);
  }
}

export const updateCartItem = (_id, quantity) => async (dispatch, getState) => {
  try {
      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      const itemToUpdate = cartItems.find((item) => item._id === _id);
      if (itemToUpdate) {
        itemToUpdate.quantity = parseInt(quantity);
      }

      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      dispatch({
        type: UPDATE_CART_ITEM,
        payload: { cartItems }
      });
    dispatch(getCartItems());
  } catch (error) {
    console.error('Error updating cart item:', error);
  }
};

export const removeCartItem = (id) => async (dispatch, getState ) => {
  try {
        const { auth } = getState()
;
 if (auth.isAuthenticated) {
 }    
   const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      const updatedCartItems = cartItems.filter((item) => item.product._id !== id);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      dispatch({
        type: REMOVE_CART_ITEM,
        payload: { itemId: id },
      });
      dispatch(getCartItems());
  } catch (error) {
    console.error('Error removing item from cart:', error);
  }
};

export const clearCart = () => async (dispatch, getState) => {
  try {
    const { auth } = getState();

    if (auth.isAuthenticated) {
      await axios.delete('/api/v1/cart');
    }

    localStorage.removeItem('cartItems');
    dispatch({ type: CLEAR_CART });
  } catch (error) {
    console.error('Error clearing cart items:', error);
  }
};

export const saveShippingInfo = (data) => async (dispatch) => {
  try {
    dispatch({
      type: SAVE_SHIPPING_INFO,
      payload: data,
    });

    localStorage.setItem('shippingInfo', JSON.stringify(data));
  } catch (error) {
    console.error('Error adding shipping inf:', error);
  }
};
