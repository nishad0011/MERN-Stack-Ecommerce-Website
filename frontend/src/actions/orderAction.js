import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    CLEAR_ERRORS,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    UPDATE_ORDERS_REQUEST,
    UPDATE_ORDERS_SUCCESS,
    UPDATE_ORDERS_RESET,
    UPDATE_ORDERS_FAIL,
    DELETE_ORDERS_REQUEST,
    DELETE_ORDERS_SUCCESS,
    DELETE_ORDERS_RESET,
    DELETE_ORDERS_FAIL,
} from "../constants/orderConstants";
import axios from "axios";

export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        const { data } = await axios.post(`/api/v1/order/new`, order, config);

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const getMyOrders = () => async (dispatch) => {
    try {
        dispatch({ type: MY_ORDERS_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        const { data } = await axios.get(`/api/v1/orders/myorders`);

        // console.log("data = ", data);

        dispatch({
            type: MY_ORDERS_SUCCESS,
            success: data.success,
            payload: data.orders,
        })

    } catch (error) {
        dispatch({
            type: MY_ORDERS_FAIL,
            payload: error.response.data.message,
        })
    }
}

// Get all orders (ADMIN)
export const getAllOrders = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_ORDERS_REQUEST });

        const { data } = await axios.get(`/api/v1/admin/orders`);
        dispatch({
            type: ALL_ORDERS_SUCCESS,
            success: data.success,
            totalAmount: data.totalAmount,
            payload: data.orders,
        })

    } catch (error) {
        dispatch({
            type: ALL_ORDERS_FAIL,
            payload: error.response.data.message,
        })
    }
}

// Update order (ADMIN)
export const updateOrder = (id, orderDetails) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_ORDERS_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }

        const { data } = await axios.put(`/api/v1/admin/order/${id}`, orderDetails, config);
        dispatch({
            type: UPDATE_ORDERS_SUCCESS,
            success: data.success,
            payload: data.order,
        })

    } catch (error) {
        dispatch({
            type: UPDATE_ORDERS_FAIL,
            payload: error.response.data.message,
        })
    }
}

// Delete order (ADMIN)
export const deleteOrder = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_ORDERS_REQUEST });

        const { data } = await axios.delete(`/api/v1/admin/order/${id}`);
        dispatch({
            type: DELETE_ORDERS_SUCCESS,
            success: data.success,
            message: data.message,
        })

    } catch (error) {
        dispatch({
            type: DELETE_ORDERS_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        const { data } = await axios.get(`/api/v1/order/${id}`);

        // console.log("data = ", data);

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            success: data.success,
            payload: data.order,
        })

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}

