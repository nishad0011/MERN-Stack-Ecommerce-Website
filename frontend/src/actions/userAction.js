import axios from "axios";
import {
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_SUCCESS,
    UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_FAIL, FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL, RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    ALL_USER_REQUEST, ALL_USER_SUCCESS, ALL_USER_FAIL,
    UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL,
    DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAIL,
    USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL,
    CLEAR_ERRORS,
} from "../constants/userConstants"


// Login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST })

        const config = { headers: { "Content-Type": "application/json" } }

        const { data } = await axios.post(
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

        const { data } = await axios.post(
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

        const { data } = await axios.get(
            "/api/v1/me"
        )

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user,
        })

    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message })
    }
}

// Load all Users (ADMIN)
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_USER_REQUEST })

        const { data } = await axios.get(
            "/api/v1/admin/users"
        )

        dispatch({
            type: ALL_USER_SUCCESS,
            payload: data.users,
        })

    } catch (error) {
        dispatch({ type: ALL_USER_FAIL, payload: error.response.data.message })
    }
}

// Single User Details (ADMIN)
export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST })

        const { data } = await axios.get(
            `/api/v1/admin/users/${id}`
        )

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data.user,
        })

    } catch (error) {
        dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message })
    }
}

// Update User (ADMIN)
export const updateUser = (id, userDetails) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } }

        const { data } = await axios.put(
            `/api/v1/admin/users/${id}`,
            userDetails,
            config
        )

        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data.success,
        })
    } catch (error) {
        dispatch({ type: UPDATE_USER_FAIL, payload: error.response.data.message })
    }
}

// Delete User (ADMIN)
export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_USER_REQUEST });

        const { data } = await axios.delete(
            `/api/v1/admin/users/${id}`
        )

        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({ type: DELETE_USER_FAIL, payload: error.response.data.message })
    }
}

// Logout User
export const logoutUser = () => async (dispatch) => {
    try {
        await axios.get(
            "/api/v1/logout"
        )

        dispatch({
            type: LOGOUT_SUCCESS,
        })

    } catch (error) {
        dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message })
    }
}

// Update
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST })

        const config = { headers: { "Content-Type": "application/json" } }

        const { data } = await axios.put(
            "/api/v1/me/update",
            userData,
            config
        )

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success,
        })

    } catch (error) {
        dispatch({ type: UPDATE_PROFILE_FAIL, payload: error.response.data.message })
    }
}

// Update Password
export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } }

        const { data } = await axios.put(
            "/api/v1/password/update",
            passwords,
            config
        )

        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.success,
        })
    } catch (error) {
        dispatch({ type: UPDATE_PASSWORD_FAIL, payload: error.response.data.message })
    }
}

// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST })

        const config = { headers: { "Content-Type": "application/json" } }

        const { data } = await axios.post(
            "/api/v1/password/forgot",
            email,
            config
        )

        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.message,
        })

    } catch (error) {
        dispatch({ type: FORGOT_PASSWORD_FAIL, payload: error.response.data.message })
    }
}

// Reset Password
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST })

        const config = { headers: { "Content-Type": "application/json" } }

        const { data } = await axios.put(
            `/api/v1/password/reset/${token}`,
            passwords,
            config
        )

        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: data.success,
        })

    } catch (error) {
        dispatch({ type: RESET_PASSWORD_FAIL, payload: error.response.data.message })
    }
}


//Clear Errors (set to null)
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}