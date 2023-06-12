import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";
import { getAdminProducts, deleteProduct, clearErrors } from "../../actions/productActions";
import { useAlert } from "react-alert";
import DeleteForever from "@mui/icons-material/DeleteForever";
import SearchIcon from "@mui/icons-material/Search";
import PencilIcon from "@mui/icons-material/Edit";
import Sidebar from "./Sidebar";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductList = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
  const [, setSearchTerm] = useState(""); 
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  const { error: deleteError, isDeleted } = useSelector(state => state.product)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    dispatch(getAdminProducts());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success('Product deleted successfully')
      dispatch({ type: DELETE_PRODUCT_RESET })
    }

  }, [dispatch, alert, error, deleteError, isDeleted]);

  
  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

 const handleSearch = (event) => {
  const keyword = event.target.value.toLowerCase(); // Convert user input to lowercase
  const filtered = products.filter(
    (product) =>
      product._id.toLowerCase().includes(keyword) ||
      product.name.toLowerCase().includes(keyword)
  );
  setFilteredProducts(filtered);
  setSearchTerm(keyword);
};

const deleteProductHandler = (id) => {
  dispatch(deleteProduct(id))
  setFilteredProducts(filteredProducts.filter(product => product._id !== id));

}
if (loading || typeof products === "undefined") {
  return <Loader />;
}

  return (
    <Fragment>
      <MetaData title={"All Products"} />
      <div className="lg:flex">
      <div className="lg:w-1/5">
        <Sidebar/>

        </div>

      <div className="lg:w-4/5 py-36 px-4 sm:px-6 lg:px-8">
        <h1 className="my-5 text-3xl font-bold text-gray-600">All Products</h1>

        <div className="flex md:justify-end">
          <div className="border border-gray-400 rounded-md py-1 flex px-3 mb-10 mt-3">
            <input
              type="text"
              name="search"
              className="w-full bg-transparent outline-none"
              placeholder="Search for products..."
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
                <table className="min-w-full border divide-y divide-gray-200">
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
                        className="h-16 w-16 object-cover rounded-md bg-gray-200"
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
                    ₦{product.price}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                      {product.stock}
                    </td>
                    <td className="py-4 px-6 text-sm flex justify-between gap-5  ">
                      <Link
                        to={`/product/${product._id}`}
                        className="text-gray-600 hover:text-green-600 font-bold hover:underline mr-4"
                      >
                        View
                      </Link>
                      <Link
                        to={`/admin/product/${product._id}`}
                        className="bg-blue-600 p-1 text-white hover:bg-blue-700 rounded"
                      >
                        <PencilIcon/>
                      </Link>
                      <button 
                        className="bg-red-600 p-1 text-white hover:bg-red-700 rounded" 
                        onClick={() => deleteProductHandler(product._id)}
                        > 
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
  </div>
</Fragment>
);
};

export default ProductList;