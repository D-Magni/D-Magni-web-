import React, { Fragment, useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layouts/MetaData";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { resetPassword, clearErrors } from "../../actions/userActions";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const NewPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);

  const alert = useAlert();

  const dispatch = useDispatch();

  const { error, success } = useSelector((state) => state.forgotPassword);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Password updated successfully");
      navigate("/login");
    }
  }, [dispatch, alert, error, success, navigate]);

  const validateForm = () => {
    const errors = {};
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
    formData.set("password", password);
    formData.set("confirmPassword", confirmPassword);
    dispatch(resetPassword(token, formData));
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Fragment>
      <MetaData title={"New Password Reset"} />
      <div className="py-36">
        <div className="md:grid place-items-center">
          <div>
            <form className="md:shadow-lg p-10 md:w-96">
              <h1 className="mb-3 text-2xl  md:text-3xl text-center  font-bold text-zinc-600">
                New Password
              </h1>

              <div className="flex flex-col space-y-10 pt-10">
                <div>
                  <div className="border-2 border-gray-300 w-full hover:border-blue-900 py-2 px-3 rounded-md flex justify-between">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password_field"
                      className="form-control outline-none bg-transparent w-full"
                      value={password}
                      placeholder="Enter new password"
                      onChange={(e) => setPassword(e.target.value)}
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
                    )}
                  </div>
                  {errors.password && (
                    <span className="text-red-500 pt-3">{errors.password}</span>
                  )}
                </div>

                <div>
                  <div className="border-2 border-gray-300 w-full hover:border-blue-900 py-2 px-3 rounded-md flex justify-between">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="confirm_password_field"
                      placeholder="Confirm password"
                      className="form-control outline-none bg-transparent w-full"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
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
                    )}
                  </div>
                  {errors.password && (
                    <span className="text-red-500 pt-3">{errors.password}</span>
                  )}
                </div>

                <button
                  id="new_password_button"
                  type="submit"
                  className="bg-gray-900 text-white rounded-md font-bold hover:bg-gray-800 py-3 "
                  onClick={submitHandler}
                >
                  Set Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default NewPassword;
