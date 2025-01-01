import { configureStore } from '@reduxjs/toolkit'
import { combineReducers, applyMiddleware } from 'redux'

import { thunk } from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension";

import { productReducer, productDetailsReducer, newReviewReducer, newProductReducer, deleteProductReducer } from './reducers/productReducer';
import { userReducer, profileReducer, forgotPasswordReducer, allUsersReducer, userDetailsReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';
import { newOrderReducer, myOrdersReducer, orderDetailsReducer, allOrdersReducer, orderReducer } from './reducers/orderReducer';
import { newPaymentReducer } from './reducers/paymentReducer';


const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    newProduct: newProductReducer,
    product: deleteProductReducer,

    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,

    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newReview: newReviewReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer
})

let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [],
        shippingInfo: localStorage.getItem("shippingInfo")
            ? JSON.parse(localStorage.getItem("shippingInfo"))
            : [],
    }
};

const middleware = [thunk];

// All reducers are added here.
const store = configureStore(
    { reducer },
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;