import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import dashReducer from "./reducers/dashboard"
import ordersReducer from  "./reducers/orders"
import driversReducer from "./reducers/drivers"

const store = configureStore({
    reducer: {
        authReducer: authReducer,
        dashReducer: dashReducer,
        ordersReducer: ordersReducer,
        driversReducer: driversReducer,
    },
})

export default store;