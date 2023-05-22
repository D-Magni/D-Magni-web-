import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layouts/MetaData";
import { Link, useNavigate } from "react-router-dom";
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { useDispatch } from "react-redux";

import { useAlert } from "react-alert";
import CheckoutSteps from "./CheckoutSteps";
import { createOrder, clearErrors } from '../../actions/orderActions'
import { addItemToCart, removeItemFromCart } from "../../actions/cartActions";

const ConfirmOrder = () => {
 const navigate = useNavigate(); 
  const [loading, setLoading] = useState(false);
  const [flutterwaveApiKey, setFlutterwaveApiKey] = useState(null);
   const alert = useAlert();
   const dispatch = useDispatch();
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { error } = useSelector(state => state.newOrder)


    // Calculate order prices
    const itemsPrice = Number(cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)).toFixed(2);
    const shippingPrice = itemsPrice > 200 ? 0 : 25;
    const taxPrice = Number((0.05 * itemsPrice).toFixed(2));
    const totalPrice = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2);
  
    
  // Fetch Flutterwave public key from backend
  useEffect(() => {


    if (error) {
      alert.error(error);
      dispatch(clearErrors()) 
  
  }
    const fetchFlutterwaveApiKey = async () => {
      try {
        const response = await fetch('/api/v1/flutterwaveapi');
        const data = await response.json();
        setFlutterwaveApiKey(data.flutterwaveApiKey);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFlutterwaveApiKey();
  
    
  }, [dispatch, error, alert]);


  useEffect(() => {
    const itemsPrice = Number(
      cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    ).toFixed(2);
    const shippingPrice = itemsPrice > 200 ? 0 : 25;
    const taxPrice = Number((0.05 * itemsPrice).toFixed(2));
    const totalPrice = (
      Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)
    ).toFixed(2);
  
    const orderInfo = {
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(orderInfo));
  }, [cartItems]);



  const config = {
    public_key: flutterwaveApiKey,
    tx_ref: Date.now(),
    amount: totalPrice,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      phone_number: shippingInfo.phoneNo,
      email: user.email,
    },
    customizations: {
      title: "D'Magni",
      description: "Payment for items in cart",
      logo: "https://tinyurl.com/yc3zadhf",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);
  const proceedToPayment = async () => {
    setLoading(true);

  
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const order = {
      orderItems: cartItems,
      shippingInfo,
      ...orderInfo,
    };
  
  
    try {
      await handleFlutterPayment({
        callback: async (response) => {
          console.log(response);
          setLoading(false);
  
          const axiosConfig = {
            headers: {
              "Content-type": "application/json",
            },
          };
    
   
          if (response.status === "completed") {
            try {
              dispatch(createOrder(order));
              alert.success("Payment successful");
              const cartItemIds = cartItems.map((item) => item.id);
                      dispatch(removeItemFromCart(cartItemIds));

                      closePaymentModal() // this will close the modal programmatically

              navigate("/");
            } catch (error) {
              alert.error(error.response.data.message);
            }
          } else {
            alert.error("Payment failed");
          }
        },
        onClose: () => {
          console.log("Payment closed");
          setLoading(false);
          navigate("/")
        },
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  
  
  



  return (
    <Fragment>
      <MetaData title={"Shipping Info"} />
      <CheckoutSteps shipping  ConfirmOrder/>

      <div className="px-7 md: md:px-36 pb-36">
        
        <div className="flex flex-col  md:flex-row justify-between gap-24">
            <div className=" mt-5 flex-1">

      <h4 className="mb-10 text-3xl  font-medium">Shipping Info</h4>
                <p ><b>Name:</b> {user && user.firstName + ' ' + user.lastName }</p>
                <br/>
                <p ><b>Phone:</b> {shippingInfo.phoneNo}</p>
                <br/>
                <p className="mb-4"><b>Address:</b> {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}</p>
                
                <hr />
                <h4 className="mt-4 text-3xl font-medium pt-12 pb-6">Your Cart Items:</h4>

                {cartItems.map(item => (
                    <Fragment>
                                        <hr />

          <div className="my-1" key={item.product}>
                    <div className="flex place-items-center justify-between">
                      <div className="flex gap-6 flex-1">
                        <div className="col-4 col-lg-2">
                            <img src={item.image} alt={item.name} className="w-24 h-24"/>
                        </div>
                        <div className="col-5 col-lg-6">
                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </div>
                        </div>

                        <div className="col-4 col-lg-4 mt-4 mt-lg-0 text-sm">
                          <p>Quantiy: {item.quantity}</p>
                          <p className="font-bold">N{(item.quantity * item.price).toFixed(2)}</p>
                        </div>

                    </div>
                </div>
                <hr />
                    </Fragment>
                ))}

      

            </div>
			
            <div className="flex flex-col space-y-5 h-3/6 border flex-3  px-7 py-10 md:px-20 shadow-md">
                        <h4 className="text-2xl font-medium">Order Summary</h4>
                        <hr />
                        <p className="flex justify-between">Subtotal:  <span className="font-bold">N{itemsPrice}</span></p>
                        <p className="flex justify-between">Shipping: <span className="font-bold">N{shippingPrice}</span></p>
                        <p className="flex justify-between">Fee:  <span className="font-bold">N{taxPrice}</span></p>

                        <hr />

                        <p className="flex justify-between">Total: <span className="font-bold text-red-500">N{totalPrice}</span></p>

                        <hr />

                        <button id="checkout_btn" className="py-2 w-full  px-7 bg-green-600 hover:bg-gray-400 text-white font-bold rounded" onClick={proceedToPayment}>Proceed to Payment</button>
                    </div>
                </div>
    </div>

    </Fragment>
  );
};

export default ConfirmOrder;
