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
                {user && user.avatar && (
                  <img
                    className="rounded-full h-60 w-60 border-4 border-zinc-300"
                    src={user.avatar.url}
                    alt="user"
                  />
                )}

                <Link
                  to="/me/update"
                  id="edit_profile"
                  className="btn btn-primary btn-block my-5"
                >
                  <button className="bg-blue-900 w-full py-3 px-16  font-medium text-white rounded-md hover:bg-blue-800">
                    Edit Profile
                  </button>
                </Link>
              </div>

              <div className="flex flex-col space-y-4 flex-1">
                <h4 className="text-xl font-medium">First Name</h4>

                <p className="py-2 w-full px-3 bg-gray-300 font-bold rounded">{user.firstName}</p>

                <h4 className="text-xl font-medium">Last Name</h4>

                <p  className="py-2 w-full px-3 bg-gray-300 font-bold rounded">{user.lastName}</p>

                <h4 className="text-xl font-medium">Email Address</h4>
                <p  className="py-2 w-full px-3 bg-gray-300 font-bold rounded">{user.email}</p>

                <h4 className="text-xl font-medium">Joined On</h4>
                <p  className="py-2 w-full px-3 bg-gray-300 font-bold rounded">{String(user.createdAt).substring(0, 10)}</p>

                {user.role !== "admin" && (
                  <Link
                    to="/orders/me"
                    className=" btn-block mt-5"
                  >
                    <button>
                    My Orders
                    </button>
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
