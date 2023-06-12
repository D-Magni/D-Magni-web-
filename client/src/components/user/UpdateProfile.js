import React, { Fragment, useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layouts/MetaData";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import Compressor from "compressorjs";
import CircularProgress from "@mui/material/CircularProgress";
import ImageIcon from '@mui/icons-material/Image';
import {
  updateProfile,
  loadUser,
  clearErrors,
} from "../../actions/userActions";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";

const UpdateProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const [, setButtonDisabled] = useState(true);
  const [, setUploading] = useState(false);
  const navigate = useNavigate();
  const alert = useAlert();

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { error, isUpdated, loading } = useSelector((state) => state.user);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setAvatarPreview(user.avatar && user.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User updated successfully");
      dispatch(loadUser());

      navigate("/me");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, alert, error, isUpdated, navigate, user]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("firstName", firstName);
    formData.set("lastName", lastName);
    formData.set("email", email);
    formData.set("avatar", avatar);
    formData.set("avatarPreview", avatarPreview);
    dispatch(updateProfile(formData));
  };

  const onChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        new Compressor(e.target.files[0], {
          quality: 0.1,
          success: (compressedFile) => {
            const compressedReader = new FileReader();
            compressedReader.onload = () => {
              if (compressedReader.readyState === 2) {
                setAvatarPreview(compressedReader.result);
                setAvatar(compressedReader.result);
                setButtonDisabled(false);
                setUploading(false);
              }
            };
            compressedReader.readAsDataURL(compressedFile);
            setUploading(true);
            setButtonDisabled(true);
          },
          error: (err) => {
            console.log(err.message);
          },
        });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <Fragment>
      <MetaData title={"Update Profile"} />
      <div className="py-44  md:grid place-items-center px-7  ">
        <div>
          <div className="shadow-2xl p-10">
            <form encType="multipart/form-data">
              <h1 className="mt-2 mb-5 text-2xl font-medium text-3xl ">
                Update Profile
              </h1>

              <div>
                <label htmlFor="email_field" className="font-bold">
                  First Name
                </label>
                <br />
                <input
                  type="name"
                  id="firstName_field"
                  className="border w-full py-2 px-3 mt-2 rounded outline-none focus:outline-green-200"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <br />
              <div>
                <label htmlFor="email_field" className="font-bold">
                  Last Name
                </label>
                <input
                  type="name"
                  id="lastName_field"
                  className="border w-full py-2 px-3 mt-2 rounded outline-none focus:outline-green-200"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <br />
              <div>
                <label htmlFor="email_field" className="font-bold">
                  Email
                </label>
                <input
                  type="email"
                  id="email_field"
                  className="border w-full py-2 px-3 mt-2 rounded outline-none focus:outline-green-200"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <br />
              <div>
                <label htmlFor="avatar_upload" className="font-bold">
                  Avatar
                </label>
                <br />
                <br/>
                <div className="flex place-items-center gap-5">
                  <div>
                    <Avatar
                      src={avatarPreview}
                      className="rounded-full"
                      alt="Avatar Preview"
                    />
                  </div>
                  <div className="relative border rounded-md py-2 w-full bg-white">
                    <input
                      type="file"
                      name="avatar"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      id="customFile"
                      accept="image/*"
                      onChange={onChange}
                    />
                    <div className="flex  justify-between px-3 gap-2">
                  
                      <span>Choose Avatar</span>
                      <ImageIcon className="text-gray-600"/>
                    </div>
                  </div>
                </div>
              </div>
              <br />

              <button
                id="update_button"
                type="submit"
                className={`bg-gray-900 text-white rounded-md font-bold hover:bg-gray-800 py-3 w-full ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading ? true : false}
                onClick={submitHandler}
              >
                {loading ? <div className="flex gap-5 place-items-center justify-center"> <CircularProgress size={24} className="text-white"/> <p>Updating ...</p> </div> : "UPDATE PROFILE"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProfile;
