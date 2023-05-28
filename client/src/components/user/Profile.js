import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.auth);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"My Profile"} />

          <div className="py-40  px-7 md:px-24">
            <h2 className="text-2xl md: text-3xl font-bold text-zinc-700">
              My Profile
            </h2>
            <div className=" flex flex-col md:flex-row justify-around space-y-16 md:space-y-0  py-20">
              <div className="flex flex-col space-y-20 place-items-center flex-1">
                  {user && user.avatar && user.avatar.url ? (
                    <img
                      className="rounded-full h-60 w-60 border-4 border-zinc-300"
                      src={user.avatar.url}
                      alt="user"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-60 w-60 rounded-full bg-gray-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-32 w-32 text-gray-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 12a4 4 0 100-8 4 4 0 000 8zm0 1c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4zm0-10a2 2 0 100 4 2 2 0 000-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}

                <Link
                  to="/me/update"
                  id="edit_profile"
                  className="btn btn-primary btn-block my-5"
                >
                  <button className="bg-gray-900 w-full py-3 px-16  font-medium text-white rounded-md hover:bg-gray-800">
                    Edit Profile
                  </button>
                </Link>
              </div>

              <div className="flex flex-col space-y-4 flex-1">
                <h4 className="text-xl font-medium">First Name</h4>

                <p className="py-2 w-full px-3 bg-gray-300 font-bold rounded">
                  {user && user.firstName}
                </p>

                <h4 className="text-xl font-medium">Last Name</h4>

                <p className="py-2 w-full px-3 bg-gray-300 font-bold rounded">
                  {user && user.lastName}
                </p>

                <h4 className="text-xl font-medium">Email Address</h4>
                <p className="py-2 w-full px-3 bg-gray-300 font-bold rounded">
                  {user && user.email}
                </p>

                <h4 className="text-xl font-medium">Joined On</h4>
                <p className="py-2 w-full px-3 bg-gray-300 font-bold rounded">
                  {String(user && user.createdAt).substring(0, 10)}
                </p>

                {user && user.role !== "admin" && (
                  <Link to="/orders/me" className=" btn-block mt-5">
                    <button>My Orders</button>
                  </Link>
                )}

                <Link
                  to="/password/update"
                  className="btn btn-primary btn-block mt-3"
                >
                  <button className="bg-zinc-700 px-16 py-3 mt-5 text-white rounded-md hover:bg-zinc-500">
                    Change Password
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
