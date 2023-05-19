import React, { Fragment, useState } from "react";
import {  useNavigate, Link } from "react-router-dom";
//Icons
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import NotesIcon from "@mui/icons-material/Notes";
import CloseIcon from "@mui/icons-material/Close";
import Badge from "@mui/material/Badge";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import StorefrontIcon from '@mui/icons-material/Storefront';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';
import ReviewsIcon from '@mui/icons-material/Reviews';
import AddIcon from '@mui/icons-material/Add';

import Search from "./Search";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Avatar } from "@material-ui/core";
import { logout } from "../../actions/userActions";
const Header = () => {

  const { cartItems } = useSelector(state => state.cart);
  const alert = useAlert();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);
  const history = useNavigate();

  const [openMenu, setOpenMenu] = useState();

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };
  const closeMenu = () => {
    setOpenMenu(false);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorUserEl, setAnchorUserEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickUser = (event) => {
    setAnchorUserEl(event.currentTarget);
  };
  const handleUserClose = () => {
    setAnchorUserEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    dispatch(logout());
    alert.success('Logged out successfully')
  }

  const isAdminPage = window.location.pathname.startsWith("/admin") || window.location.pathname.startsWith("/dashboard");

  return (
    <Fragment>
      {/* Header for view above 1024px screens */}
      <nav className={`${isAdminPage ? 'bg-gray-900' : 'bg-primary-color'} hidden lg:flex justify-around space-x-12 text-white lg:px-24 py-5 fixed w-full z-10 top-0 place-items-center`}>
        <div className=" flex-1">
          <Link to="/">
            <img src="/images/logo.png" width={200}/>
          </Link>
    
        </div>

        <div className=" flex-1 box-shadow shadow-lg">
          <Search history={history} />
        </div>

        <div className="flex gap-8 place-items-center  flex-1 justify-end">
          <Link to='/cart'>
          <Badge badgeContent={cartItems.length} id="cart_count" color="success">
            <span id="cart">
              <ShoppingCartIcon className="cursor-pointer" />
            </span>
          </Badge>
          </Link>
          <div className="flex gap-1 cursor-pointer">
            <ContactSupportIcon />

            <p>Help</p>
            <ArrowDropDownIcon />
          </div>

          <div>
            {user ? (
              <div>
                <Link
                  to="#!"
                  className="btn dropdown-toogle  flex place-items-center gap-4"
                  type="button"
                  onClick={handleClickUser}
                >
                  <Avatar
                    src={user.avatar && user.avatar.url}
                    alt={user && user.firstName}
                  />
                <div className="flex gap-1">
                <span className="font-bold text-gray-300">{user && user.firstName}</span>

                <ArrowDropDownIcon />

                </div>
                </Link>

                <Menu
                  id="simple-menu"
                  anchorEl={anchorUserEl}
                  keepMounted
                  open={Boolean(anchorUserEl)}
                  onClose={handleUserClose}
                >
                  {user && user.role === "admin" && (
                   <Link to="/dashboard">
                   <MenuItem onClick={handleUserClose}>Dashboard</MenuItem>
                 </Link>
                  )} 
                     <Link to="/orders/me">
                      <MenuItem onClick={handleUserClose}>Orders</MenuItem>
                    </Link>
                  <Link to="/me">
                    
                    <MenuItem onClick={handleUserClose}>Profile</MenuItem>
                  </Link>
                  <Link to="/" onClick={logoutHandler}>
                    <MenuItem onClick={handleUserClose}>Logout</MenuItem>
                  </Link>
                </Menu>
              </div>
            ) : (
              !loading && (
                <button
                  className="btn bg-white rounded py-1 px-3 text-primary-color flex gap-1"
                  id="login_btn"
                  onClick={handleClick}
                >
                  <AccountCircleIcon />
                  <p>Account</p>
                  <KeyboardArrowDownIcon />
                </button>
              )
            )}

            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <Link to="/login">
                <MenuItem onClick={handleClose}>Login</MenuItem>
              </Link>
              <Link to="/register">
                <MenuItem onClick={handleClose}>Sign Up</MenuItem>
              </Link>
            </Menu>
          </div>
        </div>
      </nav>
      {/* Header for view below 1024px screens */}
      
      <nav className={`${isAdminPage ? 'bg-gray-900' : 'bg-primary-color'} lg:hidden grid gap-5 px-8 py-5  text-white fixed w-full z-10 top-0`}>
        <div>
          <div className="flex justify-between place-items-center">
            <div>
              <NotesIcon className="cursor-pointer" onClick={handleOpenMenu} />
            </div>

            <div>
              <Link to="/">
              <img src="/images/logo.png" width={130}/>
              </Link>{" "}
            </div>

            <div className="flex gap-5 place-items-center">
            <Link to='/cart'>
              <Badge badgeContent={cartItems.length} id="cart_count" color="success">
                <span id="cart">
                  <ShoppingCartIcon className="cursor-pointer" />
                </span>
              </Badge>
              </Link>
              {user && user.avatar && (

              <Avatar
                src={user.avatar && user.avatar.url}
                alt={user && user.firstName}
              />
              )}

            </div>
          </div>
        </div>

        <div className=" box-shadow shadow-lg">
          <Search history={history} />
        </div>
        {openMenu && (
          <div className="bg-overlay absolute h-screen w-full z-40">
            <div className="h-screen bg-zinc-800 w-5/6">
              <div className="flex justify-end pr-5 py-10">
                <CloseIcon onClick={closeMenu} />
              </div>

              <div className="text-neutral-400">
                <div className="py-4 pl-3">
                  <p>Shop</p>
                </div>
                <hr className="border border-neutral-700" />
                <div className="py-4 pl-3">
                  <p>About D'Magni</p>
                </div>
                <hr className="border border-neutral-700" />
                <div className="py-4 pl-3">
                  <p>Help</p>
                </div>
                <hr className="border border-neutral-700" />
                {user ? (
                  <div>
                    {user && user.role !== "admin" ? (
                      <div>
                        <div className="py-4 pl-3">
                          <Link to="/orders">Orders</Link>
                        </div>
                        <hr className="border border-neutral-700" />
                      </div>
                    ) : (
                      <div className="py-4 pl-3">
                        <Link to="/dashboard">Dashboard</Link>
                      </div>
                      
                    )}
                    {isAdminPage && (
                      <ul className="px-8 text-neutral-400">
                         <li className="my-2">
                         <div className="group">
                           <div className="flex items-center  hover:text-gray-200 cursor-pointer">
                             <StorefrontIcon className="mr-2" /> Products
                             <span className="ml-auto">
                               <ArrowDropDown className="w-4 h-4 transition-transform duration-300 transform group-hover:rotate-180" />
                             </span>
                           </div>
                           <ul className="pl-4 mt-2 space-y-2 hidden group-hover:block">
                             <li>
                               <Link to="/admin/products" className="flex items-center  hover:bg-white hover:text-gray-900 hover:p-1">
                                 <CategoryIcon className="mr-2" /> All
                               </Link>
                             </li>
                             <li>
                               <Link to="/admin/product" className="flex items-center  hover:bg-white hover:text-gray-900 hover:p-1">
                                 <AddIcon className="mr-2" /> Create
                               </Link>
                             </li>
                           </ul>
                         </div>
                       </li>
                       <li className="my-2">
                         <Link to="/admin/orders" className="flex items-center  hover:bg-white hover:text-gray-900 hover:p-1">
                           <ShoppingCart className="mr-2" /> Orders
                         </Link>
                       </li>
                       <li className="my-2">
                         <Link to="/admin/users" className="flex items-center   hover:bg-white hover:text-gray-900 hover:p-1">
                           <PeopleIcon className="mr-2" /> Users
                         </Link>
                       </li>
                       <li className="my-2">
                         <Link to="/admin/reviews" className="flex items-center   hover:bg-white hover:text-gray-900 hover:p-1">
                           <ReviewsIcon className="mr-2" /> Reviews
                         </Link>
                       </li>
                       </ul>
                    )}
                    <div className="py-4 pl-3">
                      <Link to="/me">Profile</Link>
                    </div>
                    <hr className="border border-neutral-700" />

                    <div className="py-4 pl-3">
                      <Link to="/" onClick={logoutHandler}>Logout</Link>
                    </div>
                  </div>
                ) : (
                  !loading && (
                    <div>
                      <p className="py-4 pl-4">ACCOUNT</p>

                      <div className="py-4 pl-3">
                        <Link to="/register">Sign Up</Link>
                      </div>
                      <hr className="border border-neutral-700" />
                      <div className="py-4 pl-3">
                        <Link to="/login">Login</Link>
                      </div>
                    </div>
                  )
                )}

                <hr className="border border-neutral-700" />
              </div>
            </div>
          </div>
        )}
      </nav>
    </Fragment>
  );
};

export default Header;
