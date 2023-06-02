import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
//Icons
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import NotesIcon from "@mui/icons-material/Notes";
import CloseIcon from "@mui/icons-material/Close";
import Badge from "@mui/material/Badge";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import StorefrontIcon from "@mui/icons-material/Storefront";
import StoreIcon from "@mui/icons-material/Store";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";
import ReviewsIcon from "@mui/icons-material/Reviews";
import AddIcon from "@mui/icons-material/Add";
import "../assets/Styles/style.css";
import Search from "./Search";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { HourglassBottomOutlined } from "@mui/icons-material";
import { clearCart, removeCartItem } from "../../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Avatar } from "@material-ui/core";
import { logout } from "../../actions/userActions";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { createOrder, clearErrors } from "../../actions/orderActions";
import CircularProgress from "@mui/material/CircularProgress";
import Person from "@mui/icons-material/Person";

const Header = () => {
  //Handle cart
  const history = useNavigate();
  const [orderCreated, setOrderCreated] = useState(false);

  const [showCart, setShowCart] = useState(false);
  const handleCartClick = () => {
    setShowCart(!showCart);
  };
  const closeCart = () => {
    setShowCart(false);
  };
  const alert = useAlert();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const removeCartItemHandler = (id) => {
    dispatch(removeCartItem(id));
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // code for cart ends here

  //Payment CheckOut
  const [loading, setLoading] = useState(false);
  const [flutterwaveApiKey, setFlutterwaveApiKey] = useState(null);
  const { error } = useSelector((state) => state.newOrder);
  // Calculate order prices
  const itemsPrice = Number(
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  ).toFixed(2);
  const shippingPrice = itemsPrice > 1000 ? 0 : 20;
  const taxPrice = Number((0.005 * itemsPrice).toFixed(2));
  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);

  // Fetch Flutterwave public key from backend
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    const fetchFlutterwaveApiKey = async () => {
      try {
        const response = await fetch("/api/v1/flutterwaveapi");
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
      cartItems
        .reduce((acc, item) => acc + item.price * item.quantity, 0)
        .toFixed(2)
    );
    const shippingPrice = Number(itemsPrice > 200 ? 0 : 25);
    const taxPrice = Number((0.05 * itemsPrice).toFixed(2));
    const totalPrice = (
      Number(itemsPrice) +
      Number(shippingPrice) +
      Number(taxPrice)
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
      name: user && user.firstName + " " + user && user.lastName,
      phone_number: shippingInfo.phoneNo,
      email: user && user.email,
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
              if (!orderCreated) {
                setOrderCreated(true);
                dispatch(createOrder(order));
              }
              alert.success("Payment successful");
              dispatch(clearCart());
              closePaymentModal();
              history("/");
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
        },
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  //End here

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
    alert.success("Logged out successfully");
  };

  const isAdminPage =
    window.location.pathname.startsWith("/admin") ||
    window.location.pathname.startsWith("/dashboard");

 
  return (
    <Fragment>
      {/* Header for view above 1024px screens */}
      <nav
        className={`${isAdminPage ? "bg-gray-900" : "bg-primary-color"}
         hidden lg:flex  justify-around space-x-12 text-white lg:px-24 py-5 fixed w-full z-40 top-0 place-items-center`}
      >
        <div className=" flex-1">
          <Link to="/">
            <img src="/images/logo.png" width={200} />
          </Link>
        </div>

        <div className=" flex-1 box-shadow shadow-lg">
          <Search history={history} />
        </div>

        <div className="flex gap-7 place-items-center  flex-1 justify-end">
          <Link to="/shop">
            <div className="flex gap-1 cursor-pointer">
              <StoreIcon />
              <p>Shop</p>
            </div>
          </Link>

          <Badge
            badgeContent={cartItems.length}
            id="cart_count"
            color="success"
          >
            <span id="cart">
              <ShoppingCartIcon
                className="cursor-pointer"
                onClick={handleCartClick}
              />
            </span>
          </Badge>
          {showCart && (
            <div className="bg-white fixed h-screen top-0  md:top-0 right-0 w-96 p-4 z-10 overflow-y-auto pb-24 cartSlide shadow-xl">
              <div className="flex justify-between pb-5 pt-10">
                <h2 className="font-bold text-2xl text-gray-700 mb-4">Cart</h2>
                <CloseIcon
                  onClick={closeCart}
                  className="cursor-pointer absolute z-40 bg-black text-white text-xl top-5 right-6"
                />
              </div>
              {cartItems.length === 0 ? (
                <div className="text-center ">
                  <p className="text-black text-xl font-medium">
                    Your cart is empty.
                  </p>
                  <br />
                  <br />
                  <HourglassBottomOutlined
                    className="text-gray-400"
                    style={{ fontSize: "4em" }}
                  />
                  <br />
                  <br />
                  <p className="text-gray-600">
                    Select an item from the product list
                  </p>
                </div>
              ) : (
                <div>
                  {cartItems.map((item) => (
                    <div className="cart-item" key={item.product}>
                      <ul className="flex-col flex mt-5">
                        <li className="mb-2 flex gap-5">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 bg-zinc-200 border"
                          />
                          <div className="flex-2">
                            <span className="mr-2 font-bold text-black">
                              {item.name}
                            </span>
                            <p className="text-gray-700 font-medium">
                              {" "}
                              ₦{item.price}
                            </p>
                            <div className="text-gray-500 flex items-center">
                              <div>Quantity: {item.quantity}</div>
                            </div>
                          </div>
                          <div className="flex-1 flex justify-end ">
                            <button
                              className="text-red-500"
                              onClick={() =>
                                removeCartItemHandler(item.id)
                              }
                            >
                              <DeleteForeverIcon />
                            </button>
                          </div>
                        </li>
                      </ul>
                    </div>
                  ))}

                  <div className="flex justify-between items-center my-4">
                    <span className="text-gray-700 font-medium">Total:</span>
                    <span className="text-zinc-700 font-bold">
                      {" "}
                      ₦
                      {cartItems
                        .reduce(
                          (acc, item) => acc + item.quantity * item.price,
                          0
                        )
                        .toFixed(2)}{" "}
                    </span>
                  </div>
                  <div className="flex flex-col space-y-5 mt-10">
                    <Link to="/cart">
                      <button
                        className="bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded-lg w-full"
                        onClick={closeCart}
                      >
                        View Cart
                      </button>
                    </Link>
                    <button
                      className="bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-lg w-full"
                      onClick={proceedToPayment}
                      disabled={loading ? true : false}
                    >
                      {loading ? (
                        <div className="flex gap-5 place-items-center justify-center">
                          {" "}
                          <CircularProgress
                            size={24}
                            className="text-white"
                          />{" "}
                          <p>Processing ...</p>{" "}
                        </div>
                      ) : (
                        "Check Out"
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          <Link to="/support">
            <div className="flex gap-1 cursor-pointer">
              <ContactSupportIcon />

              <p>Help</p>
            </div>
          </Link>
          <div>
            {user ? (
              <div>
                <Link
                  to="#!"
                  className="btn dropdown-toogle  flex place-items-center gap-4"
                  type="button"
                  onClick={handleClickUser}
                >
                  {user && user.avatar ? (
                    <Avatar
                      src={user.avatar.url}
                      alt={user.firstName && user.firstName}
                    />
                  ) : (
                    <div>
                      {user && user.firstName && (
                        <Avatar>
                          {user.firstName.charAt(0).toUpperCase()}
                        </Avatar>
                      )}
                    </div>
                  )}
                  <div className="flex gap-1">
                    <span className="font-bold text-gray-300">
                      {user && user.firstName}
                    </span>

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

      <nav
        className={`${isAdminPage ? "bg-gray-900" : "bg-primary-color"} 
     lg:hidden flex flex-col  gap-5 px-8 py-5  text-white fixed w-full z-10 top-0
      `}
      >
        <div>
          <div className="flex justify-between place-items-center">
            <div>
              <NotesIcon className="cursor-pointer" onClick={handleOpenMenu} />
            </div>

            <div>
              <Link to="/">
                <img src="/images/logo.png" width={130} />
              </Link>{" "}
            </div>

            <div className="flex gap-5 place-items-center">
              <Badge
                badgeContent={cartItems.length}
                id="cart_count"
                color="success"
              >
                <span id="cart">
                  <ShoppingCartIcon
                    className="cursor-pointer"
                    onClick={handleCartClick}
                  />
                </span>
              </Badge>

              {showCart && (
                <div className="bg-overlay absolute h-screen w-full z-10 ">
                  <div className="bg-white fixed h-screen top-0  md:top-0 right-0 w-5/6 p-4 z-10 overflow-y-auto pb-24 cartSlide shadow-xl">
                    <div className="flex justify-between pb-5 pt-10">
                      <h2 className="font-bold text-2xl text-gray-700 mb-4">
                        Cart
                      </h2>
                      <CloseIcon
                        onClick={closeCart}
                        className="cursor-pointer absolute z-40 bg-black text-white text-xl top-5 right-6"
                      />
                    </div>
                    {cartItems.length === 0 ? (
                      <div className="text-center ">
                        <p className="text-black text-xl font-medium">
                          Your cart is empty.
                        </p>
                        <br />
                        <br />
                        <HourglassBottomOutlined
                          className="text-gray-400"
                          style={{ fontSize: "4em" }}
                        />
                        <br />
                        <br />
                        <p className="text-gray-600">
                          Select an item from the product list
                        </p>
                      </div>
                    ) : (
                      <div>
                        {cartItems.map((item) => (
                          <div className="cart-item" key={item.product}>
                            <ul className="flex-col flex mt-5">
                              <li className="mb-2 flex gap-5">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-20 h-20 bg-zinc-200 border"
                                />
                                <div className="flex-2">
                                  <span className="mr-2 font-bold text-black">
                                    {item.name}
                                  </span>
                                  <p className="text-gray-700 font-medium">
                                    {" "}
                                    ₦{item.price}
                                  </p>
                                  <div className="text-gray-500 flex items-center">
                                    <div>Quantity: {item.quantity}</div>
                                  </div>
                                </div>
                                <div className="flex-1 flex justify-end ">
                                  <button
                                    className="text-red-500"
                                    onClick={() =>
                                      removeCartItemHandler(item.product)
                                    }
                                  >
                                    <DeleteForeverIcon />
                                  </button>
                                </div>
                              </li>
                            </ul>
                          </div>
                        ))}

                        <div className="flex justify-between items-center my-4">
                          <span className="text-gray-700 font-medium">
                            Total:
                          </span>
                          <span className="text-zinc-700 font-bold">
                            {" "}
                            ₦
                            {cartItems
                              .reduce(
                                (acc, item) => acc + item.quantity * item.price,
                                0
                              )
                              .toFixed(2)}{" "}
                          </span>
                        </div>
                        <div className="flex flex-col space-y-5 mt-10">
                          <Link to="/cart">
                            <button
                              className="bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded-lg w-full"
                              onClick={closeCart}
                            >
                              View Cart
                            </button>
                          </Link>
                          <button
                            className="bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-lg w-full"
                            onClick={proceedToPayment}
                            disabled={loading ? true : false}
                          >
                            {loading ? (
                              <div className="flex gap-5 place-items-center justify-center">
                                {" "}
                                <CircularProgress
                                  size={24}
                                  className="text-white"
                                />{" "}
                                <p>Processing ...</p>{" "}
                              </div>
                            ) : (
                              "Check Out"
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {user ? (
                <div>
                  {" "}
                  {user && user.avatar ? (
                    <Avatar
                      src={user.avatar.url}
                      alt={user.firstName && user.firstName}
                    />
                  ) : (
                    <div>
                      {user && user.firstName && (
                        <Avatar>
                          {user.firstName.charAt(0).toUpperCase()}
                        </Avatar>
                      )}
                    </div>
                  )}{" "}
                </div>
              ) : (
                <div>
                  <Avatar />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className=" box-shadow shadow-lg">
          <Search history={history} />
        </div>
        {openMenu && (
          <div className="bg-overlay absolute h-screen w-full z-40 ">
            <div className="h-screen fixed bg-zinc-800 w-5/6 navMenu">
              <div className="flex justify-end pr-5 py-10">
                <CloseIcon onClick={closeMenu} />
              </div>

              <div className="text-neutral-400">
                <div className="py-4 pl-3">
                  <Link to="/" onClick={closeMenu}>
                    <p>Home</p>
                  </Link>
                </div>
                <hr className="border border-neutral-700" />
                <div className="py-4 pl-3">
                  <Link to="/shop" onClick={closeMenu}>
                    <p>Shop</p>
                  </Link>
                </div>
                <hr className="border border-neutral-700" />
                <div className="py-4 pl-3">
                  <Link to="/aboutus" onClick={closeMenu}>
                    <p>About D'Magni</p>
                  </Link>
                </div>
                <hr className="border border-neutral-700" />
                <div className="py-4 pl-3">
                  <Link to="/support" onClick={closeMenu}>
                    <p>Help</p>
                  </Link>
                </div>
                <hr className="border border-neutral-700" />
                {user ? (
                  <div>
                    {user && user.role !== "admin" ? (
                      <div>
                        <div className="py-4 pl-3">
                          <Link to="/orders/me" onClick={closeMenu}>
                            Orders
                          </Link>
                        </div>
                        <hr className="border border-neutral-700" />
                      </div>
                    ) : (
                      <div>
                      <div className="py-4 pl-3">
                        <Link to="/dashboard" onClick={closeMenu}>
                          Dashboard
                        </Link>
                      </div>
                      <hr className="border border-neutral-700" />
                           <div className="py-4 pl-3">
                           <Link to="/orders/me" onClick={closeMenu}>
                             Orders
                           </Link>
                         </div>
                         <hr className="border border-neutral-700" />
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
                                <Link
                                  to="/admin/products"
                                  className="flex items-center  hover:bg-white hover:text-gray-900 hover:p-1"
                                  onClick={closeMenu}
                                >
                                  <CategoryIcon className="mr-2" /> All
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="/admin/product"
                                  className="flex items-center  hover:bg-white hover:text-gray-900 hover:p-1"
                                  onClick={closeMenu}
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
                            className="flex items-center  hover:bg-white hover:text-gray-900 hover:p-1"
                            onClick={closeMenu}
                          >
                            <ShoppingCart className="mr-2" /> Orders
                          </Link>
                        </li>
                        <li className="my-2">
                          <Link
                            to="/admin/users"
                            className="flex items-center   hover:bg-white hover:text-gray-900 hover:p-1"
                            onClick={closeMenu}
                          >
                            <PeopleIcon className="mr-2" /> Users
                          </Link>
                        </li>
                        <li className="my-2">
                          <Link
                            to="/admin/reviews"
                            className="flex items-center   hover:bg-white hover:text-gray-900 hover:p-1"
                            onClick={closeMenu}
                          >
                            <ReviewsIcon className="mr-2" /> Reviews
                          </Link>
                        </li>
                      </ul>
                    )}
                    <div className="py-4 pl-3">
                      <Link to="/me" onClick={closeMenu}>
                        Profile
                      </Link>
                    </div>
                    <hr className="border border-neutral-700" />

                    <div className="py-4 pl-3">
                      <Link
                        to="/"
                        onClick={() => {
                          closeMenu();
                          logoutHandler();
                        }}
                      >
                        Logout
                      </Link>
                    </div>
                  </div>
                ) : (
                  !loading && (
                    <div>
                      <p className="py-4 pl-4">ACCOUNT</p>

                      <div className="py-4 pl-3">
                        <Link to="/register" onClick={closeMenu}>
                          Sign Up
                        </Link>
                      </div>
                      <hr className="border border-neutral-700" />
                      <div className="py-4 pl-3">
                        <Link to="/login" onClick={closeMenu}>
                          Login
                        </Link>
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
