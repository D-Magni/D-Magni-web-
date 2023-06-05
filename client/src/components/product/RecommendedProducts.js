import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productActions";
import { Link } from "react-router-dom";
import { lazy, Suspense } from "react";
import { PuffLoader } from "react-spinners";

const LazyImage = lazy(() => import("../lazyloader/LazyImage"));

const RecommendedProducts = () => {
  const { error, products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getProducts());
  }, [dispatch, error]);

  // Limit the displayed recommended products to 6
  let recommendedProducts = products && [...products]; 
  recommendedProducts && recommendedProducts.sort(() => Math.random() - 0.5); 
   recommendedProducts = recommendedProducts && recommendedProducts.slice(0, 6); 

  return (
    <div className="mt-10 px-7 md:px-24">
      <h2 className="text-2xl font-bold mb-4">You may like</h2>
      <div className="flex flex-wrap gap-4 md:gap-8">
        {recommendedProducts &&
          recommendedProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white p-3 rounded-lg shadow-md h-full w-36 md:w-64 sm:p-2 mb-7 "
            >

              <Link to={`/products/${product._id}`}>
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
              <h3 className="text-lg font-bold mb-2 truncate">{product.name}</h3>
              <p className="text-gray-700">${product.price}</p>
              <Link
                to={`/products/${product._id}`}
                className="block mt-4 text-blue-500 hover:underline"
              >
                View Product
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;
