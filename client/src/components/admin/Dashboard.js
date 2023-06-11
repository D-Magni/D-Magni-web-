import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { getAdminProducts } from "../../actions/productActions";
import { allOrders } from "../../actions/orderActions";
import { allUsers } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Visibility from "@mui/icons-material/Visibility";
import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { users } = useSelector((state) => state.allUsers);

  const { orders, totalAmount, loading } = useSelector(
    (state) => state.allOrders
  );
  let outOfStock = 0;

  products &&
    products.forEach((product) => {
      if (product.stock === 0) {
        outOfStock += 1;
      }
    });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(allOrders());
    dispatch(allUsers());
  }, [dispatch]);

  const sortedUsers = users.sort((a, b) => new Date(b.date) - new Date(a.date));
  const latestUsers = sortedUsers.slice(0, 10).reverse();
  
  return (
    <Fragment>
      <div className="lg:flex">
        <div className="lg:w-1/5">
          <Sidebar />
        </div>
        <div className="lg:w-4/5 py-36 px-7 overflow-x-hidden">
          {loading ? (
            <Loader />
          ) : (
            <div>
              <h1 className="my-4 text-2xl font-bold text-gray-600">
                DASHBOARD
              </h1>

              <Fragment>
                <MetaData title={"Admin Dashboard"} />

                <div className=" bg-blue-600 grid place-items-center h-32 w-full mt-10 rounded">
                  <div className="card-body flex items-center justify-center">
                    <div className="text-center text-white text-2xl">
                      Total Amount
                      <br />{" "}
                      <b className="text-3xl">
                        ₦{totalAmount ? totalAmount.toFixed(2) : "0.00"}
                      </b>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-10 justify-center py-10 place-items-center">
                  <div className=" bg-green-700 flex flex-col space-y-5 pt-3 place-items-center h-32 w-72 rounded">
                    <div className="card-body flex items-center justify-center">
                      <div className="text-center text-white text-2xl">
                        Products
                        <br />{" "}
                        <b className="text-3xl">
                          {products && products.length}
                        </b>
                      </div>
                    </div>

                    <Link
                      className="card-footer text-white clearfix  z-1 block text-center flex justify-between  rounded-b cursor-pointer p-2 bg-green-800 w-full"
                      to="/admin/products"
                    >
                      View Details
                      <Visibility />
                    </Link>
                  </div>

                  <div className=" bg-red-700 flex flex-col space-y-5 pt-3 place-items-center h-32 w-72 rounded">
                    <div className=" flex items-center justify-center">
                      <div className="text-center text-white text-2xl">
                        Orders
                        <br />{" "}
                        <b className="text-3xl">{orders && orders.length}</b>
                      </div>
                    </div>
                    <Link
                      className="card-footer text-white clearfix  z-1 block text-center flex justify-between  rounded-b cursor-pointer p-2 bg-red-800 w-full"
                      to="/admin/orders"
                    >
                      View Details
                      <Visibility />
                    </Link>
                  </div>

                  <div className=" bg-cyan-700 flex flex-col space-y-5 pt-3 place-items-center h-32 w-72 rounded">
                    <div className="flex items-center justify-center">
                      <div className="text-center text-white text-2xl">
                        Users
                        <br />{" "}
                        <b className="text-3xl">{users && users.length}</b>
                      </div>
                    </div>
                    <Link
                      className="card-footer text-white clearfix  z-1 block text-center flex justify-between  rounded-b cursor-pointer p-2 bg-cyan-800 w-full"
                      to="/admin/users"
                    >
                      View Details
                      <Visibility />
                    </Link>
                  </div>
                  <div className=" bg-yellow-600 flex flex-col space-y-5 pt-3  place-items-center h-32 w-72 rounded">
                    <div className=" flex items-center justify-center">
                      <div className="text-center text-white text-2xl">
                        Out of Stock
                        <br /> <b className="text-3xl">{outOfStock}</b>
                      </div>
                    </div>
                    <div className="card-footer clearfix  z-1 block rounded-b p-5 bg-yellow-600 w-full"></div>
                  </div>
                </div>

                <h2 className="my-4 text-2xl font-bold text-gray-600">
                  New Users
                </h2>

                <div className="overflow-x-auto w-full">
                  <table className="min-w-full border divide-y divide-gray-200 overflow-x-scroll table-auto">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User ID
                        </th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {latestUsers &&
                        latestUsers.map((user, index) => (
                          <tr key={index}>
                            <td className="py-4 px-6 text-sm text-gray-500">
                              {user._id}
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-500">
                              {user.firstName} {user.lastName}
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-500">
                              {user.email}
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-500">
                              {user.role}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </Fragment>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
