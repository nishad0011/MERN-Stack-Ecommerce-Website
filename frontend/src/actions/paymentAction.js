// import axios from "axios";

// import { NEW_PAYMENT_REQUEST, NEW_PAYMENT_FAIL, NEW_PAYMENT_SUCCESS, CLEAR_ERRORS } from "../constants/paymentConstants";

// export const newPayment = (totalPrice) => async (dispatch) => {

//     try {
//         dispatch({ type: NEW_PAYMENT_REQUEST });

//         console.log("totalPrice = ", totalPrice)
//         console.log("totalPrice type ", typeof (totalPrice))
//         const { data } = await axios.post("/api/v1/payment/process", { totalPrice });

//         // console.log("data = ", data);

//         dispatch({
//             type: NEW_PAYMENT_SUCCESS,
//             payload: data,
//         })

//     } catch (error) {
//         dispatch({
//             type: NEW_PAYMENT_FAIL,
//             payload: error.response.data.message,
//         })
//     }
// };

// export const clearErrors = () => async (dispatch) => {
//     dispatch({ type: CLEAR_ERRORS })
// }
