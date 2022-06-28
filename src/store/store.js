import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import dashReducer from "./reducers/dashboard"

const store = configureStore({
    reducer: {
        authReducer: authReducer,
        dashReducer: dashReducer,
    },
})

export default store;