const Cart = require('../models/cart');
const Product = require('../models/product');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Add product to cart => POST /api/v1/cart/add
exports.addToCart = catchAsyncErrors(async (req, res, next) => {
  const { productId } = req.body;
  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  const cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    // Cart exists for the user, update cart items
    const itemExists = cart.cartItems.find(
      (item) => item.product.toString() === productId
    );

    if (itemExists) {
      // Product already exists in the cart, update quantity
      await Cart.findOneAndUpdate(
        {
          user: req.user._id,
          'cartItems.product': productId,
        },
        {
          $inc: { 'cartItems.$.quantity': 1 },
        }
      );
    } else {
      // Product doesn't exist in the cart, add new cart item
      await Cart.findOneAndUpdate(
        { user: req.user._id },
        {
          $push: {
            cartItems: {
              product: productId,
              quantity: 1,
              name: product.name,
              image: product.images[0].url, // Access the URL from the first image object
              price: product.price,
            },
          },
        }
      );
    }
  } else {
    // Cart doesn't exist for the user, create a new cart
    const newCart = await Cart.create({
      user: req.user._id,
      cartItems: [
        {
          product: productId,
          quantity: 1,
          name: product.name,
          image: product.images[0].url, // Access the URL from the first image object
          price: product.price,
        },
      ],
    });
  }

  res.status(200).json({
    success: true,
    message: 'Product added to cart',
  });
});

// Get cart items => GET /api/v1/cart
exports.getCartItems = catchAsyncErrors(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate(
    'cartItems.product',
    'name price image'
  );

  res.status(200).json({
    success: true,
    cartItems: cart ? cart.cartItems : [],
  });
});

// Update cart item => PUT /api/v1/cart/:id
exports.updateCartItem = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { quantity } = req.body;

  const cartItem = await Cart.findOneAndUpdate(
    { 'cartItems._id': id },
    { $set: { 'cartItems.$.quantity': quantity } },
    { new: true }
  );

  if (!cartItem) {
    return next(new ErrorHandler('Cart item not found', 404));
  }

  res.status(200).json({
    success: true,
    cartItem,
  });
});

// Remove cart item => DELETE /api/v1/cart/:id
exports.removeCartItem = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const cart = await Cart.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { cartItems: { _id: id } } },
    { new: true }
  );

  if (!cart) {
    return next(new ErrorHandler('Cart not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Cart item removed',
  });
});

// Clear cart => DELETE /api/v1/cart/clear
exports.clearCart = catchAsyncErrors(async (req, res, next) => {
  const cart = await Cart.findOneAndUpdate(
    { user: req.user._id },
    { cartItems: [] },
    { new: true }
  );

  if (!cart) {
    return next(new ErrorHandler('Cart not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Cart cleared',
  });
});
