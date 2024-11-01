import axios from "axios";
import {
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    CLEAR_ERRORS,
    LOAD_USER_REQUEST,
} from "../constants/userConstants"


// Login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST })

        const config = { headers: { "Content-Type": "application/json" } }

        const data = await axios.post(
            "/api/v1/login",
            { email, password },
            config
        )

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user,
        })

    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message })
    }
}

// Register
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_REQUEST })

        const config = { headers: { "Content-Type": "application/json" } }

        const data = await axios.post(
            "/api/v1/register",
            userData,
            config
        )

        dispatch({
            type: REGISTER_SUCCESS,
            payload: data.user,
        })

    } catch (error) {
        dispatch({ type: REGISTER_FAIL, payload: error.response.data.message })
    }
}

// Load User
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST })

        const data = await axios.get(
            "/api/v1/me"
        )

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user,
        })

    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message })
    }
}

//Clear Errors (set to null)
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}