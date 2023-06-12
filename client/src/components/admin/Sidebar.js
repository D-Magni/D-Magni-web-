import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';
import ReviewsIcon from '@mui/icons-material/Reviews';

const Sidebar = () => {
 
  const [isProductOpen, setProductOpen] = useState(false);

  const toggleProduct = () => {
    setProductOpen(!isProductOpen);
  };

  return (
    <div className="fixed bg-gray-900 h-screen w-1/6 pt-40 px-7 lg:flex flex-col space-y-7 hidden z-10">
      <div className="sidebar-wrapper">
        <nav id="sidebar">
          <ul className="list-none flex flex-col space-y-6 font-bold text-lg">
            <li className="my-2">
              <Link
                to="/dashboard"
                className="flex items-center text-white  hover:bg-white hover:text-gray-900 hover:p-1"
              >
                <DashboardIcon className="mr-2" /> Dashboard
              </Link>
            </li>
            <li className="my-2">
              <div className="group">
                <div
                  className="flex items-center text-white hover:text-gray-200 cursor-pointer"
                  onClick={toggleProduct}
                >
                  <StorefrontIcon className="mr-2" /> Products
                  <span className="ml-auto">
                    <ArrowDropDown
                      className={`w-4 h-4 transition-transform duration-300 transform ${
                        isProductOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </span>
                </div>
                <ul
                  className={`pl-4 mt-2 space-y-2 ${
                    isProductOpen ? 'block' : 'hidden'
                  }`}
                >
                  <li>
                    <Link
                      to="/admin/products"
                      className="flex items-center text-white hover:bg-white hover:text-gray-900 hover:p-1"
                    >
                      <CategoryIcon className="mr-2" /> All
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/product"
                      className="flex items-center text-white hover:bg-white hover:text-gray-900 hover:p-1"
                    >
                      <AddIcon className="mr-2" /> Create
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="my-2">
              <Link
                to="/admin/orders"
                className="flex items-center text-white  hover:bg-white hover:text-gray-900 hover:p-1"
              >
                <ShoppingCart className="mr-2" /> Orders
              </Link>
            </li>
            <li className="my-2">
              <Link
                to="/admin/users"
                className="flex items-center text-white  hover:bg-white hover:text-gray-900 hover:p-1"
              >
                <PeopleIcon className="mr-2" /> Users
              </Link>
            </li>
            <li className="my-2">
              <Link
                to="/admin/reviews"
                className="flex items-center text-white  hover:bg-white hover:text-gray-900 hover:p-1"
              >
                <ReviewsIcon className="mr-2" /> Reviews
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
