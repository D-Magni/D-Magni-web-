import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layouts/MetaData";
import { saveShippingInfo } from "../../actions/cartActions";
import { useNavigate } from "react-router-dom";
import { countries } from "countries-list";

import CheckoutSteps from "./CheckoutSteps";
const Shipping = () => {
  const countriesList = Object.values(countries);

  const { shippingInfo } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const [country, setCountry] = useState(shippingInfo.country || "Nigeria"); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveShippingInfo({ address, city, phoneNo, postalCode, country }));
    
    navigate("/order/confirm");
  };

  return (
    <Fragment>
      <MetaData title={"Shipping Info"} />

      <CheckoutSteps shipping />

      <div className="md:grid place-items-center pb-36">
        <div className="flex flex-col ">
          <form className="md:shadow-lg p-5 md:p-16 flex flex-col space-y-5">
            <h1 className="mb-4 text-2xl font-bold">Shipping Info</h1>
            <div className="htmlForm-group">
              <label htmlFor="address_field" className="font-bold">Address</label>
              <br/>
              <br/>
              <input
                type="text"
                id="address_field"
                className="border border-gray-200 outline-green-600 w-full py-2 px-3   focus:ring-sky-500"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="htmlForm-group">
              <label htmlFor="city_field" className="font-bold">City</label>
              <br/>
              <br/>
              <input
                type="text"
                id="city_field"
                className="border border-gray-200 outline-green-600 w-full py-2 px-3"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>

            <div className="htmlForm-group">
              <label htmlhtmlFor="phone_field" className="font-bold">Phone No</label>
              <br/>
              <br/>
              <input
                type="phone"
                id="phone_field"
                className="border border-gray-200 outline-green-600 w-full py-2 px-3"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                required
              />
            </div>
            <div className="htmlForm-group">
              <label htmlFor="postal_code_field" className="font-bold">Postal Code</label>
              <br/>
              <br/>
              <input
                type="number"
                id="postal_code_field"
                className="border border-gray-200 outline-green-600 w-full py-2 px-3"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </div>

            <div className="htmlForm-group">
              <label htmlFor="country_field" className="font-bold">Country</label>
              <br/>
              <br/>
              <select
                id="country_field"
                className="border bg-gray-200 outline-green-600 w-full py-2 px-3 pr-5"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                defaultValue="Nigeria"
              >
                {countriesList.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <br/>
      

            <button
              id="shipping_btn"
              type="submit"
              className="bg-green-600 hover:bg-gray-400 text-white w-full py-3"
              onClick={submitHandler}
            >
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
