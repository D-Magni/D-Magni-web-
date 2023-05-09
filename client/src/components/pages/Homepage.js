import React, { Fragment, useEffect, useState } from "react";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import MetaData from "../layouts/MetaData";
import Pagination from "react-js-pagination";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Slider from "@mui/material/Slider";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productActions";
import Product from "../product/Product";
import Loader from "../layouts/Loader";
import Rating from "@mui/material/Rating";

import { useAlert } from "react-alert";

import { useParams } from "react-router-dom";


const Homepage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [rating, setRating] = useState(0);

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
    dispatch(getProducts(keyword, currentPage, price, rating));
  }, [dispatch, alert, error, keyword, currentPage, price, rating]);
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
  const priceFormatter = (value) => {
    return `$${value[0]}`;
  };
  
  const marks = [
    {
      value: 1,
      label: "1",
    },
    {
      value: 1000,
      label: "1000",
    },
  ];
  
  const marksArray = Object.entries(marks).map(([value, label]) => ([ value=parseInt(value), label ]));

  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <MetaData title="High-Quality Shoes for Every Occassion" />

          <section className="py-36 px-7 md:px-24 bg-neutral-100">
            <h3 className="text-2xl md:text-3xl  py-10 font-bold">
              LATEST PRODUCTS
            </h3>

            <div className="">
              {keyword ? (
                <Fragment>
                  <div className=" flex">
                  <div className="w-full flex-1">
                    <Box>
                    <Tooltip title={priceFormatter(price)} placement="bottom">

                      <Slider
                            range

                      marks={marksArray}
                         min={1}
                         max={1000}
                         defaultValue={[1, 1000]}                     
                         value={price}
                         onChange={handlePriceChange}
                         aria-label="Default"
                        valueLabelDisplay="auto"
                        tooltipVisible={true}
                        tooltipPlacement="bottom"
                        handleStyle={[
                          { backgroundColor: "#1890ff", border: "none" },
                          { backgroundColor: "#1890ff", border: "none" },
                        ]}
                        trackStyle={[{ backgroundColor: "#1890ff" }]}
                      />
                      </Tooltip>

                    </Box>

                    <div>
                      <h5>Ratings</h5>
                      <ul>
                      {[5, 4, 3, 2, 1].map(star => (
                        <li style={{
                          cursor: 'pointer',
                          listStyleType: 'none'
                        }}
                        key={star}
                        onClick={() => setRating(star)}
                        >
                          <div className="rating-router">
                            <div className="rating-inner" 
                          >
                            <Box
                      sx={{
                        "& > legend": { mt: 2 },
                      }}
                    >
                      <Rating
                        name="read-only"
                        readOnly
                        value={star}

                      />
                    </Box>
                            </div>
                          </div>
                        </li>
                      ))}
                      </ul>
                  </div>

                  <div className="flex-4">
                    <div className="flex  flex-wrap gap-20">
                  { products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
                    </div>
                  </div>
</div>
                  </div>
                </Fragment>
              ) : (
              
                <div className="flex  flex-wrap gap-20">
                { products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
                  </div>
              )}
              {/* for mobile, is is a slide dive which you can navigate left and right, or it is going to be small in size */}
            </div>
          </section>

          {resPerPage <= productsCount && (
            <div className="flex justify-content-center mt-5">
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

          <Footer />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Homepage;
