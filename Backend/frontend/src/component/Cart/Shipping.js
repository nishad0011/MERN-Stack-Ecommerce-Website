import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { State, Country } from "country-state-city";
import { useAlert } from "react-alert";

import { GoHomeFill } from "react-icons/go";
import { FaPhone } from "react-icons/fa6";
import { RiMapPin2Fill } from "react-icons/ri";
import { FaFlag } from "react-icons/fa";
import { FaCity } from "react-icons/fa";

import { saveShippingInfo } from "../../actions/cartAction";
import CheckoutSteps from "./CheckoutSteps.js";
import Metadata from "../layout/Metadata";
import "./Shipping.css";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pincode, setPincode] = useState(shippingInfo.pincode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert.error("PhoneNo Number should be 10 digit");
      return;
    }

    dispatch(
      saveShippingInfo({ address, city, state, phoneNo, country, pincode })
    );

    navigate("/order/confirm");
  };

  return (
    <>
      <Metadata title={"Shipping Details"} />

      <div className="CheckotSteps">
        <CheckoutSteps activeSteps={0} />
      </div>

      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>

          <form
            className="shipForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div>
              <GoHomeFill />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <FaCity />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div>
              <RiMapPin2Fill />
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
            </div>
            <div>
              <FaPhone />
              <input
                type="number"
                placeholder="Phone No."
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </div>
            <div>
              <FaFlag />
              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div>
                <FaFlag />
                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;
