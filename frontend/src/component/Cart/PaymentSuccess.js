import React, { useEffect } from 'react'
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
        var { data } = await axios.get(`/api/v1/payment/getPaymentById/${params.id}`)
        paymentDetails = data;
        successful = paymentDetails.success
        myPayment = paymentDetails.myPayment
    }
    async function callCreateOrderApi() {
        const order = {
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
        dispatch(createOrder(order))
    }

    var paymentDetails = null;
    var successful = null
    var myPayment = null

    const { error, order, success } = useSelector((state) => state.newOrder)

    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))
    const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo"))
    const cartItems = JSON.parse(localStorage.getItem("cartItems"))

    async function makeOrder() {
        await getPaymentDetails();
        await callCreateOrderApi()
    }

    useEffect(() => {
        if (error) {
            alert.error(error.response.data.message)
            dispatch(clearErrors())
        }
    }, [error, dispatch, alert])

    //Only once
    useEffect(() => {
        if (!order) {
            makeOrder()
        }
    }, [order, makeOrder])

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

export default PaymentSuccess