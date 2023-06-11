import React, { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import MetaData from "../layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productActions";
import Loader from "../layouts/Loader";
import { Carousel } from "react-responsive-carousel";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { addToCart, getCartItems } from "../../actions/cartActions";
import { lazy, Suspense } from "react";
import { PuffLoader } from "react-spinners";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { Box } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import { Typography } from "@mui/material";
import { SelectAll, ThumbUp, HeadsetMic, Lock } from "@mui/icons-material";

const LazyImage = lazy(() => import("../lazyloader/LazyImage"));

const Homepage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(1500000);
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false)
  const alert = useAlert();

  const dispatch = useDispatch();

  const { loading, products, error } = useSelector((state) => state.products);

  const { keyword } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getProducts(keyword, currentPage, minPrice, maxPrice, rating));
  }, [
    dispatch,
    alert,
    error,
    keyword,
    currentPage,
    minPrice,
    maxPrice,
    rating,
  ]);

  const handleAddToCart = (product) => {
    setIsLoading(true);

    dispatch(addToCart(product._id, 1));
    setIsLoading(false);
    alert.success("Item added to cart");
    
  };
  const inputRef = useRef(null);

  const showAlert = (e) => {
    e.preventDefault();
    const email = inputRef.current.value;

    if (email.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please enter your email address.",
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: `Thank you for subscribing with email: ${email}`,
      });
      // TODO: Add logic to handle the subscription form submission
      // Reset the input field after successful submission
      inputRef.current.value = "";
    }
  };

  const sortedProducts = products && [...products].sort((a, b) => new Date(b.date) - new Date(a.date));
  const latestProducts = sortedProducts && sortedProducts.slice(0, 10);
  
  // Sort the products by price in descending order
  const bestSellingProducts = products && [...products].sort((a, b) => b.price - a.price).slice(0, 8);

  const featuredProducts = products && [...products].sort((a, b) => b.rating - a.rating).slice(0, 8);
  
  if (loading && !products) {
    return <Loader />;
  }
  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <MetaData title="High-Quality Shoes for Every Occassion" />
          {/* Hero Section */}
          <section className=" pt-40 pb-10 px-5 md:px-24 lg:h-screen md:grid place-items-center bg-gradient-to-b from-gray-400 to-gray-100">
            <div className="flex lg:flex-row gap-10 lg:gap-20 flex-col-reverse   place-items-center">
              <div className="flex-1">
                <div className=" flex flex-col space-y-3 md:space-y-6">
                  <p className="text-xl md:text-4xl xl:text-6xl font-bold text-gray-700">
                    Elevate your steps with{" "}
                    <b className="text-primary-color font-bold">D'Magni</b>
                  </p>
                  <p className="text-base md:text-lg text-gray-600 font-medium">
                    Discover our exquisite collection of footwear that combines
                    style and comfort. Shop now and experience luxury at your
                    feet.
                  </p>

                  <div>
                    <Link to="/shop">
                      <button className="px-12 md:px-24 py-2 md:py-3 font-bold text-white bg-primary-color rounded hover:bg-gray-700">
                        Shop Now
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex-1 ">
                <Carousel
                  autoPlay
                  pause="hover"
                  showArrows={true}
                  showStatus={false}
                  showThumbs={false}
                  showIndicators={false}
                  interval={5000}
                  infiniteLoop={true}
                  className="w-full h-full "
                >
                  <div className="bg-gray-400 h-full">
                    <img
                      src="https://res.cloudinary.com/dwpebdy5z/image/upload/v1684604494/dmagni/ad/Ad2_ngybj4.jpg"
                      alt="adImage"
                      className="h-full"
                    />
                  </div>
                  <div className="bg-gray-400 h-full">
                    <img
                      src="https://res.cloudinary.com/dwpebdy5z/image/upload/v1684604490/dmagni/ad/Ad3_nykbno.jpg"
                      alt="adImage"
                      className="h-full"
                    />
                  </div>
                  <div className="bg-gray-400 h-full">
                    <img
                      src="https://res.cloudinary.com/dwpebdy5z/image/upload/v1684604486/dmagni/ad/Ad1_v81yhc.jpg"
                      alt="adImage"
                      className="h-full"
                    />
                  </div>
                </Carousel>
              </div>
            </div>
          </section>

          <div className=" py-5 md:py-20 px-4 md:px-24 bg-neutral-100 flex flex-col md:space-y-20 space-y-10">
            <section>
              <h3 className="text-xl md:text-3xl py-5 md:py-10 font-bold text-gray-700 text-left">
                LATEST PRODUCTS
              </h3>
              <div className="w-full flex flex-wrap justify-center gap-7 md:justify-center lg:justify-start">
                {latestProducts &&
                  latestProducts.map((product) => (
                    <div className="h-full w-36 md:w-64  p-1 sm:p-2 mb-7">
                      <div className=" border p-5 bg-white shadow-lg rounded-lg">
                        <div className="text-center">
                          <Suspense
                            fallback={
                              <div className="flex justify-center items-center bg-gray-100">
                                <PuffLoader color="gray" size={100} />
                              </div>
                            }
                          >
                            <LazyImage
                              src={product.images[0].url}
                              alt={product.name}
                              className="w-full h-36 object-cover rounded-md"
                            />
                          </Suspense>
                        </div>
                        <div className="text-center mt-3">
                          <h5 className="text-sm font-bold truncate">
                            <Link
                              to={`/product/${product._id}`}
                              className="underline hover:text-zinc-700"
                            >
                              {product.name}
                            </Link>
                          </h5>
                          <div className="flex flex-col space-y-1 justify-center items-center mt-2">
                            <Box sx={{ width: "1.5rem", height: "1.5rem" }}>
                              <Rating
                                name="read-only"
                                value={product.ratings}
                                readOnly
                                sx={{ fontSize: "0.875rem" }}
                              />
                            </Box>
                            <div className="text-xs font-bold ml-1">
                              ({product.numOfReviews} Reviews)
                            </div>
                          </div>
                          <p className="text-gray-600 text-xs mt-2">
                            ₦{product.price}
                          </p>
                          <div className="flex justify-center">
                            <Link
                              to={`/product/${product._id}`}
                              className="text-sec-color flex items-center text-xs underline hover:text-zinc-700"
                            >
                              <Visibility fontSize="small" className="mr-1" />
                              View Details
                            </Link>
                          </div>
                          <div className="text-center mt-2">
                            <button
                              className="bg-sec-color text-white px-3 py-1 text-xs rounded hover:bg-zinc-700"
                              disabled={product.stock === 0}
                              onClick={() => handleAddToCart(product)}
                            >
                              Add to cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </section>

            {/* Best Selling Products Section */}
            <section>
              <h3 className="text-xl md:text-3xl pb-5 md:py-10 font-bold text-gray-700">
                HOT PRODUCTS
              </h3>

              <div className="flex flex-wrap justify-center gap-8 md:justify-center lg:justify-start">
                {bestSellingProducts &&
                  bestSellingProducts.map((product) => (
                    <div className="px-4 md:px-0  mb-7 w-full md:w-64 ">
                      <div
                        key={product._id}
                        className="border p-5 bg-white h-full  p-1 sm:p-2shadow-lg rounded-lg"
                      >
                        <Link
                          to={`/product/${product._id}`}
                          className="block mt-4 px-3 py-1 text-xs rounded"
                        >
                          <div>
                            <Suspense
                              fallback={
                                <div className="flex justify-center items-center bg-gray-100">
                                  <PuffLoader color="gray" size={100} />
                                </div>
                              }
                            >
                              <LazyImage
                                src={product.images[0].url}
                                alt={product.name}
                                className="w-full h-full md:h-44 object-cover"
                              />
                            </Suspense>
                          </div>
                          <div className="text-center mt-3">
                            <h5 className="text-sm font-bold truncate">
                              <Link
                                to={`/product/${product._id}`}
                                className="underline hover:text-zinc-700"
                              >
                                {product.name}
                              </Link>
                            </h5>
                            <div className="flex justify-center items-center mt-2">
                              <Box>
                                <Rating
                                  name="read-only"
                                  value={product.ratings}
                                  readOnly
                                />
                              </Box>
                            </div>
                            <p className="text-gray-600 text-xs mt-2">
                              ₦{product.price}
                            </p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
            </section>

            {/* Featured Products Section */}
            <section>
              <div className="text-center px-4 md:py-5">
                <h3 className="text-2xl md:text-4xl py-2 font-bold text-gray-700">
                  Discover Our Featured Products
                </h3>
                <p className="text-gray-600">
                  Explore our carefully selected products for a premium shopping
                  experience.
                </p>
              </div>
              <div className="pt-5 w-full flex flex-wrap justify-center">
                {featuredProducts &&
                  featuredProducts.map((product) => (
                    <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 p-1 sm:p-2 mb-6">
                      <div className="border p-3 bg-white shadow-lg rounded-lg">
                        <div className="h-full">
                          <Suspense
                            fallback={
                              <div className="flex justify-center items-center bg-gray-100">
                                <PuffLoader color="gray" size={100} />
                              </div>
                            }
                          >
                            <LazyImage
                              src={product.images[0].url}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </Suspense>
                        </div>
                        <div className="text-center mt-3">
                          <h5 className="text-sm md:text-lg font-bold">
                            <Link
                              to={`/product/${product._id}`}
                              className="underline hover:text-zinc-700"
                            >
                              {product.name}
                            </Link>
                          </h5>

                          <p className="text-gray-600 text-xs md:text-sm">
                            ₦{product.price}
                          </p>
                          <div className="flex justify-center">
                            <Link
                              to={`/product/${product._id}`}
                              className="text-sec-color flex items-center text-xs md:text-sm underline hover:text-zinc-700"
                            >
                              <Visibility fontSize="small" className="mr-1" />
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </section>

            {/* Why Choose Us Section */}
            <section className=" py-5 md:py-10 px-4 md:px-24 bg-neutral-100">
              <div className="text-center">
                <Typography variant="h4" className="font-bold text-gray-700">
                  Why Choose Us?
                </Typography>
                <br />
                <Typography variant="body1" className="text-gray-600 mt-2">
                  We are dedicated to providing you with the best shopping
                  experience and high-quality products. Here are a few reasons
                  why you should choose us:
                </Typography>
              </div>

              <div className="flex flex-wrap justify-center mt-10">
                <div className="w-full lg:w-1/2 p-4">
                  <div className="bg-white shadow-lg rounded-lg p-6 h-80">
                    <div className="text-center flex flex-col gap-4 place-items-center">
                      <SelectAll fontSize="large" className="text-gray-600" />
                      <Typography
                        variant="h5"
                        className="text-lg font-bold text-gray-700"
                      >
                        Wide Selection
                      </Typography>
                      <Typography
                        variant="body1"
                        className="text-gray-600 mt-2 text-sm md:text-lg"
                      >
                        We offer a wide range of products to suit your style and
                        preferences. From casual shoes to formal footwear, we
                        have something for everyone.
                      </Typography>
                    </div>
                  </div>
                </div>

                <div className="w-full lg:w-1/2 p-4">
                  <div className="bg-white shadow-lg rounded-lg p-6 h-80">
                    <div className="text-center flex flex-col gap-4 place-items-center">
                      <ThumbUp fontSize="large" className="text-gray-600" />
                      <Typography
                        variant="h5"
                        className="text-lg font-bold text-gray-700"
                      >
                        Quality Assurance
                      </Typography>
                      <Typography
                        variant="body1"
                        className="text-gray-600 mt-2"
                      >
                        We ensure that all our products meet high-quality
                        standards. Each item is carefully inspected to provide
                        you with the best value for your money.
                      </Typography>
                    </div>
                  </div>
                </div>

                <div className="w-full lg:w-1/2 p-4">
                  <div className="bg-white shadow-lg rounded-lg p-6 h-80">
                    <div className="text-center flex flex-col gap-4 place-items-center">
                      <HeadsetMic fontSize="large" className="text-gray-600" />
                      <Typography
                        variant="h5"
                        className="text-lg font-bold text-gray-700"
                      >
                        Exceptional Service
                      </Typography>
                      <Typography
                        variant="body1"
                        className="text-gray-600 mt-2"
                      >
                        Our dedicated customer support team is always ready to
                        assist you with any inquiries or concerns. We strive to
                        provide exceptional service and ensure your
                        satisfaction.
                      </Typography>
                    </div>
                  </div>
                </div>

                <div className="w-full lg:w-1/2 p-4">
                  <div className="bg-white shadow-lg rounded-lg p-6 h-80">
                    <div className="text-center flex flex-col gap-4 place-items-center">
                      <Lock fontSize="large" className="text-gray-600" />
                      <Typography
                        variant="h5"
                        className="text-lg font-bold text-gray-700"
                      >
                        Secure Shopping
                      </Typography>
                      <Typography
                        variant="body1"
                        className="text-gray-600 mt-2"
                      >
                        Your privacy and security are important to us. We use
                        secure payment gateways and protect your personal
                        information to ensure a safe shopping experience.
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* Newsletter section */}
            <section className="px-4 md:px-24 flex flex-col gap-7 text-center py-10 md:py-20 place-items-center">
              <p className="text-xl md:text-4xl font-medium text-gray-700">
                Subscribe To Our Newsletter
              </p>
              <p className="text-gray-500 text-[11px] md:text-sm md:text-lg">
                Stay up to date with the latest news and exclusive offers from
                D'Magni. Join our newsletter and be the first to know about our
                new product launches, promotions, and events. Don't miss out on
                the opportunity to elevate your style and step up your fashion
                game with D'Magni.
              </p>
              <form className="flex w-full justify-center">
                <div className="border border-gray-300 w-3/6 px-3 pt-1 md:pt-2 bg-gray-200">
                  <input
                    type="email"
                    placeholder="Enter E-mail Address..."
                    name="email"
                    className="outline-none w-full bg-transparent text-sm md:text-md focus:none"
                    required
                    ref={inputRef}
                  />
                </div>
                <button
                  className="bg-gray-900 text-white px-3 py-2 md:py-3 text-sm"
                  onClick={showAlert}
                >
                  SUBSCRIBE
                </button>
              </form>
            </section>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Homepage;
