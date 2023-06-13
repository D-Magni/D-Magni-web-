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
  if (req.user) {
    // User is authenticated
    cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        cartItems: [],
      });
    }

    const itemExists = cart.cartItems.some(
      (item) => item.product.toString() === productId
    );

    if (itemExists) {
      // Product already exists in the cart, update quantity
      cart.cartItems.forEach((item) => {
        if (item.product.toString() === productId) {
          item.quantity += quantity;
        }
      });
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
  } else {
    // User is unauthenticated
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

    const itemExists = cartItems.some(
      (item) => item.product.toString() === productId
    );

    if (itemExists) {
      // Product already exists in the cart, update quantity
      cartItems.forEach((item) => {
        if (item.product.toString() === productId) {
          item.quantity += quantity;
        }
      });
    } else {
      // Product doesn't exist in the cart, add new cart item
      cartItems.push({
        product: productId,
        quantity,
        name: product.name,
        image: product.images[0].url,
        price: product.price,
      });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    res.status(200).json({
      success: true,
      message: 'Product added to cart',
    });
  }
});
exports.addCartLogs = catchAsyncErrors(async (req, res, next) => {
  const { productId, quantity } = req.body;
  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  let cart;
  if (req.user) {
    // User is authenticated
    cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        cartItems: [],
      });
    }

    let itemExists = false; // Flag to check if the item exists in the cart

    for (let i = 0; i < cart.cartItems.length; i++) {
      if (cart.cartItems[i].product.toString() === productId) {
        // Product already exists in the cart, override quantity and item
        cart.cartItems[i] = {
          product: productId,
          quantity,
          name: product.name,
          image: product.images[0].url,
          price: product.price,
        };
        itemExists = true;
        break; // Exit the loop once the item is overridden
      }
    }

    if (!itemExists) {
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
  }
});


// Get cart items => GET /api/v1/cart
exports.getCartItems = catchAsyncErrors(async (req, res, next) => {
  let cart;

  if (req.user) {
    // User is authenticated
    cart = await Cart.findOne({ user: req.user._id }).populate(
      'cartItems.product',
      'name price image'
    );

    if (!cart) {
      return next(new ErrorHandler('Cart not found', 404));
    }

    res.status(200).json({
      success: true,
      cartItems: cart.cartItems,
    });
  } else {
    // User is unauthenticated
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

    res.status(200).json({
      success: true,
      cartItems: cartItems,
    });
  }
});
// Get cart items => GET /api/v1/cart/:id
exports.getCartItemByProductId = catchAsyncErrors(async (req, res, next) => {
  try {
    const { productId } = req.params;
    const cartItem = await Cart.findOne({ 'cartItems.product': productId });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found',
      });
    }

    const product = cartItem.cartItems.find(
      (item) => item.product.toString() === productId
    ).product;

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Update cart item => PUT /api/v1/cart/:id
exports.updateCartItem = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { quantity } = req.body;

  let cart;

  if (req.user) {
    // User is authenticated
    cart = await Cart.findOne({ user: req.user._id }).populate('cartItems.product');

    if (!cart) {
      return next(new ErrorHandler('Cart not found', 404));
    }

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
  } else {
    // User is unauthenticated
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const existingItem = cartItems.find((item) => item._id === id);

    if (existingItem) {
      existingItem.quantity = quantity;
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    res.status(200).json({
      success: true,
      cartItem: existingItem,
    });
  }
});

// Remove cart item => DELETE /api/v1/cart/:id
exports.removeCartItem = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  let cart;

  if (req.user) {
    // User is authenticated
    cart = await Cart.findOne({ user: req.user._id });

    // if (!cart) {
    //   return next(new ErrorHandler('Cart not found', 404));
    // }

    const itemIndex = cart.cartItems.findIndex(
      (item) => item._id.toString() === id
    );

    if (itemIndex !== -1) {
      cart.cartItems.splice(itemIndex, 1);
      await cart.save();

      res.status(200).json({
        success: true,
        message: 'Cart item removed',
        cartItems: cart.cartItems, // Return the updated cart items
      });
    } else {
      // return next(new ErrorHandler('Cart item not found', 404));
    }
  }
});

// Clear cart => DELETE /api/v1/cart/clear
exports.clearCart = catchAsyncErrors(async (req, res, next) => {
  let cart;

  if (req.user) {
    // User is authenticated
    cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      cart.cartItems = []; // Clear the cartItems array
      cart.markModified('cartItems'); // Mark the modified field to resolve the VersionError
      await cart.save();

      res.status(200).json({
        success: true,
        message: 'Cart cleared',
      });
    } else {
      return next(new ErrorHandler('Cart not found', 404));
    }
  }
});
