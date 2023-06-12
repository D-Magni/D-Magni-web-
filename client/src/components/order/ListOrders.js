import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";
import { myOrders, clearErrors } from "../../actions/orderActions";
import Visibility from "@mui/icons-material/Visibility";
import { useAlert } from "react-alert";
import SearchIcon from "@mui/icons-material/Search";

const ListOrders = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [, setSearchTerm] = useState("");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    dispatch(myOrders());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);
  const orderStatusColor = (orderStatus) => {
    if (orderStatus && String(orderStatus).includes("Delivered")) {
      return "text-green-600";
    } else if (orderStatus && String(orderStatus).includes("Shipped")) {
      return "text-blue-600";
    } else {
      return "text-red-600";
    }
  };
  

  useEffect(() => {
    setFilteredOrders(orders);
  }, [orders]);

  const handleSearch = (event) => {
    const keyword = event.target.value.toLowerCase();
    const filtered = orders.filter(
      (order) =>
        order._id.toLowerCase().includes(keyword) ||
        String(order.paidAt).substring(0, 10).includes(keyword)
    );
    setFilteredOrders(filtered);
    setSearchTerm(keyword);
  };

  return (
    <Fragment>
      <MetaData title={"My Orders"} />
      <div className="bg-zinc-100">

      {loading ? (
            <Loader />
      ) : (
        <div className="py-36 px-7 md:px-24">
          <h1 className="my-5 text-3xl font-bold text-gray-600">My Orders</h1>

          <div className="flex md:justify-end ">
            <div className="border border-gray-400 rounded-md py-1 flex px-3 mb-10 mt-3">
              <input
                type="text"
                name="search"
                className="w-full bg-transparent outline-none"
                placeholder="Search by ID or Date"
                onChange={handleSearch}
              />
              <SearchIcon className="text-gray-400" />
            </div>
          </div>

           
            <div className="flex flex-col space-y-10">
              {filteredOrders && filteredOrders.length === 0 ? (
                <h2 className="py-5 text-2xl md:text-3xl font-bold text-gray-700">
                  Your Order(s): <b>{filteredOrders.length}</b>
                </h2>
              ) : (
                filteredOrders &&
                filteredOrders.map((order, index) => (
                  <div key={index} className="w-full p-3">
                    <div className="bg-white shadow-lg p-4">
                      <div className="flex flex-col gap-10 md:flex-row justify-between items-center mb-4">
                        <div className="flex  flex-col gap-1">
                          <div className=" text-gray-500 text-sm">
                            <p>
                              Order Date:{" "}
                              {String(order.paidAt).substring(0, 10)}
                            </p>
                          </div>
                          <div className="text-sm font-bold   text-gray-600">
                            Order ID: {order._id}
                          </div>
                        </div>
                        <d className="flex flex-col md:place-items-end  w-full space-y-5">
                          <Link
                            to={`/order/${order._id}`}
                            className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 flex gap-2 w-[150px] justify-center rounded-lg"
                          >
                            {" "}
                            View Order
                            <Visibility />
                          </Link>
                         
                        </d>
                      </div>
                      {order.orderItems.map((item, index) => (
                        <div key={index} className="flex items-center mb-2">
                          <div className="w-16 h-16 mr-4">
                            <Link to={`/product/${item.product}`}>
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover rounded"
                              />
                            </Link>
                          </div>
                          <div className="flex-1">
                            <div className="text-sm text-gray-600 mb-1 hover:text-green-600">
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </div>
                            <div className="text-sm text-gray-500">
                              Qty: {item.quantity} | Price: ₦{item.price}
                            </div>
                            <div className="text-sm text-gray-500">
                              shoeSize: {item.shoeSize}
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="text-sm text-gray-600 mt-4">
                        Total: ₦{order.totalPrice}
                      </div>
                      <div
                        className={`text-sm font-bold mt-2 ${orderStatusColor(
                          order.orderStatus
                        )}`}
                      >
                        Status: {order.orderStatus}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
        </div>
         )}

      </div>
      
    </Fragment>
  );
};

export default ListOrders;
