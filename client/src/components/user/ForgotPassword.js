import React, { Fragment, useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layouts/MetaData";

import { forgotPassword, clearErrors } from "../../actions/userActions";
import CircularProgress from "@mui/material/CircularProgress";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const alert = useAlert();

  const dispatch = useDispatch();

  const { error, loading, message } = useSelector(
    (state) => state.forgotPassword
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      alert.success(message);
    }
  }, [dispatch, alert, error, message]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("email", email);

    try {
      await dispatch(forgotPassword(formData));
      if (message) {
        alert.success(message);
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      alert.error(error.message);
    }
  };
  return (
    <Fragment>
      <MetaData title={"Forgot Password"} />
      <div className="py-36">
        <div className="md:grid place-items-center">
          <div>
            <div>
              <form className="md:shadow-lg p-10 md:w-96">
                <h1 className="mb-3 text-2xl  md:text-3xl text-center  font-bold text-zinc-600">
                  Forgot Password
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
                  </div>

                  <button
                    id="forgot_password_button"
                    type="submit"
                    className={`bg-gray-900 text-white rounded-md font-bold hover:bg-gray-800 py-3  ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={submitHandler}
                    disabled={loading ? true : false}
                  >
                {loading ? <div className="flex gap-5 place-items-center justify-center"> <CircularProgress size={24} /> <p>Sending ...</p> </div> : "SEND MAIL"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
