import React, { Fragment, useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";
import Rating from "@mui/material/Rating";
import { Box } from "@mui/material";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductDetails,
  clearErrors,
  newReview,
} from "../../actions/productActions";
import { myOrders } from "../../actions/orderActions";
import { getProducts } from "../../actions/productActions";
import { Link } from "react-router-dom";
import { lazy, Suspense } from "react";
import { addToCart } from "../../actions/cartActions";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import { Modal, Typography } from "@mui/material";

import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import ListReviews from "../review/ListReviews";
import { PuffLoader } from "react-spinners";

const LazyImage = lazy(() => import("../lazyloader/LazyImage"));

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hasOrdered, setHasOrdered] = useState(false);
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { orders } = useSelector((state) => state.myOrders);

  const { error: reviewError, success } = useSelector(
    (state) => state.newReview
  );
  const dispatch = useDispatch();
  const alert = useAlert();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    dispatch(getProductDetails(id));

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Posted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [dispatch, alert, error, reviewError, success, id]);
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getProducts());
  }, [dispatch, error, alert]);

  const increaseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber >= product.stock) return;

    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };

  const decreaseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber <= 1) return;

    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  };

  const handleAddToCart = () => {
    dispatch(addToCart(id, quantity));
    alert.success("Item Add to Cart");
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        await dispatch(myOrders());
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, [dispatch]);

  useEffect(() => {
    const userOrders = orders;

    // Check if the current product's ID is present in the user's orders
    if (userOrders && userOrders.length > 0) {
      const hasOrderedProduct = userOrders.some((order) =>
        order.orderItems.some((item) => item.product === id)
      );
      setHasOrdered(hasOrderedProduct);
    }
  }, [orders, id]);
  // Inside your component

  const classes = {
    highlighted: {
      color: "orange",
    },
    hovered: {
      color: "yellow",
    },
  };
  function setUserRatings(event, newValue) {
    const ratingIcons = document.querySelectorAll(".reviewrating");

    if (event === "click" || event === "mouseover") {
      ratingIcons.forEach((icon, index) => {
        if (index < newValue) {
          icon.classList.add(classes.highlighted);
        } else {
          icon.classList.remove(classes.highlighted);
        }
      });
    }

    if (event === "click") {
      setRating(newValue);
    }
  }

  const reviewHandler = () => {
    const formData = new FormData();

    formData.set("rating", rating);
    formData.set("comment", comment);
    formData.set("productId", id);

    console.log("Review Data:", {
      rating,
      comment,
      productId: id,
      firstName: user.firstName,
      lastName: user.lastName,
    });
    handleClose(true);
    dispatch(newReview(formData));
    dispatch(getProductDetails(id));
  };

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getProducts());
  }, [dispatch, error, alert]);

  // Limit the displayed recommended products to 6
  let recommendedProducts = products && [...products];

  const particularProductPrice = product.price;

  recommendedProducts &&
    recommendedProducts.sort(
      (a, b) =>
        Math.abs(a.price - particularProductPrice) -
        Math.abs(b.price - particularProductPrice)
    );

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={product.name} />
          <div className="mx-auto pt-20 md:pt-36 pb-14 px-7 md:px-24">
            <div className="flex flex-col md:flex-row justify-center">
              <div className="pt-20 md:w-1/2 lg:w-1/3 p-4 flex-1">
                <Carousel
                  pause="hover"
                  showArrows={true}
                  showStatus={true}
                  showThumbs={false}
                  showIndicators={false}
                  autoPlay
                  interval={5000}
                  className="w-full"
                >
                  {product.images &&
                    product.images.map((image) => (
                      <div className="h-56 md:h-80 w-full lg:h-96">
                        <img
                          className="mx-auto h-full w-full object-cover"
                          src={image.url}
                          alt={product.title}
                        />
                      </div>
                    ))}
                </Carousel>
              </div>

              <div className="md:w-1/2 lg:w-2/3 p-4 flex-1">
                <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                <p className="text-xl md:text-3xl font-bold mb-4">
                  {" "}
                  ₦{product.price}
                </p>
              
                <hr className="my-4" />

                <div className="flex items-center mb-4">
                  <div className="mr-2">
                    <Rating name="read-only" value={product.ratings} readOnly />
                  </div>
                  <span id="no_of_reviews" className="text-gray-700">
                    {product.numOfReviews} review(s)
                  </span>
                </div>
                <h4 className="text-xl font-bold mb-2">Description:</h4>
                <p className="text-gray-700 mb-4">{product.description}</p>
                <p className="text-gray-700 mb-2 text-sm">
                 <b>PRODUCT ID: </b> {product._id}
                </p>
                <hr className="my-4" />

                <div className="flex items-center mb-4">
                  <span
                    className="bg-gray-400 text-white font-bold w-7 text-center py-1 rounded-l cursor-pointer"
                    onClick={decreaseQty}
                  >
                    -
                  </span>

                  <input
                    type="number"
                    className=" bg-gray-200 text-gray-700 px-2 py-1 w-16 text-center count "
                    value={quantity}
                    readOnly
                  />

                  <span
                    className="bg-gray-400 text-white font-bold w-7 py-1 text-center rounded-r cursor-pointer"
                    onClick={increaseQty}
                  >
                    +
                  </span>
                </div>
                <hr />

                <div className="py-10">
                  <p>
                    Status:{" "}
                    <span
                      id="stock_status"
                      className={
                        product.stock > 0 ? "text-green-600" : "text-red-600"
                      }
                    >
                      {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </p>
                </div>

                <button
                  type="button"
                  id="cart_btn"
                  className="bg-gray-900 text-white px-4 py-2 rounded disabled:opacity-50"
                  disabled={product.stock === 0}
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>

                <hr className="my-4" />

                {user ? (
                  hasOrdered ? (
                    <button
                      type="button"
                      id="review_btn"
                      className="bg-green-500 text-white px-4 py-2 rounded"
                      onClick={() => {
                        handleOpen();
                        setUserRatings();
                      }}
                    >
                      Submit Your Review
                    </button>
                  ) : (
                    <div
                      className="mt-5 bg-red-200 text-red-900 py-2 px-3"
                      type="alert"
                    >
                      You can only submit a review after ordering this product.
                    </div>
                  )
                ) : (
                  <div
                    className="mt-5 bg-red-200 text-red-900 py-2 px-3"
                    type="alert"
                  >
                    Login to post your review
                  </div>
                )}

                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="ratingModalLabel"
                  aria-describedby="ratingModalDescription"
                >
                  <Box
                    className="w-5/6 md:w-1/3 flex flex-col space-y-5"
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      // width: "80%",
                      bgcolor: "background.paper",
                      boxShadow: 24,
                      p: 4,
                    }}
                  >
                    <Typography
                      id="ratingModalLabel"
                      variant="h5"
                      component="h2"
                      sx={{ mb: 2 }}
                      className="font-bold text-gray-600 py-5"
                    >
                      Submit Your Review
                    </Typography>
                    <Typography
                      id="ratingModalDescription"
                      variant="body1"
                      sx={{ mb: 2 }}
                      className="text-gray-600"
                    >
                      Please fill out the fields to submit your review:
                    </Typography>
                    <form className="flex flex-col space-y-5">
                      <div className="form-group font-bold flex gap-2 text-gray-700">
                        <label htmlFor="rating">Rating:</label>
                        <Rating
                          name="read-only"
                          value={rating}
                          onChange={(event, newValue) => setRating(newValue)}
                          className={classes.highlighted}
                          // onMouseOver={setUserRatings}
                          // onMouseOut={setUserRatings}
                        />
                      </div>
                      <div className="form-group font-medium flex gap-2 text-gray-700">
                        <textarea
                          className="form-control border border-gray-400 outline-none w-full py-5 px-3"
                          id="review"
                          rows="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Write your review..."
                          required
                        ></textarea>
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="bg-blue-900 text-white py-2 rounded-md px-10"
                          onClick={reviewHandler}
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </Box>
                </Modal>
              </div>
            </div>
          </div>
          {product.reviews && product.reviews.length > 0 && (
            <ListReviews reviews={product.reviews} />
          )}
          <div className="py-10 px-7 md:px-24 ">
            <h2 className="text-2xl font-bold mb-4">You may also like</h2>
            <div className="flex flex-wrap gap-4 md:gap-8">
              {recommendedProducts &&
                recommendedProducts.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white p-3 rounded-lg shadow-md h-full w-36 md:w-64 sm:p-2 mb-7 "
                  >
                    <Link to={`/product/${product._id}`}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
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
                    </Link>
                    <h3 className="text-lg font-bold mb-2 truncate">
                      {product.name}
                    </h3>
                    <p className="text-gray-700">${product.price}</p>
                    <Link
                      to={`/product/${product._id}`}
                      className="block mt-4 text-blue-500 hover:underline"
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                      View Product
                    </Link>
                  </div>
                ))}
            </div>
          </div>{" "}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
