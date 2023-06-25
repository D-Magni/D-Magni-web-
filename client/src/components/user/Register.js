import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layouts/MetaData";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {register, clearErrors } from "../../actions/userActions";
import { Avatar } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import Person from "@mui/icons-material/Person";
import Mail from "@mui/icons-material/Mail";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CircularProgress from "@mui/material/CircularProgress";
import Compressor from 'compressorjs';

const Register = () => {

  const navigate = useNavigate();
  const alert = useAlert();

  const dispatch = useDispatch();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { firstName, lastName, email, password } = user;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";


useEffect(() => {
  if (isAuthenticated) {
    navigate(redirect);
  }

  if (error) {
    alert.error(error);
    dispatch(clearErrors());
  }
}, [dispatch, alert, isAuthenticated, error, navigate, redirect]);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");


  const validateForm = () => {
    const errors = {};

    if (!firstName.trim()) {
      errors.firstName = "First name is required";
    }

    if (!lastName.trim()) {
      errors.lastName = "Last name is required";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!email.includes("@")) {
      errors.email = "Invalid email format";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      const formData = new FormData();
      formData.set("firstName", firstName);
      formData.set("lastName", lastName);
      formData.set("email", email);
      formData.set("password", password);
      if (avatar) {
        formData.set("avatar", avatar);
      }
      dispatch(register(formData));
    }
  };

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      if (e.target.files.length > 0) {
        reader.onload = () => {
          if (reader.readyState === 2) {
            new Compressor(e.target.files[0], {
              quality: 0.1,
              success: (compressedFile) => {
                const compressedReader = new FileReader();
                compressedReader.onload = () => {
                  if (compressedReader.readyState === 2) {
                    setAvatarPreview(compressedReader.result);
                    setAvatar(compressedReader.result);
                    
                  }
                };
                compressedReader.readAsDataURL(compressedFile);
              },
              error: (err) => {
                console.log(err.message);
              },
            });
          }
        };
        reader.readAsDataURL(e.target.files[0]);
      } else {
        setAvatarPreview("");
        setAvatar("");
      }
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <React.Fragment>
      <MetaData title={"Register User"} />
      <div className="py-36 px-4 md:px-24">
        <div className="md:grid place-items-center">
          <div>
            <form
              className="md:shadow-lg p-10"
              encType="multipart/form-data"
              onSubmit={submitHandler}
            >
              <h1 className="mb-3 text-2xl  md:text-3xl text-center  font-bold text-zinc-600">
                Create a New Account
              </h1>
              <div className="flex flex-col space-y-10 pt-10">
                <div>
                  <div className="border-2 border-gray-300 w-full hover:border-blue-900 py-2 px-3 rounded-md flex justify-between">
                    <input
                      type="name"
                      id="firstName"
                      className="form-control outline-none bg-transparent w-full"
                      name="firstName"
                      placeholder="Enter your first name"
                      value={firstName}
                      onChange={onChange}
                    />
                    <Person className="text-gray-400" />
                  </div>
                  {errors.firstName && (
                    <span className="text-red-500 pt-3">
                      {errors.firstName}
                    </span>
                  )}
                </div>

                <div>
                  <div className="border-2 border-gray-300 w-full hover:border-blue-900 py-2 px-3 rounded-md flex justify-between">
                    <input
                      type="name"
                      id="lastName"
                      className="form-control outline-none bg-transparent w-full"
                      name="lastName"
                      placeholder="Enter your last name"
                      value={lastName}
                      onChange={onChange}
                    />
                    <Person className="text-gray-400" />
                  </div>
                  {errors.lastName && (
                    <span className="text-red-500 pt-3">{errors.lastName}</span>
                  )}
                </div>

                <div>
                  <div className="border-2 border-gray-300 w-full hover:border-blue-900 py-2 px-3 rounded-md flex justify-between">
                    <input
                      type="email"
                      id="email_field"
                      className="form-control outline-none bg-transparent w-full"
                      name="email"
                      placeholder="Enter a valid email address"
                      value={email}
                      onChange={onChange}
                    />
                    <Mail className="text-gray-400" />
                  </div>
                  {errors.email && (
                    <span className="text-red-500 pt-3">{errors.email}</span>
                  )}
                </div>

                <div>
                  <div className="border-2 border-gray-300 w-full hover:border-blue-900 py-2 px-3 rounded-md flex justify-between">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password_field"
                      className="form-control outline-none bg-transparent w-full"
                      name="password"
                      placeholder="Use a strong password"
                      value={password}
                      onChange={onChange}
                    />
                    {showPassword ? (
                      <Visibility
                        className="text-gray-400 cursor-pointer"
                        onClick={togglePasswordVisibility}
                      />
                    ) : (
                      <VisibilityOff
                        className="text-gray-600 cursor-pointer"
                        onClick={togglePasswordVisibility}
                      />
                    )}{" "}
                  </div>
                  {errors.password && (
                    <span className="text-red-500 pt-3">{errors.password}</span>
                  )}
                </div>

                <div className="htmlForm-group flex flex-col space-y-4">
                  <div className="d-flex align-items-center flex gap-4">
                    <div>
                      <Avatar alt="Avatar Preview" src={avatarPreview} />
                    </div>
                    <div className="relative border-2 hover:border-blue-700 border-gray-300 rounded-md py-2 w-full bg-white">
                      <input
                        type="file"
                        name="avatar"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer w-full"
                        id="customFile"
                        accept="image/*"
                        onChange={onChange}
                      />
                      <div className="flex  justify-between px-3 gap-2">
                        <span className="text-gray-500 text-sm">
                          Choose Image <b className="text-sm">(opt)</b>
                        </span>
                        <ImageIcon className="text-gray-600" />
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  id="register_button"
                  type="submit"
                  className={`bg-gray-900 text-white rounded-md font-bold hover:bg-gray-800 py-3 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading ? true : false}
                >
                  {loading ? (
                    <div className="flex gap-5 place-items-center justify-center">
                      {" "}
                      <CircularProgress size={24} className="text-white" />{" "}
                      <p>Creating a new account...</p>{" "}
                    </div>
                  ) : (
                    "REGISTER"
                  )}
                </button>
                <Link
                  to="/login"
                  class="float-right mt-3 underline text-gray-700 text-center"
                >
                  Login Here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Register;
