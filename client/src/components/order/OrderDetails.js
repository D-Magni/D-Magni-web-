import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";
import { getOrderDetails, clearErrors } from "../../actions/orderActions";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
 const { id } = useParams();
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, order = {}} = useSelector(state => state.orderDetails)

    const { shippingInfo, orderItems, user, totalPrice, orderStatus} = order
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    useEffect(() => {
        dispatch(getOrderDetails(id));

        if (error) {
            alert.error(error);
            dispatch(clearErrors()) 
        
        }
    }, [dispatch, alert, error, id])

    const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`


  return (
    <Fragment>
    <MetaData title={'Order Details'}/>


    {loading ? (
                       <Loader />
                       ) : (
                        <div className="container py-40 px-7 md:px-24 mx-auto">

      {order && (
        <Fragment>
          <h1 className="text-xl md:text-2xl font-bold text-gray-700 mb-10">Order ID: {order._id}</h1>

          <div className="md:flex md:justify-between">
            <div className="md:w-1/2">
              <h4 className="text-xl font-medium text-gray-700 mb-4">Shipping Info</h4>
              <p className="text-gray-700 mb-2"><span className="font-medium">Name: </span>{user && user.firstName + ' ' + user.lastName }</p>
              <p className="text-gray-700 mb-2"><span className="font-medium">Phone: </span>{shippingInfo && shippingInfo.phoneNo}</p>
              <p className="text-gray-700 mb-2"><span className="font-medium">Address: </span>{shippingDetails}</p>
              <p className="text-gray-700 mb-2"><span className="font-medium">Amount: </span>N {totalPrice}</p>
            </div>

            <div className="md:w-1/2">
             
              <h4 className="text-xl font-medium text-gray-700 my-4">Order Status:</h4>
              <p className={orderStatus && String(orderStatus).includes('Delivered') ? "text-green-600 font-bold" : "text-red-600 font-bold"}>{orderStatus}</p>
            </div>
          </div>

          <h4 className="text-xl font-medium text-gray-700 my-4">Order Items:</h4>
          <hr className="my-4" />

          {orderItems && orderItems.map(item => (
            <div key={item.product} className="flex flex-col md:flex-row gap-2 md:items-center md:items-start justify-between md:mb-6">
              <div className="md:w-2/12 mb-4 md:mb-0">
                <img src={item.image} alt={item.name} className="w-1/2 h-20 object-cover rounded-md" />
              </div>

              <div className="md:w-5/12">
                <p className="text-gray-700 font-medium">{item.name}</p>
              </div>

              <div className="md:w-2/12">
                <p className="text-gray-700 font-medium">₦{item.price}</p>
              </div>

              <div className="md:w-2/12">
                <p className="text-gray-700 font-medium">{item.quantity} Piece(s)</p>
              </div>
              <div className="md:w-2/12">
                <p className="text-gray-700 font-medium">Size: {item.shoeSize}</p>
              </div>
            </div>
          ))}
        </Fragment>
      )}

      {!order && <Loader />}
      
    </div>
                           )}

  </Fragment>
  )
}

export default OrderDetails