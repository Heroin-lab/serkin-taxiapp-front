import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import dashReducer from "./reducers/dashboard"
import ordersReducer from  "./reducers/orders"

const store = configureStore({
    reducer: {
        authReducer: authReducer,
        dashReducer: dashReducer,
        ordersReducer: ordersReducer,
    },
})

export default store;