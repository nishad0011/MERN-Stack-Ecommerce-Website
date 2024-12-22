import { NEW_PAYMENT_REQUEST, NEW_PAYMENT_SUCCESS, NEW_PAYMENT_FAIL, CLEAR_ERRORS } from "../constants/paymentConstants";

export const newPaymentReducer = (state = {}, action) => {
    switch (action.type) {
        case NEW_PAYMENT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case NEW_PAYMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                newOrder: action.payload.newOrder,
            }
        case NEW_PAYMENT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}
