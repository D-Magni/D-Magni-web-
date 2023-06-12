import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Mail from "@mui/icons-material/Mail";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { login, clearErrors } from "../../actions/userActions";
import CircularProgress from "@mui/material/CircularProgress";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const alert = useAlert();
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, isAuthenticated, error, navigate, redirect]);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert.error("Please enter your email and password.");
      return;
    }
    dispatch(login(email, password));
  };

  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="py-36 px-7 md:px-24">
          <MetaData title={"Login"} />

          <div className="md:grid place-items-center">
            <div>
              <div>
                <form
                  className="md:shadow-lg p-10 md:w-96"
                  onSubmit={submitHandler}
                >
                  <h1 className="mb-3 text-2xl  md:text-3xl text-center  font-bold text-zinc-600">
                    Welcome Back!
                  </h1>

                  <div className="flex flex-col space-y-10 pt-10">
                    <div className="border-2 border-gray-300 w-full hover:border-blue-900 py-2 px-3 rounded-md flex justify-between">
                      <input
                        type="email"
                        id="email_field"
                        className="form-control outline-none bg-transparent w-full"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <Mail className="text-gray-400" />
                    </div>

                    <div className="border-2 border-gray-300 w-full hover:border-blue-900 py-2 px-3 rounded-md flex justify-between">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password_field"
                        className="form-control outline-none bg-transparent w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                      />
                      {showPassword ? (
                        <Visibility
                          className="text-gray-400 cursor-pointer"
                          onClick={togglePasswordVisibility}
                        />
                      ) : (
                        <VisibilityOff
                          className="text-gray-400 cursor-pointer"
                          onClick={togglePasswordVisibility}
                        />
                      )}
                    </div>

                    <Link
                      to="/password/forgot"
                      className="float-right mb-4 text-blue-900 underline flex justify-end"
                    >
                      Forgot Password?
                    </Link>

                    <button
                      id="login_button"
                      type="submit"
                      className={`bg-gray-900 text-white rounded-md font-bold hover:bg-gray-800 py-3 ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={loading ? true : false}
                    >
                      {loading ? (
                        <div className="flex gap-5 place-items-center justify-center">
                          {" "}
                          <CircularProgress
                            size={24}
                            className="text-white"
                          />{" "}
                          <p>Please wait ...</p>{" "}
                        </div>
                      ) : (
                        "LOGIN"
                      )}
                    </button>

                    <Link
                      to="/register"
                      class="float-right mt-3 flex justify-between text-gray-600 text-center text-sm"
                    >
                      <p>New user?</p>{" "}
                      <div className="underline">Sign up here</div>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Login;
