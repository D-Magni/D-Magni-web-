import React, { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";
import { getProductDetails, clearErrors } from "../../actions/productActions";
import { addItemToCart, removeItemFromCart } from "../../actions/cartActions";

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cart);
    const { isAuthenticated } = useSelector(state => state.auth);
  const removeCartItemHandler = (id) => {
    dispatch(removeItemFromCart(id))
  }

  const increaseQty = (id, quantity, stock) => {
const newQty = quantity + 1;
    if(newQty > stock) return;

    dispatch(addItemToCart(id, newQty))
  }

  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;
    if(newQty <= 0) return;

    dispatch(addItemToCart(id, newQty))
  }
const checkoutHandler = () => {
  if (isAuthenticated) {
    navigate('/shipping');
  } else {
    navigate(`/login?redirect=/shipping`);
  }
};

  return (
    <Fragment>
        <MetaData title={"Your Cart"}/>
        {cartItems.length === 0 ? <h2>Your Cart is Empty</h2> : (
            <Fragment>
  <div className="px-7 md:px-24 py-36">
        <h2 className="py-5 text-2xl md:text-3xl font-bold text-gray-700">Your Cart: <b>{cartItems.length}</b></h2>
        
        <div className="flex justify-between">
            <div className="flex-col space-y-8">
                {cartItems.map(item => (
                    <Fragment>
                                        <hr />
                                        <div className="cart-item" key={item.product}>
                    <div className="flex">
                        <div className="col-4 col-lg-3">
                            <img src={item.image} alt={item.name} className="w-24 h-24" />
                        </div>

                        <div className="col-5 col-lg-3">
                            <Link to={`/products/${item.product}`}>{item.name}</Link>
                        </div>
                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                            <p id="card_item_price">{item.price}</p>
                        </div>

                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                            <div className="stockCounter d-inline">
                                <span className="btn btn-danger minus" onClick={() => decreaseQty(item.product, item.quantity)}>-</span>
                                <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />

								<span className="btn btn-primary plus" onClick={() => increaseQty(item.product, item.quantity, item.stock)}>+</span>
                            </div>
                        </div>

                        <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                            <button id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={() => removeCartItemHandler(item.product)}>Delete</button>
                        </div>

                    </div>
                    </div>

                    </Fragment>
                ))}
         


                <hr />
            </div>
            <div className="col-12 col-lg-3 my-4">
                <div id="order_summary">
                    <h4>Order Summary</h4>
                    <hr />
                    <p>Subtotal:  <span className="order-summary-values">{cartItems.reduce((acc, item) => (acc + Number(item.quantity)), 0)} (Units)</span></p>
                    <p>Est. total: <span className="order-summary-values">N{cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)} </span></p>
    
                    <hr />
                    <button id="checkout_btn" className="btn btn-primary btn-block" onClick={checkoutHandler}>Check out</button>
                </div>
                </div>
        </div>
    </div>
                </Fragment>
        )}
    </Fragment>
  )
}

export default Cart