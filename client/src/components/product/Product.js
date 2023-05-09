import React from "react";
import { Link } from 'react-router-dom';
import Rating from "@mui/material/Rating";
import { Box } from "@mui/material";

const Product = ({ product }) => {
  return (
    <div className="">
  
          <div className="w-56 border p-5 bg-white">
            <div>
              <img src={product.images[0].url} className="h-36 w-full object-cover "/>
              <br/>
              <div className="grid space-y-3 place-items-center">
                <h5>
                  <Link to={`/product/${product._id}`}>{product.name}</Link>
                </h5>

                <div className="flex">
                  <div>
                  <Box
              sx={{
                "& > legend": { mt: 2 },
              }}
            >
              <Rating name="read-only" value={product.ratings} readOnly />
            </Box>                  </div>
                  {/* <span className="text-sm font-bold">({product.numOfRev} Reviews)</span> */}
                </div>

                <p className="text-gray-600">N{product.price}</p>

                <Link to={`/product/${product._id}`} >
                    <button className="bg-sec-color text-white px-5 py-2 border-none rounded">
                    View Details
                    </button>
                    </Link>
              </div>
            </div>
          </div>
        
    </div>
  );
};

export default Product;
