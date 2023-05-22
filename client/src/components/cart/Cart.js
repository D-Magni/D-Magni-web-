import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layouts/MetaData";
import { addItemToCart, removeItemFromCart } from "../../actions/cartActions";
import DeleteForever from "@mui/icons-material/DeleteForever";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const removeCartItemHandler = (id) => {
    dispatch(removeItemFromCart(id));
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (newQty > stock) return;

    dispatch(addItemToCart(id, newQty));
  };

  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;
    if (newQty <= 0) return;

    dispatch(addItemToCart(id, newQty));
  };
  const checkoutHandler = () => {
    if (isAuthenticated) {
      navigate("/shipping");
    } else {
      navigate(`/login?redirect=/shipping`);
    }
  };

  return (
    <Fragment>
      <MetaData title={"Your Cart"} />
      {cartItems.length === 0 ? (
        <h2>Your Cart is Empty</h2>
      ) : (
        <Fragment>
          <div className="px-7 md:px-24 py-36">
            <h2 className="py-5 text-2xl md:text-3xl font-bold text-gray-700">
              Your Cart: <b>{cartItems.length}</b>
            </h2>

            <div className="flex flex-col md:flex-row gap-10 md:gap-36 justify-between  flex-1">
              <div className="grid space-y-8 flex-1">
                {cartItems.map((item) => (
                  <Fragment>
                    <hr />
                    <div className="cart-item" key={item.product}>
                      <div className="flex justify-between  place-items-center ">
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
                              to={`/products/${item.product}`}
                              className="font-bold"
                            >
                              {item.name}
                            </Link>
                          </div>
                          <div className=" flex place-items-center">
                            <div className="flex justify-between   place-items-center mt-4 mt-lg-0">
                              <span
                                className="cursor-pointer text-white bg-gray-400 p-1 px-3"
                                onClick={() =>
                                  decreaseQty(item.product, item.quantity)
                                }
                              >
                                -
                              </span>
                              <input
                                type="number"
                                className="form-control count text-center outline-none w-10 bg-transparent"
                                value={item.quantity}
                                readOnly
                              />

                              <span
                                className="cursor-pointer text-white bg-gray-400 p-1 px-3"
                                onClick={() =>
                                  increaseQty(
                                    item.product,
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
                              onClick={() =>
                                removeCartItemHandler(item.product)
                              }
                            >
                              <DeleteForever />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Fragment>
                ))}

                <hr />
              </div>
              <div className="flex flex-col space-y-5 h-3/6 border flex-3  px-7 py-10 md:px-20 shadow-md rounded-md flex-2">
                <h4 className="text-2xl font-medium">Order Summary</h4>
                <hr />
                <p className="flex justify-between">
                  Subtotal:{" "}
                  <span className="font-bold">
                    {cartItems.reduce(
                      (acc, item) => acc + Number(item.quantity),
                      0
                    )}{" "}
                    (Units)
                  </span>
                </p>
                <p className="flex justify-between">
                  Est. total:{" "}
                  <span className="font-bold">
                  ₦
                    {cartItems
                      .reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )
                      .toFixed(2)}{" "}
                  </span>
                </p>

                <hr />
                <button
                  id="checkout_btn"
                  className="py-2 w-full  px-7 bg-green-600 hover:bg-gray-400 text-white font-bold rounded"
                  onClick={checkoutHandler}
                >
                  Check Out
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
