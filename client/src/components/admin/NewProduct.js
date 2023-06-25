import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layouts/MetaData";
import { newProduct, clearErrors } from "../../actions/productActions";
import { useAlert } from "react-alert";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import Sidebar from "./Sidebar";
import ImageIcon from "@mui/icons-material/Image";
import Compressor from 'compressorjs';
import CircularProgress from "@mui/material/CircularProgress";

const NewProduct = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.newProduct);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      navigate("/admin/products");
      alert.success("Product created successfully");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, success, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("stock", stock);

    images.forEach((image) => {
      formData.append("images", image.data_uri);
    });

    dispatch(newProduct(formData));
  };


const onChange = async (e) => {
  const files = Array.from(e.target.files);
  setImagesPreview([]);
  setImages([]);

  for (const file of files) {
    try {
      new Compressor(file, {
        quality: 0.6, // Adjust the quality of the compressed image (0.1 to 1.0)
        maxWidth: 800, // Maximum width of the image
        maxHeight: 800, // Maximum height of the image
        success(result) {
          const reader = new FileReader();

          reader.onload = () => {
            if (reader.readyState === 2) {
              setImagesPreview((oldArray) => [...oldArray, reader.result]);
              setImages((oldArray) => [...oldArray, { data_uri: reader.result }]);
            }
          };

          reader.readAsDataURL(result);
        },
        error(error) {
          // Handle compression error
          console.error('Error compressing file:', error);
        },
      });
    } catch (error) {
      // Handle compression error
      console.error('Error compressing file:', error);
    }
  }
};


  return (
    <Fragment>
      <MetaData title={"New Products"} />
      <div className="flex">
        <div className="lg:w-1/5">
          <Sidebar />
        </div>

        <div className="lg:w-4/5 py-36 px-4 sm:px-6 lg:px-8">
          <Fragment>
            <div className="md:grid place-items-center">
              <div className="wrapper my-5">
                <form
                  className="md:shadow-lg p-10 "
                  encType="multipart/form-data"
                  onSubmit={submitHandler}
                >
                  <h1 className="mb-3 text-2xl  md:text-3xl text-center  font-bold text-zinc-600">
                    New Product
                  </h1>
                  <div className="flex flex-col space-y-5 pt-10">
                    <div className="border-2 border-gray-300 lg:w-96 sm:w-full w-64 hover:border-blue-900 py-2 px-3 rounded-md flex justify-between">
                      <input
                        type="text"
                        id="name_field"
                        className="form-control outline-none bg-transparent w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Product Name"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="price"
                        className="font-medium text-gray-700"
                      >
                        Price:
                      </label>
                      <div className="border-2 border-gray-300 lg:w-96 sm:w-full w-64 hover:border-blue-900 py-2 px-3 rounded-md flex justify-between">
                        <input
                          type="number"
                          id="price_field"
                          className="form-control outline-none bg-transparent w-full"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="border-2 border-gray-300 lg:w-96 sm:w-full w-64 hover:border-blue-900 py-2 px-3 rounded-md flex justify-between">
                      <textarea
                        className="form-control outline-none bg-transparent w-full"
                        id="description_field"
                        rows="8"
                        value={description}
                        placeholder="Enter product description..."
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>

                    <div>
                      <label
                        htmlFor="price"
                        className="font-medium text-gray-700"
                      >
                        Stock:
                      </label>
                      <div className="border-2 border-gray-300 lg:w-96 sm:w-full w-64 hover:border-blue-900 py-2 px-3 rounded-md flex justify-between">
                        <input
                          type="number"
                          id="stock_field"
                          className="form-control outline-none bg-transparent w-full"
                          value={stock}
                          onChange={(e) => setStock(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="hover:border-blue-700 border-gray-300 rounded-md w-full bg-white">
                      <label
                        htmlFor="customFile"
                        className="relative w-full h-full cursor-pointer"
                      >
                        <input
                          type="file"
                          multiple
                          name="avatar"
                          id="customFile"
                          accept="image/*"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={onChange}
                        />
                        <div className="flex justify-between px-3 gap-2 bg-gray-200 p-2">
                          <span className="text-gray-500">Choose Image</span>
                          <ImageIcon className="text-gray-600" />
                        </div>
                      </label>

                      {imagesPreview.length > 0 &&
                        imagesPreview.map((preview) => (
                          <img
                            className="mt-3 mr-2 w-[55px] h-[52px]"
                            src={preview}
                            key={preview}
                            alt="Preview"
                          />
                        ))}
                    </div>

                    <button
                      id="login_button"
                      type="submit"
                      className={`bg-zinc-900 text-white rounded-md font-bold hover:bg-gray-500 py-3 ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={loading ? true : false}
                    >
                {loading ? <div className="flex gap-5 place-items-center justify-center"> <CircularProgress size={24} className="text-white"/> <p>Creating product...</p> </div> : "CREATE"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
