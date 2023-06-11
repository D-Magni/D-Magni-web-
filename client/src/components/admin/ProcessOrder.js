import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";
import { useParams } from "react-router-dom";
import {
  getOrderDetails,
  updateOrder,
  clearErrors,
} from "../../actions/orderActions";
import { useAlert } from "react-alert";
import Sidebar from "./Sidebar";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";


const ProcessOrder = () => {
  const [status, setStatus] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading,  order = {} } = useSelector((state) => state.orderDetails);
  const {
    shippingInfo,
    orderItems,
    user,
    totalPrice,
    orderStatus,
  } = order
  const { error, isUpdated } = useSelector((state) => state.order);
  const { id } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    dispatch(getOrderDetails(id));

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Order updated successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
  }, [dispatch, alert, error, isUpdated, id]);
 
  const updateOrderHandler = (id) => {
    const formData = new FormData();
    formData.set("status", status);

    dispatch(updateOrder(id, formData));
  };
  console.log("Order Items:", orderItems);

  const shippingDetails =
    shippingInfo &&
    `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;


    const orderStatusColor = (orderStatus) => {
        if (orderStatus && String(orderStatus).includes("Delivered")) {
          return "text-green-600";
        } 
        if (orderStatus && String(orderStatus).includes("Shipped")) {
          return "text-blue-600";
        }else {
          return "text-red-600";
        }
      };
  return (
    <Fragment>
      <MetaData title={`Process Orders # ${order && order._id}`} />
      <div className="lg:flex">
        <div className="lg:w-1/5">
          <Sidebar />
        </div>

        <div className="lg:w-4/5 py-36 px-4 sm:px-6 lg:px-8">
          <Fragment>
            {loading ? (
              <Loader />
            ) : (
              <div className="container container-fluid">
                <div className="flex gap-7 flex-col md:flex-row justify-around">
                  <div className="flex flex-col space-y-5">
                    <h1 className="my-5 text-xl md:text-2xl font-bold text-gray-700">Order # {order._id}</h1>

                    <h4 className="mb-4">Shipping Info</h4>
                    <p>
                      <b>Name:</b> {user && user.firstName} {user && user.lastName}
                    </p>
                    <p>
                      <b>Phone:</b>
                      {shippingInfo && shippingInfo.phoneNo}
                    </p>
                    <p className="mb-4">
                      <b>Address:</b>
                      {shippingDetails}
                    </p>
                    <p>
                      <b>Amount:</b> N{totalPrice}
                    </p>

                    <hr />

                

                    <h4 className="my-4">Order Status:</h4>
                    <p
                className={`font-bold ${orderStatusColor(
                    orderStatus
                  )}`}

                    >
                      {orderStatus}
                    </p>

                    <h4 className="my-4">Order Items:</h4>

                    <hr />

                    {orderItems &&
                      orderItems.map((item) => (
                        <div
                          key={item.product}
                          className="flex flex-col md:flex-row gap-2 md:items-center md:items-start justify-between md:mb-6"
                        >
                          <div className="md:w-2/12 mb-4 md:mb-0">
                            
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-1/2 h-20 border bg-gray-400 object-cover rounded-md"
                            />
                          </div>

                          <div className="md:w-5/12">
                            <p className="text-gray-700 font-medium">
                              {item.name}
                            </p>
                          </div>

                          <div className="md:w-2/12">
                            <p className="text-gray-700 font-medium">
                            ₦{item.price}
                            </p>
                          </div>

                          <div className="md:w-2/12">
                            <p className="text-gray-700 font-medium">
                              {item.quantity} Piece(s)
                            </p>
                          </div>


                          <div className="md:w-2/12">
                            <p className="text-gray-700 font-medium">
                              Size: {item.shoeSize}
                            </p>
                          </div>
                        </div>
                      ))}
                    <hr />
                  </div>

                  <div className="flex flex-col space-y-3 mt-5">
                    <h4 className="my-4 font-bold text-gray-700 text-lg">Update Order Status</h4>

                    <div className="border-2 border-gray-300 w-full  hover:border-blue-900 py-2 px-3 rounded-md flex justify-between">
                      <select
                          className="form-control outline-none bg-transparent w-full"
                          name="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>

                    <button
                      className="bg-zinc-900 text-white rounded-md font-bold hover:bg-gray-500 py-3"
                      onClick={() => updateOrderHandler(order._id)}
                    >
                      Update Status
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
