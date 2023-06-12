const express = require('express');
const router = express.Router();

const { addToCart, getCartItems, updateCartItem, removeCartItem, clearCart, getCartItemByProductId, addCartLogs } = require('../controllers/cartController');
const { isAuthenticatedUser } = require('../middlewares/auth');

router.route('/cart').get(isAuthenticatedUser, getCartItems);
router.route('/cart/add').post( isAuthenticatedUser, addToCart);
router.route('/cart/populate').post( isAuthenticatedUser, addCartLogs);
router.route('/cart/item/:id').put(isAuthenticatedUser, updateCartItem);
router.route('/cart/item/:id').delete(isAuthenticatedUser, removeCartItem); 
router.route('/cart/').delete(isAuthenticatedUser, clearCart); 
router.route('/cart/:productId').get(isAuthenticatedUser, getCartItemByProductId);


module.exports = router;
