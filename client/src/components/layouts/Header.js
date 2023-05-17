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
  return (
    <Fragment>
      {/* Header for view above 1024px screens */}
      <nav className="bg-primary-color hidden lg:flex justify-around space-x-12 text-white  lg:px-24 py-5 fixed w-full z-10 top-0 place-items-center">
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

      <nav className="lg:hidden grid gap-5 px-8 py-5 bg-primary-color text-white fixed w-full z-10 top-0">
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
                        <Link to="/dashboard">Dashbaord</Link>
                      </div>
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
