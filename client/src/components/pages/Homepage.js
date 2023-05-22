import React, { Fragment, useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import MetaData from "../layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productActions";
import Product from "../product/Product";
import Loader from "../layouts/Loader";
import { Carousel } from "react-responsive-carousel";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Homepage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [rating, setRating] = useState(0);

  const alert = useAlert();

  const dispatch = useDispatch();

  const { loading, products, error, productsCount, resPerPage } = useSelector(
    (state) => state.products
  );

  const { keyword } = useParams();

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    const timer = setTimeout(() => {
      dispatch(getProducts(keyword, currentPage, price, rating));
    }, 500);

    return () => clearTimeout(timer);
  }, [dispatch, alert, error, keyword, currentPage, price, rating]);

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

  const latestProducts = products && products.slice(0, 10);

  // Sort the products by price in descending order
  const bestSellingProducts =
    products && products.sort((a, b) => b.price - a.price).slice(0, 8);

  // Shuffle the products array randomly
  const featuredProducts =
    products && products.sort(() => Math.random() - 0.5).slice(0, 8);
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
          <section className="pt-24 md:pt-5 relative">
            {" "}
            <Carousel
              autoPlay
              pause="hover"
              showArrows={true}
              showStatus={false}
              showThumbs={false}
              showIndicators={false}
              interval={5000}
              infiniteLoop={true}
              className="w-full"
            >
              <img
                src="https://res.cloudinary.com/dwpebdy5z/image/upload/v1684604494/dmagni/ad/Ad2_ngybj4.jpg"
                alt="adImage"
                className="h-full"
              />
              <img
                src="https://res.cloudinary.com/dwpebdy5z/image/upload/v1684604490/dmagni/ad/Ad3_nykbno.jpg"
                alt="adImage"
                className="h-full"
              />
              <img
                src="https://res.cloudinary.com/dwpebdy5z/image/upload/v1684604486/dmagni/ad/Ad1_v81yhc.jpg"
                alt="adImage"
                className="h-full"
              />
            </Carousel>
            <div className="absolute top-40 lg:top-96 px-6 md:px-24 flex flex-col space-y-3 md:space-y-6">
              <p className="text-lg  md:text-2xl lg:text-6xl font-bold text-white">
                Elevate your steps with{" "}
                <b className="text-primary-color font-bold">D'Magni</b>
              </p>
              <p className=" text-3xl md:text-6xl lg:text-8xl font-bold text-gray-200">
                Where fashion meets comfort.
              </p>
              <div>
                <button className="px-12 md:px-24 py-2 md:py-3 font-bold text-white bg-primary-color rounded">
                  Shop Now
                </button>
              </div>
            </div>
          </section>
          <div className="py-20 px-7 md:px-24 bg-neutral-100 flex flex-col md:space-y-20 space-y-10">
            {/* Latest Products Section */}
            <section>
              <h3 className="text-xl md:text-3xl py-10 font-bold text-gray-700">
                LATEST PRODUCTS
              </h3>
              <div className="w-full md:hidden flex space-x-5 overflow-x-auto">
                {latestProducts &&
                  latestProducts.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
              </div>
              <div className="hidden md:flex flex-wrap gap-12 justify-center  md:justify-start">
                {latestProducts &&
                  latestProducts.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
              </div>
            </section>

            {/* Best Selling Products Section */}
            <section>
              <h3 className="text-xl md:text-3xl py-10 font-bold text-gray-700">
                HOT PRODUCTS
              </h3>

              <div className="w-full md:hidden flex space-x-5 overflow-x-auto">
                {bestSellingProducts &&
                  bestSellingProducts.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
              </div>
              <div className="hidden md:flex flex-wrap gap-12 justify-center  md:justify-start">
                {bestSellingProducts &&
                  bestSellingProducts.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
              </div>
            </section>

            {/* Featured Products Section */}
            <section>
              <h3 className="text-xl md:text-3xl py-10 font-bold text-gray-700">
                FEATURED PRODUCTS
              </h3>
              <div className="w-full md:hidden flex space-x-5 overflow-x-auto">
                {featuredProducts &&
                  featuredProducts.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
              </div>
              <div className="hidden md:flex flex-wrap gap-12 justify-center  md:justify-start">
                {featuredProducts &&
                  featuredProducts.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
              </div>
            </section>

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
