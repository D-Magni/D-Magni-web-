// Product.js
import React from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { Box } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import { useDispatch } from "react-redux";
import { addToCart } from "../../actions/cartActions";
import { useAlert } from "react-alert";
import { lazy, Suspense } from "react";
import { PuffLoader } from "react-spinners";
const LazyImage = lazy(() => import("../lazyloader/LazyImage"));

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const handleAddToCart = () => {
    dispatch(addToCart(product._id, 1));
    alert.success("Item added to cart");
  };
  return (
    <div className="w-64 border p-5 bg-white">
      <div className="h-36">
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
        <h5 className="text-sm font-bold">
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
        <p className="text-gray-600 text-xs">₦{product.price}</p>
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
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
