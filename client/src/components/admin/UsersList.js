import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";
import { allUsers, deleteUser, clearErrors } from "../../actions/userActions";
import { useAlert } from "react-alert";
import DeleteForever from "@mui/icons-material/DeleteForever";
import SearchIcon from "@mui/icons-material/Search";
import PencilIcon from "@mui/icons-material/Edit";
import Sidebar from "./Sidebar";
import { DELETE_USER_RESET } from "../../constants/userConstants";

const UsersList = () => {

  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, users } = useSelector((state) => state.allUsers);
  const [, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);

  const { isDeleted } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    dispatch(allUsers());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }


      if (isDeleted) {
        alert.success('User deleted successfully')
        dispatch({ type: DELETE_USER_RESET })
      }
  }, [dispatch, alert, error, isDeleted]);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const handleSearch = (event) => {
    const keyword = event.target.value.toLowerCase();
    const filtered = users.filter((user) => {
      const userId = user._id ? user._id.toLowerCase() : "";
      const userFirstName = user.firstName ? user.firstName.toLowerCase() : "";
      const userLastName = user.lastName ? user.lastName.toLowerCase() : "";
      const name = `${userFirstName} ${userLastName}`.toLowerCase(); 
  
      return userId.includes(keyword) || name.includes(keyword);
    });
    setFilteredUsers(filtered);
    setSearchTerm(keyword);
  };
  

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id))
    setFilteredUsers(filteredUsers.filter(user => user._id !== id));
  
  }
  return (
    <Fragment>
    <MetaData title={"All Users"} />
    <div className="lg:flex">
      <div className="lg:w-1/5">
        <Sidebar />
      </div>

      <div className="lg:w-4/5 py-36 px-4 sm:px-6 lg:px-8">
        <h1 className="my-5 text-3xl font-bold text-gray-600">All Users</h1>

        <div className="flex md:justify-end">
          <div className="border border-gray-400 rounded-md py-1 flex px-3 mb-10 mt-3">
            <input
              type="text"
              name="search"
              className="w-full bg-transparent outline-none"
              placeholder="Search for users.."
              onChange={handleSearch}
            />
            <SearchIcon className="text-gray-400" />
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="overflow-x-scroll">
            <table className="min-w-full border divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User ID
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              {filteredUsers &&
                filteredUsers.map((user, index) => (
                  <tbody className="bg-white divide-y divide-gray-200" key={user._id}>
                    <tr key={index}>
                      <td className="py-4 px-6 text-sm text-gray-500">
                        {user._id}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500">
                        {user.firstName} {user.lastName}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500">
                        {user.email}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500">
                        {user.role}
                      </td>
                      <td className="py-4 px-6 text-sm flex justify-between gap-5">
                
                        <Link
                          to={`/admin/user/${user._id}`}
                          className="bg-blue-600 p-1 text-white hover:bg-blue-700 rounded"
                        >
                          <PencilIcon />
                        </Link>
                        <button
                          className="bg-red-600 p-1 text-white hover:bg-red-700 rounded"
                            onClick={() => deleteUserHandler(user._id)}
                        >
                          <DeleteForever />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                ))}
            </table>
          </div>
        )}
      </div>
    </div>
  </Fragment>  )
}

export default UsersList