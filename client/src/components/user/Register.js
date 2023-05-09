import React, { Fragment, useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layouts/MetaData";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import Person from "@mui/icons-material/Person";
import Mail from "@mui/icons-material/Mail";
import VisibilityOff from "@mui/icons-material/Visibility";

// import Person from '@mui/icons-material'
import { register, clearErrors } from "../../actions/userActions";
const Register = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { firstName, lastName, email, password } = user;

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  const navigate = useNavigate();
  const alert = useAlert();

  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, isAuthenticated, error]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("firstName", firstName);
    formData.set("lastName", lastName);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("avatar", avatar);
    dispatch(register(formData));
  };

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  return (
    <React.Fragment>
      <MetaData title={"Register User"} />
      <div className="py-36">
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
                <div className="border-2 border-gray-300 w-full hover:border-green-600 py-2 px-3 rounded-md flex justify-between">
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

                <div className="border-2 border-gray-300 w-full hover:border-green-600 py-2 px-3 rounded-md flex justify-between">
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

                <div className="border-2 border-gray-300 w-full hover:border-green-600 py-2 px-3 rounded-md flex justify-between">
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

                <div className="border-2 border-gray-300 w-full hover:border-green-600 py-2 px-3 rounded-md flex justify-between">
                  <input
                    type="password"
                    id="password_field"
                    className="form-control outline-none bg-transparent w-full"
                    name="password"
                    placeholder="Use a strong password"
                    value={password}
                    onChange={onChange}
                  />
                  <VisibilityOff className="text-gray-400" />
                </div>

                <div className="htmlForm-group flex flex-col space-y-4">
                  <div className="d-flex align-items-center flex gap-4">
                    <div>
                      <Avatar alt="Avatar Preview" src={avatarPreview} />
                    </div>
                    <div className="relative border-2 hover:border-green-600 border-gray-300 rounded-md py-2 w-full bg-white">
                      <input
                        type="file"
                        name="avatar"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer w-full"
                        id="customFile"
                        accept="images/*"
                        onChange={onChange}
                      />
                      <div className="flex  justify-between px-3 gap-2">
                        <span className="text-gray-500">Choose Image</span>
                        <ImageIcon className="text-gray-600" />
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  id="register_button"
                  type="submit"
                  className="bg-green-600 text-white rounded-md font-bold hover:bg-gray-500 py-3"
                  disabled={loading ? true : false}
                >
                  REGISTER
                </button>
                <Link to="/login" class="float-right mt-3 underline text-primary-color text-center">
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
