import React, { Fragment, useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layouts/MetaData";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { updatePassword, clearErrors } from "../../actions/userActions";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const alert = useAlert();

  const dispatch = useDispatch();

  const { error, isUpdated, loading } = useSelector((state) => state.user);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Password updated successfully");

      navigate("/me");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, alert, error, isUpdated, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("oldPassword", oldPassword);
    formData.set("password", password);
    dispatch(updatePassword(formData));
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Fragment>
      <MetaData title={"Change Password"} />

      <div className="py-36">
        <div className="md:grid place-items-center">
          <div>
            <form className="md:shadow-lg p-10 md:w-96">
              <h1 className="mb-3 text-2xl  md:text-3xl text-center  font-bold text-zinc-600">
                Update Password
              </h1>

              <div className="flex flex-col space-y-10 pt-10">
                <div className="border-2 border-gray-300 w-full hover:border-blue-900 py-2 px-3 rounded-md flex justify-between">
                  <input
                    type="password"
                    id="old_password_field"
                    className="form-control outline-none bg-transparent w-full"
                    value={oldPassword}
                    placeholder="Enter your old password"
                    onChange={(e) => setOldPassword(e.target.value)}
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
                  )}{" "}
                </div>

                <div className="border-2 border-gray-300 w-full hover:border-blue-900 py-2 px-3 rounded-md flex justify-between">
                  <input
                    type="password"
                    id="new_password_field"
                    className="form-control outline-none bg-transparent w-full"
                    placeholder="Enter a new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                  )}{" "}
                </div>

                <button
                  type="submit"
                  className={`bg-gray-900 text-white rounded-md font-bold hover:bg-gray-800 py-3 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={submitHandler}
                  disabled={loading ? true : false}
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdatePassword;
