import {combineReducers} from "redux";
import authReducer from "./auth"
import dashReducer from  "./dashboard"

const allReducers = combineReducers({
    auth: authReducer,
    dash: dashReducer,
})

export default allReducers;