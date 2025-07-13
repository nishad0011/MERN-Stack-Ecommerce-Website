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

    const keydata = await axios.get(`${window.location.origin}/api/getrazorkey`);
    const key = keydata.data.key;
    console.log("key = ", key);
    console.log("total = ", total);

    var options = {
      key: key, // Enter the Key ID generated from the Dashboard
      amount: total,
      currency: "INR",
      name: "E-commerce",
      description: "This is a Test Transaction",
      image:
        "https://res.cloudinary.com/dunyzhjku/image/upload/v1752299186/ecom_logo_cleaned_gtpycf.png",
      order_id: data.newOrder.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `${window.location.origin}/api/v1/payment/verify`,
      prefill: {
        name: user.name,
        email: user.email,
        contact: "9000090000",
      },
      notes: {
        address: "Ecommerce Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();

  };

  window.addEventListener("load", Handler());
  return (<>
    <div className="razorpayDiv" style={myStyle}>
    </div>
  </>

  )
};

export default Payment;
