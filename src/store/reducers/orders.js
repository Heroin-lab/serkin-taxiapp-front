import {createSlice} from "@reduxjs/toolkit";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";


const initialState = {
    requestString: "",
    statusFilter: 2,
    driverFilter: 0,
    offsetFilter: 0,
    limitFilter: 7,
    allData: [],
}

export const ordersSlice = createSlice( {
    name: "orders",
    initialState,
    reducers: {
        reqStringConstructor: (state) => {
            if (state.statusFilter !== 0) {
                state.requestString += "status_id=" + state.statusFilter + "&"
            }
            if (state.driverFilter !== 0) {
                state.requestString += "driver_id=" + state.driverFilter + "&"
            }
            if (state.limitFilter !== 0) {
                state.requestString += "limit=" + state.limitFilter + "&"
            }
            if (state.offsetFilter !== 0) {
                let offsetPrepare = state.offsetFilter
                offsetPrepare *= state.limitFilter

                state.requestString += "offset=" + offsetPrepare + "&"
            }
        },
        changeAllData: (state, action) => {
            state.allData = action.payload
        },
    }
})

export const {reqStringConstructor, changeAllData} = ordersSlice.actions

export const getAllOrders = () => async (dispatch, getState) => {
    const history = useHistory()
    await dispatch(reqStringConstructor())
    let reqStr = getState()


    let response = await fetch("http://localhost:7777/api/orders?" + reqStr.ordersReducer.requestString, {
        mode: "cors",
        method: "GET",
        headers: {
            "Accept":"*/*",
            "Authorization": "Bearer " + localStorage.getItem("access_token")
        }
    })
    if (response.ok) {
        let jsonInfo = await response.json()
        dispatch(changeAllData(jsonInfo.data))
        return
    } else if (response.status === 401) {
        history.push("/sign-in")
        return
    }
}

export default ordersSlice.reducer