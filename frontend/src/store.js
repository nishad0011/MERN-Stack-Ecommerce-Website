import { configureStore } from '@reduxjs/toolkit'
import { combineReducers, applyMiddleware } from 'redux'

import { thunk } from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension";

import { productReducer, productDetailsReducer } from './reducers/productReducer';
import { userReducer } from './reducers/userReducer';

const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
})
let initialState = {};
const middleware = [thunk];

// All reducers are added here.
const store = configureStore(
    { reducer },
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;