import {createSlice} from "@reduxjs/toolkit";
import {useHistory} from "react-router-dom";
import {logOutUser} from "./auth";


const initialState = {
    requestString: "",
    amountOfOrders: 0,
    statusFilter: 2,
    driverFilter: 0,
    offsetFilter: 0,
    limitFilter: 9,
    allDrivers: [],
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
            state.allData = action.payload.data
            state.amountOfOrders = action.payload.Amount
        },
        changeAllDrivers: (state, action) => {
            state.allDrivers = action.payload.data
        },
        changeStatus: (state, action) => {
            state.statusFilter = action.payload
        },
        changeLimit: (state, action) => {
            state.limitFilter = action.payload
        },
        changeOffset: (state, action) => {
            state.offsetFilter = action.payload
        },
        changeDriverFilter: (state, action) => {
            state.driverFilter = action.payload
        },
        clearAllData: (state) => {
            state.allData = []
        },
        clearRequestStr: (state) => {
            state.requestString = ""
        }
    }
})

export const {reqStringConstructor, changeAllData, changeStatus, clearAllData, clearRequestStr, changeLimit, changeOffset, changeAllDrivers, changeDriverFilter} = ordersSlice.actions

export const GetAllOrders = () => async (dispatch, getState) => {
    dispatch(clearRequestStr())
    dispatch(reqStringConstructor())
    const history = useHistory()
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
        dispatch(clearRequestStr())
        dispatch(changeAllData(jsonInfo))
        return
    } else if (response.status === 401) {
        history.push("/sign-in")
        dispatch(clearRequestStr())
        dispatch(logOutUser())
        return
    }
}

export const GetDriversNames = () => async (dispatch) => {
    let response = await fetch("http://localhost:7777/api/cab-man", {
        mode: "cors",
        method: "GET",
        headers: {
            "Accept":"*/*",
            "Authorization": "Bearer " + localStorage.getItem("access_token")
        }
    })
    if (response.ok) {
        let jsonData = await response.json()
        dispatch(changeAllDrivers(jsonData))
        return
    } else if (response.status === 401) {
        history.push("/sign-in")
        dispatch(clearRequestStr())
        return
    }
}

// export const SelectAllDriverNames = () => async (getState) => {
//     return await getState().ordersReducer.allDrivers
// }

export const ChangeStatus = (id) => async (dispatch) => {
    dispatch(changeStatus(id))
    dispatch(changeOffset(0))
    dispatch(clearAllData())
    return
}

export const ChangeLimit = (num) => async (dispatch) => {
    dispatch(changeLimit(num))
    dispatch(changeOffset(0))
    dispatch(clearAllData())
    return
}

export const ChangeOffset = (num) => async (dispatch) => {
    dispatch(changeOffset(num))
    dispatch(clearAllData())
    return
}

export const ChangeDriverFilter = (num) => async (dispatch) => {
    dispatch(changeDriverFilter(num))
    dispatch(clearAllData())
    return
}

export default ordersSlice.reducer