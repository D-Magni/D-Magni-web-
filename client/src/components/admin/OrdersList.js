import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";
import {
  allOrders,
  deleteOrder,
  clearErrors,
} from "../../actions/orderActions";
import { useAlert } from "react-alert";
import DeleteForever from "@mui/icons-material/DeleteForever";
import SearchIcon from "@mui/icons-material/Search";
import PencilIcon from "@mui/icons-material/Edit";
import Sidebar from "./Sidebar";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

const OrdersList = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.allOrders);
  const [ , setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState(orders);

  const { error: deleteError, isDeleted } = useSelector((state) => state.order);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    dispatch(allOrders());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Order deleted successfully");
      dispatch({ type: DELETE_ORDER_RESET });
    }
  }, [dispatch, alert, error, isDeleted, deleteError]);

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
  const orderStatusColor = (orderStatus) => {
    if (orderStatus && String(orderStatus).includes("Delivered")) {
      return "text-green-600";
    }
    if (orderStatus && String(orderStatus).includes("Shipped")) {
      return "text-blue-600";
    } else {
      return "text-red-600";
    }
  };
  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
    setFilteredOrders(filteredOrders.filter((order) => order._id !== id));
  };
  return (
    <Fragment>
      <MetaData title={"All Orders"} />
      <div className="lg:flex">
        <div className="lg:w-1/5">
          <Sidebar />
        </div>
    
          <div className="lg:w-4/5 py-36 px-4 sm:px-6 lg:px-8">
          {loading ? (
          <Loader />
        ) : (
          <div>
            <h1 className="my-5 text-3xl font-bold text-gray-600">
              All Orders
            </h1>

            <div className="flex md:justify-end">
              <div className="border border-gray-400 rounded-md py-1 flex px-3 mb-10 mt-3">
                <input
                  type="text"
                  name="search"
                  className="w-full bg-transparent outline-none"
                  placeholder="Search for orders..."
                  onChange={handleSearch}
                />
                <SearchIcon className="text-gray-400" />
              </div>
            </div>

            <div className="overflow-x-scroll">
              <table className="min-w-full border divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      No of Items
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                {filteredOrders &&
                  filteredOrders.map((order, index) => (
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr key={index}>
                        <td className="py-4 px-6 text-sm text-gray-500">
                          {order._id}
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-500">
                          {order.orderItems.length}
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-500">
                          ₦{order.totalPrice}
                        </td>
                        <td
                          className={`py-4 px-6 text-sm text-gray-500 ${orderStatusColor(
                            order.orderStatus
                          )}`}
                        >
                          {order.orderStatus}
                        </td>
                        <td className="py-4 px-6 text-sm flex justify-between gap-5">
                          <Link
                            to={`/admin/order/${order._id}`}
                            className="bg-blue-600 p-1 text-white hover:bg-blue-700 rounded"
                          >
                            <PencilIcon />
                          </Link>
                          <button
                            className="bg-red-600 p-1 text-white hover:bg-red-700 rounded"
                            onClick={() => deleteOrderHandler(order._id)}
                          >
                            <DeleteForever />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  ))}
              </table>
            </div>
            </div>
                    )}

          </div>
      </div>
    </Fragment>
  );
};

export default OrdersList;
