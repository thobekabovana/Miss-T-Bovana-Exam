// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // User registration reducer
import authReducer from "./authSlice"; // Auth reducer for login
// import thunk from "redux-thunk";
import productReducer from "./AddproductSlice";
import productListReducer from '../features/ProductListSlice';
// import cartReducer from './CartSlice';

const store = configureStore({
    reducer: {
        user: userReducer,    // For user registration
        auth: authReducer,     // For authentication
        product: productReducer,
        products: productListReducer,
        // cart: cartReducer,
    },
    // middleware: [thunk],
});

export default store;



