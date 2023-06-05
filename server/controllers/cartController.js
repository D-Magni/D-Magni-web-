const Cart = require('../models/cart');
const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');


// Add product to cart => POST /api/v1/cart/add
exports.addToCart = catchAsyncErrors(async (req, res, next) => {
  const { productId, quantity } = req.body;
  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  let cart;
    // User is authenticated
    cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        cartItems: [],
      });
    }
  
  const itemIndex = cart.cartItems.findIndex(
    (item) => item.product.toString() === productId
  );

  if (itemIndex !== -1) {
    // Product already exists in the cart, update quantity
    cart.cartItems[itemIndex].quantity += quantity;
  } else {
    // Product doesn't exist in the cart, add new cart item
    cart.cartItems.push({
      product: productId,
      quantity,
      name: product.name,
      image: product.images[0].url,
      price: product.price,
    });
  }

  await cart.save();

  res.status(200).json({
    success: true,
    message: 'Product added to cart',
  });
});



// Get cart items => GET /api/v1/cart
exports.getCartItems = catchAsyncErrors(async (req, res, next) => {
  let cart;

    // User is authenticated
    cart = await Cart.findOne({ user: req.user._id }).populate(
      'cartItems.product',
      'name price image'
    );
  
});

// Update cart item => PUT /api/v1/cart/:id
exports.updateCartItem = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { quantity } = req.body;

  let cart;
    // User is authenticated
    cart = await Cart.findOne({ user: req.user._id }).populate('cartItems.product');

    const itemIndex = cart.cartItems.findIndex(
      (item) => item._id.toString() === id.toString()
    );
    

  if (itemIndex !== -1) {
    cart.cartItems[itemIndex].quantity = quantity;
    await cart.save();

    res.status(200).json({
      success: true,
      cartItem: cart.cartItems[itemIndex],
    });
  } else {
    return next(new ErrorHandler('Cart item not found', 404));
  }
});


// Remove cart item => DELETE /api/v1/cart/:id
exports.removeCartItem = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  let cart;
    // User is authenticated
    cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return next(new ErrorHandler('Cart not found', 404));
    }

    const itemIndex = cart.cartItems.findIndex(
      (item) => item._id.toString() === id
    );

    if (itemIndex !== -1) {
      cart.cartItems.splice(itemIndex, 1);
      await cart.save();

      res.status(200).json({
        success: true,
        message: 'Cart item removed',
        cartItems: cart.cartItems // Return the updated cart items
      });

      const itemIndex = cartItems.findIndex((item) => item._id.toString() === id);
      if (itemIndex !== -1) {
        cartItems.splice(itemIndex, 1);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        return res.status(200).json({
          success: true,
          message: 'Cart item removed',
          cartItems: cartItems, // Return the updated cart items
        });
      } 
      else {
        return next(new ErrorHandler('Cart item not found', 404));
      }

  } 
});



// Clear cart => DELETE /api/v1/cart/clear
exports.clearCart = catchAsyncErrors(async (req, res, next) => {
  let cart;
    // User is authenticated
    cart = await Cart.findOne({ user: req.user._id });
  
    

  if (cart) {
    cart.cartItems = [];
    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Cart cleared',
    });
  } else {
    return next(new ErrorHandler('Cart not found', 404));
  }
});
