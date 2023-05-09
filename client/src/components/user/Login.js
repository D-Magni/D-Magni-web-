import React, { Fragment, useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Mail from "@mui/icons-material/Mail";
import VisibilityOff from "@mui/icons-material/Visibility";

import { login, clearErrors } from "../../actions/userActions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const alert = useAlert();

  const dispatch = useDispatch();

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
  }, [dispatch, alert, isAuthenticated, error]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="py-36">
          <MetaData title={"Login"} />

          <div className="md:grid place-items-center">
            <div>
              <div>
                <form className="md:shadow-lg p-10 w-96" onSubmit={submitHandler}>
                  <h1 className="mb-3 text-2xl  md:text-3xl text-center  font-bold text-zinc-600">
                    Welcome Back!
                  </h1>

                  <div className="flex flex-col space-y-10 pt-10">
                    <div className="border-2 border-gray-300 w-full hover:border-green-600 py-2 px-3 rounded-md flex justify-between">
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

                    <div className="border-2 border-gray-300 w-full hover:border-green-600 py-2 px-3 rounded-md flex justify-between">
                      <input
                        type="password"
                        id="password_field"
                        className="form-control outline-none bg-transparent w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                      />
                      <VisibilityOff className="text-gray-400" />
                    </div>

                    <Link to="/password/forgot" className="float-right mb-4 text-green-800 underline flex justify-end">
                      Forgot Password?
                    </Link>

                    <button
                      id="login_button"
                      type="submit"
                      className="bg-green-600 text-white rounded-md font-bold hover:bg-gray-500 py-3 w-full"
                    >
                      LOGIN
                    </button>

                    <Link to="/register" class="float-right mt-3 flex justify-between text-primary-color text-center text-sm">
                      <p>New user?</p> <div className="underline" >Sign up here</div>
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
