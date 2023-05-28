const express = require('express');
const router = express.Router();

const { addToCart, getCartItems, updateCartItem, removeCartItem } = require('../controllers/cartController');
const { isAuthenticatedUser } = require('../middlewares/auth');
router.route('/cart').get(isAuthenticatedUser, getCartItems);
router.route('/cart/add').post(isAuthenticatedUser, addToCart);
router.route('/cart/item/:id').put(isAuthenticatedUser, updateCartItem);
router.route('/cart/item/:id').delete( isAuthenticatedUser, removeCartItem);

module.exports = router;
