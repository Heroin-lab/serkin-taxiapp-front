import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import dashReducer from "./reducers/dashboard"
import ordersReducer from  "./reducers/orders"
import driversReducer from "./reducers/drivers"
import singleOrderReducer from "./reducers/single_order"


const store = configureStore({
    reducer: {
        authReducer: authReducer,
        dashReducer: dashReducer,
        ordersReducer: ordersReducer,
        driversReducer: driversReducer,
        singleOrderReducer: singleOrderReducer,
    },
})

export default store;