import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layouts/MetaData";
import {
  addToCart,
  getCartItems,
  removeCartItem,
  updateCartItem,
} from "../../actions/cartActions";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Loader from "../layouts/Loader";
import { useAlert } from "react-alert";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { cartItems, loading } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [shoeSizes, setShoeSizes] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getCartItems());
  }, [dispatch, isAuthenticated]);

  const removeCartItemHandler = async (id) => {
    await dispatch(removeCartItem(id));
  };

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (newQty > stock) return;
    dispatch(updateCartItem(id, newQty));
  };

  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;
    if (newQty <= 0) return;
    dispatch(updateCartItem(id, newQty));
  };

  const handleShoeSizeChange = (itemId, newSize) => {
    setShoeSizes((prevSizes) => ({
      ...prevSizes,
      [itemId]: newSize
    }));
  };
  
  const checkoutHandler = () => {
    if (isAuthenticated) {
      const itemsWithoutShoeSize = cartItems.filter(
        (item) => !shoeSizes[item._id] || shoeSizes[item._id].trim() === ""
      );
      if (itemsWithoutShoeSize.length > 0) {
        alert.error("Please enter the shoe size for all items.");
      } else {
        const itemsWithSizes = cartItems.map((item) => ({
          ...item,
          shoeSize: shoeSizes[item._id] || "",
        }));
  
        // Save the items with sizes to local storage
        localStorage.setItem("cartItems", JSON.stringify(itemsWithSizes));
  
        navigate("/shipping");
      }
    } else {
      navigate(`/register?redirect=/shipping`);
      alert.error("Create an account to proceed with the payment");
    }
  };
  
  return (
    <Fragment>
      <MetaData title={"Your Cart"} />
      <div className="px-7 md:px-24 py-36">
        <h2 className="py-5 text-2xl md:text-3xl font-bold text-gray-700">
          Your Cart: <b>{cartItems.length}</b>
        </h2>
        {loading ? (
          <Loader />
        ) : cartItems.length === 0 ? (
          <h3>Your cart is empty. Please add some products.</h3>
        ) : (
          <div className="flex flex-col md:flex-row gap-10 md:gap-36 justify-between flex-1">
            <div className="grid space-y-8 flex-1">
              {cartItems.map((item) => (
                <Fragment key={item.product}>
                  <hr />
                  <div className="cart-item">
                    <div className="flex justify-between place-items-center">
                      <div className="flex flex-col space-y-4 flex-1">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 bg-zinc-200 border"
                        />
                      </div>
                      <div className="flex flex-col place-items-center text-sm flex-1 justify-center">
                        <div className="flex flex-col space-y-4">
                          <Link
                            to={`/product/${item.product && item.product._id}`}
                            className="font-bold"
                          >
                            {item.name}
                          </Link>
                        </div>
                        <div className="flex place-items-center">
                          <div className="flex place-items-center">
                            <div className="flex justify-between place-items-center mt-4 mt-lg-0">
                              <span
                                className="cursor-pointer text-white bg-gray-400 p-1 px-3"
                                onClick={() =>
                                  decreaseQty(item._id, item.quantity)
                                }
                              >
                                -
                              </span>
                              <input
                                type="number"
                                className="w-12 bg-gray-200 text-center outline-none"
                                value={item.quantity}
                                onChange={(e) => {
                                  const newQty = parseInt(e.target.value);
                                  if (isNaN(newQty)) {
                                    dispatch(updateCartItem(item._id, 1));
                                  } else {
                                    dispatch(updateCartItem(item._id, newQty));
                                  }
                                }}
                              />

                              <span
                                className="cursor-pointer text-white bg-gray-400 p-1 px-3"
                                onClick={() =>
                                  increaseQty(
                                    item._id,
                                    item.quantity,
                                    item.stock
                                  )
                                }
                              >
                                +
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 flex-1 text-right">
                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                          <p
                            id="card_item_price"
                            className="text-gray-600 font-bold text-sm"
                          >
                            ₦{item.price}
                          </p>
                        </div>
                        <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                          <button
                            id="delete_cart_item"
                            className="fa fa-trash text-red-600"
                            onClick={() => removeCartItemHandler(item.product._id)}
                          >
                            <DeleteForeverIcon />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="shoeSize" className="text-xs text-gray-500">
                        Shoe Size
                      </label>
                      <input
      type="text"
      id={`shoeSize_${item._id}`}
      name={`shoeSize_${item._id}`}
      placeholder="e.g. 45"
      value={shoeSizes[item._id] || ""}
      onChange={(e) => handleShoeSizeChange(item._id, e.target.value)}
      className="w-24 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
    />
                    </div>
                  </div>
                </Fragment>
              ))}
              <hr />
            </div>
            <div className="flex flex-col space-y-5 h-3/6 border flex-3 px-7 py-10 md:px-20 shadow-md rounded-md flex-2">
              <h4 className="text-2xl font-medium">Order Summary</h4>
              <hr />
              <p className="flex justify-between">
                Subtotal:{" "}
                <span className="font-bold">
                  {cartItems.reduce((acc, item) => acc + Number(item.quantity), 0)} (Units)
                </span>
              </p>
              <p className="flex justify-between">
                Est. total:{" "}
                <span className="font-bold">
                  ₦{cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}{" "}
                </span>
              </p>
              <hr />
              <button
                id="checkout_btn"
                className="py-2 w-full px-7 bg-green-600 hover:bg-gray-400 text-white font-bold rounded"
                onClick={checkoutHandler}
              >
                Check Out
              </button>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Cart;
