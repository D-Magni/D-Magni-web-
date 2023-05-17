import React, { Fragment, useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";
import Rating from "@mui/material/Rating";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { useDispatch, useSelector } from "react-redux";
import {
  getProductDetails,
  clearErrors,
  newReview,
} from "../../actions/productActions";
import { addItemToCart } from "../../actions/cartActions";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import { Modal, Typography } from "@material-ui/core";

import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import ListReviews from "../review/ListReviews";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { error: reviewError, success } = useSelector(
    (state) => state.newReview
  );
  const dispatch = useDispatch();
  const alert = useAlert();

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

  const addToCart = () => {
    dispatch(addItemToCart(id, quantity));
    alert.success("Item Add to Cart");
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const useStyles = makeStyles({
    highlighted: {
      color: "orange",
    },
    hovered: {
      color: "yellow",
    },
  });

  // Inside your component
  const classes = useStyles();
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
      firstName: user.firstName, // Assuming user object has firstName and lastName properties
      lastName: user.lastName,
    });
  
    dispatch(newReview(formData));
  };
  
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={product.name} />

          <div className="mx-auto pt-20 md:pt-36 pb-14 px-7 md:px-24">
            <div className="flex flex-col md:flex-row justify-center">
              <div className="md:w-1/2 lg:w-1/3 p-4 flex-1">
                <Carousel pause="hover" className="w-full">
                  {product.images &&
                    product.images.map((image) => (
                      <Carousel.Item key={image.public_id}>
                        <img
                          className="mx-auto h-96 object-contain md:h-96 w-96"
                          src={image.url}
                          alt={product.title}
                        />
                      </Carousel.Item>
                    ))}
                </Carousel>
              </div>

              <div className="md:w-1/2 lg:w-2/3 p-4 flex-1">
                <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                <p className="text-gray-700 mb-2">PRODUCT ID: {product._id}</p>

                <hr className="my-4" />

                <div className="flex items-center mb-4">
                  <div className="mr-2">
                    <Rating name="read-only" value={product.ratings} readOnly />
                  </div>
                  <span id="no_of_reviews" className="text-gray-700">
                    {product.numOfReviews} review(s)
                  </span>
                </div>

                <hr className="my-4" />

                <p className="text-3xl font-bold mb-4">N{product.price}</p>

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
                  className="bg-blue-900 text-white px-4 py-2 rounded disabled:opacity-50"
                  disabled={product.stock === 0}
                  onClick={addToCart}
                >
                  Add to Cart
                </button>

                <hr className="my-4" />

                <h4 className="text-xl font-bold mb-2">Description:</h4>
                <p className="text-gray-700 mb-4">{product.description}</p>
                {user ? (
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

          {product.reviews &&
            product.reviews.length > 0 && (
              <ListReviews reviews={product.reviews}/>
            )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
