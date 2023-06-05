import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productActions";
import Product from "../product/Product";
import Loader from "../layouts/Loader";

import { useAlert } from "react-alert";

import { useParams } from "react-router-dom";

const Shop = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(1500000);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

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



  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <MetaData title="High-Quality Shoes for Every Occasion" />

          <section className="py-36 px-4 md:px-24 bg-neutral-100">
            <h3 className="text-2xl md:text-3xl py-10 font-bold text-gray-700">
              Browse Our Collection
            </h3>

            <div className="pb-20">
              <p className="text-lg text-gray-400">
                Welcome to our shop! Discover our wide range of high-quality
                shoes for every occasion. Whether you're looking for luxury
                shoes, casual sneakers, elegant dress shoes, or comfortable
                sandals, we have it all. Browse through our collection and find
                the perfect pair of shoes that suits your style and needs.
              </p>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start">
         
              <div className="flex-1 md:w-3/4">
                <div className="flex flex-wrap gap-10 md:gap-20 place-items-center justify-center md:justify-start">
                  {products &&
                    products.map((product) => (
                      <Product key={product._id} product={product} />
                    ))}
                </div>
              </div>
            </div>

            {resPerPage <= productsCount && (
              <div className="grid justify-content-center place-items-center mt-20">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNo}
                  nextPageText={"Next"}
                  prevPageText={"Prev"}
                  firstPageText={"First"}
                  lastPageText={"Last"}
                  itemClass="page-item"
                  linkClass="page-link"
                />
              </div>
            )}
          </section>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Shop;
