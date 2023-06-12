import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../layouts/MetaData";

// import { sendMessage, clearErrors } from "../../actions/contactActions";

const Contact = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");



//   const { error, success, loading } = useSelector((state) => state.contact);
  
  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("message", message);

    // dispatch(sendMessage(formData));
  };

  return (
    <Fragment>
      <MetaData title={"Contact Us"} />

      <div className="py-36">
        <div className="md:grid place-items-center">
          <div>
            <form className="md:shadow-lg p-10 md:w-96">
              <h1 className="mb-3 text-2xl md:text-3xl text-center font-bold text-zinc-600">
                Contact Us
              </h1>

              <div className="flex flex-col space-y-10 pt-10">
                <div className="border-2 border-gray-300 w-full hover:border-blue-900 py-2 px-3 rounded-md">
                  <input
                    type="text"
                    id="name_field"
                    className="form-control outline-none bg-transparent w-full"
                    value={name}
                    placeholder="Enter your name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="border-2 border-gray-300 w-full hover:border-blue-900 py-2 px-3 rounded-md">
                  <input
                    type="email"
                    id="email_field"
                    className="form-control outline-none bg-transparent w-full"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="border-2 border-gray-300 w-full hover:border-blue-900 py-2 px-3 rounded-md">
                  <textarea
                    id="message_field"
                    className="form-control outline-none bg-transparent w-full"
                    placeholder="Enter your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-gray-900 text-white rounded-md font-bold hover:bg-gray-800 py-3"
                  onClick={submitHandler}
                //   disabled={loading ? true : false}
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Contact;
