import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";
import { getAdminProducts, clearErrors } from "../../actions/productActions";
import Visibility from "@mui/icons-material/Visibility";
import { useAlert } from "react-alert";
import DeleteForever from "@mui/icons-material/DeleteForever";
import SearchIcon from "@mui/icons-material/Search";
import PencilIcon from "@mui/icons-material/wRITE";

const ProductList = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(getAdminProducts());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleSearch = (event) => {
    const keyword = event.target.value.toLowerCase(); // Convert user input to lowercase
    const filtered = products.filter(
      (product) =>
        product._id.toLowerCase().includes(keyword)
    );
    setFilteredProducts(filtered);
    setSearchTerm(keyword);
  };

  return (
    <Fragment>
      <MetaData title={"All Products"} />
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="my-5 text-3xl font-bold text-gray-600">All Products</h1>

        <div className="flex md:justify-end">
          <div className="border border-gray-400 rounded-md py-1 flex px-3 mb-10 mt-3">
            <input
              type="text"
              name="search"
              className="w-full bg-transparent outline-none"
              placeholder="Search for orders..."
              onChange={handleSearch}
            />
            <SearchIcon className="text-gray-400" />
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="overflow-x-auto">
            <div className="align-middle inline-block min-w-full">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Image
                      </th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product ID
                      </th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stock
                      </th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product, index) => (
                  <tr key={index}>
                    <td className="py-4 px-6">
              
                      {product.images &&
                    product.images.map((image) => (
                        <img
                        className="h-16 w-16 object-cover rounded-md"
                          src={image.url}
                          alt={product.title}
                        />
                    ))}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                      {product._id}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                      {product.name}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                      N{product.price}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                      {product.stock}
                    </td>
                    <td className="py-4 px-6 text-sm">
                      <Link
                        to={`admin/product/${product._id}`}
                        className="text-green-600 hover:underline mr-4"
                      >
                        View
                      </Link>
                      <Link
                        to={`admin/product/${product._id}/edit`}
                        className="text-blue-600 hover:underline"
                      >
                        <PencilIcon/>
                      </Link>
                      <button className="text-red-600 hover:underline">
                      <DeleteForever/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )}
  </div>
</Fragment>
);
};

export default ProductList;