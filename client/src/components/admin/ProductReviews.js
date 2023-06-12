import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layouts/MetaData";
import {
  getProductReviews,
  deleteReview,
  clearErrors,
} from "../../actions/productActions";
import { useAlert } from "react-alert";
import DeleteForever from "@mui/icons-material/DeleteForever";
import Sidebar from "./Sidebar";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";

const ProductReviews = () => {
  const [productId, setProductId] = useState("");
  const alert = useAlert();
  const dispatch = useDispatch();
  const { error, reviews } = useSelector((state) => state.productReviews);
  const { isDeleted } = useSelector((state) => state.review);
  const [filteredReviews, setFilteredReviews] = useState(reviews);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(
    () => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
      if (productId !== "") {
        dispatch(getProductReviews(productId));

        if (isDeleted) {
          alert.success("Review deleted successfully");
          dispatch({ type: DELETE_REVIEW_RESET });
        }
      }
    },
    [dispatch, alert, error, productId, isDeleted],
    isDeleted
  );

  useEffect(() => {
    setFilteredReviews(reviews);
  }, [reviews]);

  const deleteReviewHandler = (id) => {
    dispatch(deleteReview(id, productId));
    setFilteredReviews(filteredReviews.filter((review) => review._id !== id));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getProductReviews(productId));
  };
  return (
    <Fragment>
      <MetaData title={"Product Reviews"} />
      <div className="lg:flex">
        <div className="lg:w-1/5">
          <Sidebar />
        </div>

        <div className="lg:w-4/5 py-36 px-4 sm:px-6 lg:px-8">
          <h1 className="my-5 text-3xl font-bold text-gray-700">
            Product Reviews
          </h1>
          <div className="c pt-3 pb-16">
            <div>
              <form
                onSubmit={submitHandler}
                className="flex flex-col space-y-5"
              >
                <div className="border-2 border-gray-300 lg:w-96 sm:w-full w-full hover:border-blue-900 py-2 px-3 rounded-md flex justify-between">
                  <input
                    type="text"
                    id="email_field"
                    className="form-control outline-none bg-transparent w-full"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    placeholder="Enter Product ID"
                  />
                </div>
                <div>
                  <button
                    id="search_button"
                    type="submit"
                    className="bg-zinc-900 text-white rounded-md md:w-64 w-full hover:bg-gray-500 py-3"
                  >
                    SEARCH
                  </button>
                </div>
              </form>
            </div>
          </div>
          {reviews && reviews.length > 0 ? (
            <div className="overflow-x-scroll">
              <table className="min-w-full border divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Review ID
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Comment
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                {filteredReviews &&
                  filteredReviews.map((review, index) => (
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr key={index}>
                        <td className="py-4 px-6 text-sm text-gray-500">
                          {review._id}
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-500">
                          {review.rating}
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-500">
                          {review.comment}
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-500">
                          {review.firstName} {review.lastName}
                        </td>
                        <td className="py-4 px-6 text-sm flex justify-between gap-5">
                          <button
                            className="bg-red-600 p-1 text-white hover:bg-red-700 rounded"
                            onClick={() => deleteReviewHandler(review._id)}
                          >
                            <DeleteForever />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  ))}
              </table>
            </div>
          ) : (
            <p className="mt-5 text-center"> No reviews</p>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;
