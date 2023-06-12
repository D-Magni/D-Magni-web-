import React, { Fragment, useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layouts/MetaData";
import { useNavigate, useParams } from "react-router-dom";
import {
  updateUser,
  getUserDetails,
  clearErrors,
} from "../../actions/userActions";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import Sidebar from "./Sidebar";
const UpdateUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const alert = useAlert();

  const dispatch = useDispatch();

  const { error, isUpdated } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.userDetails);

  const { id } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (user && user._id !== id) {
      dispatch(getUserDetails(id));
    } else {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setRole(user.role);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User updated successfully");
      navigate("/admin/users");

      dispatch({
        type: UPDATE_USER_RESET,
      });
    }
  }, [dispatch, alert, error, isUpdated, id, user, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("firstName", firstName);
    formData.set("lastName", lastName);
    formData.set("email", email);
    formData.set("role", role);
    dispatch(updateUser(user._id, formData));
  };

  return (
    <Fragment>
      <MetaData title={"Update User"} />
      <div className="lg:flex">
        <div className="lg:w-1/5">
          <Sidebar />
        </div>

        <div className="lg:w-4/5 py-36 px-4 sm:px-6 lg:px-8">
          <Fragment>
            <div className="md:grid place-items-center">
              <div className=" my-5">
                <form className="md:shadow-lg p-10 ">
                  <h1 className="mb-3 text-2xl  md:text-3xl text-center  font-bold text-zinc-600">
                    Update User
                  </h1>
                  <div className="flex flex-col space-y-5 pt-10">
                    <div className="border-2 border-gray-300 lg:w-96 sm:w-full w-64 hover:border-blue-900 py-2 px-3 rounded-md flex justify-between">
                      <input
                        type="text"
                        id="name_field"
                        className="form-control outline-none bg-transparent w-full"
                        name="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                      />
                    </div>
                    <div className="border-2 border-gray-300 lg:w-96 sm:w-full w-64 hover:border-blue-900 py-2 px-3 rounded-md flex justify-between">
                      <input
                        type="text"
                        id="name_field"
                        className="form-control outline-none bg-transparent w-full"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                      />
                    </div>

                    <div className="border-2 border-gray-300 lg:w-96 sm:w-full w-64 hover:border-blue-900 py-2 px-3 rounded-md flex justify-between">
                      <input
                        type="email"
                        id="email_field"
                        className="form-control outline-none bg-transparent w-full"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                      />
                    </div>

                    <div className="border-2 border-gray-300 lg:w-96 sm:w-full w-64 hover:border-blue-900 py-2 px-3 rounded-md flex justify-between">
                    
                      <select
                        id="role_field"
                        className="form-control outline-none bg-transparent w-full"
                        name="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      onClick={submitHandler}
                      className="bg-zinc-900 text-white rounded-md font-bold hover:bg-gray-500 py-3"
                    >
                      Update
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

export default UpdateUser;
