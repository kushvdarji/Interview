import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./Auth"
import productReducer from "./Product"

export const store=configureStore({
    reducer:{
        auth:authReducer,
        product:productReducer
    }
})