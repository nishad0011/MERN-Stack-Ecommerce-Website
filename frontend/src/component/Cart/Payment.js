import React from "react";
import { useSelector } from "react-redux";
import { useAlert } from "react-alert";
import axios from "axios";


const Payment = () => {

  var myStyle = { width: '100vw', height: '100vh' }

  const order = JSON.parse(sessionStorage.getItem("orderInfo"));
  const total = order.totalPrice * 100;

  const { user } = useSelector((state) => state.user);

  // console.log("total = ", total);

  const Handler = async () => {
    const { data } = await axios.post(`${window.location.origin}/api/v1/payment/process`, {
      totalPrice: total,
    });
    const { key } = await axios.get(`${window.location.origin}/api/razorkey`);
    var options = {
      key: key, // Enter the Key ID generated from the Dashboard
      amount: order.totalPrice * 100,
      currency: "INR",
      name: "E-commerce",
      description: "This is a Test Transaction",
      image:
        "https://img.freepik.com/free-photo/link-icon-front-side_187299-39505.jpg?t=st=1733727235~exp=1733730835~hmac=5d242a06c08dfd0cab60530d941f418b324b9f94a1d7075e10e9a510d1ff8b11&w=740",
      order_id: data.newOrder.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `${window.location.origin}/api/v1/payment/verify`,
      prefill: {
        name: user.name,
        email: user.email,
        contact: "9000090000",
      },
      notes: {
        address: "Eccommerce Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  window.addEventListener("load", Handler());
  return (
    <div className="razorpayDiv" style={myStyle}>
    </div>
  )
};

export default Payment;
