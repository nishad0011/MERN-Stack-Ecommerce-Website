import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';

import { createOrder, clearErrors } from '../../actions/orderAction';
import Loader from '../layout/Loader/Loader';

// After successful payment verification
const PaymentSuccess = () => {

    const params = useParams();
    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate()


    async function getPaymentDetails() {
        // console.log("getPaymentDetails start");
        var { data } = await axios.get(`/api/v1/payment/getPaymentById/${params.id}`)

        setSuccessful(() => data.success)
        setMyPayment(() => data.myPayment)

        // console.log("getPaymentDetails end");
    }
    function callCreateOrderApi() {
        // console.log("callCreateOrderApi start");

        const orderDetals = {
            shippingInfo,
            paymentInfo: {
                id: myPayment.id,
                status: successful ? "Successful" : "Not successful"
            },
            orderItems: cartItems,
            itemsPrice: orderInfo.subtotal,
            taxPrice: orderInfo.tax,
            shippingPrice: orderInfo.shippingCharges,
            totalPrice: orderInfo.totalPrice,
        }
        dispatch(createOrder(orderDetals))

        // console.log("callCreateOrderApi end");
    }
    async function getOrderDetails() {
        // console.log("getOrderdetils start");

        setOrderInfo(() => JSON.parse(localStorage.getItem("orderInfo")))
        setShippingInfo(() => JSON.parse(localStorage.getItem("shippingInfo")))
        setCartItems(() => JSON.parse(localStorage.getItem("cartItems")))

        // console.log("getOrderdetils end ");
        // console.log("orderInfo = ", orderInfo);
        // console.log("shippingInfo = ", shippingInfo);
        // console.log("cartItems = ", cartItems);


    }


    const [successful, setSuccessful] = useState(null)
    const [myPayment, setMyPayment] = useState(null)

    const [orderInfo, setOrderInfo] = useState(null);
    const [shippingInfo, setShippingInfo] = useState(null);
    const [cartItems, setCartItems] = useState(null);

    const { error, order, success } = useSelector((state) => state.newOrder)



    async function makeOrder() {
        await getPaymentDetails();

        await getOrderDetails();

    }

    useEffect(() => {
        console.log("in useEffect for callCreateOrderApi()");
        console.log("orderInfo = ", orderInfo);
        console.log("shippingInfo = ", shippingInfo);
        console.log("cartItems = ", cartItems);
        console.log("Successful = ", successful);
        console.log("myPayment = ", myPayment);


        if (Boolean(orderInfo) &&
            Boolean(shippingInfo) &&
            Boolean(cartItems) &&
            successful &&
            Boolean(myPayment)
        ) {
            console.log("calling callCreateOrderApi()");
            callCreateOrderApi()
        } else {
            console.log("not calling function");
        }
    }, [orderInfo, shippingInfo, cartItems])

    useEffect(() => {
        if (error) {
            alert.error(error.response.data.message)
            dispatch(clearErrors())
        }
    }, [error, dispatch, alert])

    //Only once
    useEffect(() => {
        makeOrder()
    }, [])


    useEffect(() => {
        if (success === true) {
            navigate("/process/payment/successmessage/",
                { state: { order } }
            );
        }
    }, [success, navigate]);

    return (
        <Loader />
    )
}

export default PaymentSuccess;