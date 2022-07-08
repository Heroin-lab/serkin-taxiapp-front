import {createSlice} from "@reduxjs/toolkit";
import {logOutUser} from "./auth";
import useWebSocket from "react-use-websocket";

const initialState = {
    orderInfo: [{
        id: "Loading...",
        first_name: "Loading...",
        second_name: "Loading...",
        vehicle_number: "Loading...",
        image: "https://cdn-icons-png.flaticon.com/512/219/219986.png",
        status: "Loading...",
        start_long: "Loading...",
        start_lat: "Loading...",
        end_long: "Loading...",
        end_lat: "Loading..."
    }],
    orderHistory: [{
        latitude: "Loading...",
        longitude: "Loading...",
        created_at: "Loading..."
    },{
        latitude: "Loading...",
        longitude: "Loading...",
        created_at: "Loading..."
    },{
        latitude: "Loading...",
        longitude: "Loading...",
        created_at: "Loading..."
    },{
        latitude: "Loading...",
        longitude: "Loading...",
        created_at: "Loading..."
    },{
        latitude: "Loading...",
        longitude: "Loading...",
        created_at: "Loading..."
    }],
    amountOfRows: 0,
    allMarkers: []
}

const singleOrderSlice = createSlice({
    name: "singleOrder",
    initialState,
    reducers: {
        setOrderInfo: (state, action) => {
            state.orderInfo = action.payload.data
        },
        setOrderHistory: (state, action) => {
            state.orderHistory = action.payload.data
            state.amountOfRows = action.payload.amount
        },
        setAllMarkers: (state, action) => {
            state.allMarkers = action.payload.data
        },
        setFILO: (state, action) => {
            if (state.orderHistory.length === 5) {
                state.orderHistory.splice(4, 1)
            }
            state.orderHistory.unshift(action.payload)
            state.amountOfRows++
            if (state.amountOfRows === 50) {
                state.orderInfo.status = "Done"
            }
            state.allMarkers.push(action.payload)
        }
    }
})

export const {setOrderInfo, setOrderHistory, setAllMarkers, setFILO} = singleOrderSlice.actions

export const GetOrderDataById = (id, history) => async (dispatch) => {
    let response = await fetch("http://localhost:7777/api/orders/" + id, {
        mode: "cors",
        method: "GET",
        headers: {
            "Accept":"*/*",
            "Authorization": "Bearer " + localStorage.getItem("access_token")
        }
    })

    if (response.ok) {
        let jsonData = await response.json()
        dispatch(setOrderInfo(jsonData))
        return
    } else if (response.status === 401) {
        history.push("/sign-in")
        dispatch(logOutUser())
        return
    }
}

export const GetOrderHistory = (id, offset, history) => async (dispatch) => {
    offset !== 0 ? offset *= 5 : false

    let response = await fetch(`http://localhost:7777/api/history/${id}?offset=${offset}`, {
        mode: "cors",
        method: "GET",
        headers: {
            "Accept":"*/*",
            "Authorization": "Bearer " + localStorage.getItem("access_token")
        }
    })

    if (response.ok) {
        let jsonData = await response.json()
        dispatch(setOrderHistory(jsonData))
        return
    } else if (response.status === 401) {
        history.push("/sign-in")
        dispatch(logOutUser())
        return
    }
}

export const GetAllHistoryMarkers = (id, history) => async (dispatch) => {
    let response = await fetch(`http://localhost:7777/api/history/${id}?limit=50`, {
        mode: "cors",
        method: "GET",
        headers: {
            "Accept":"*/*",
            "Authorization": "Bearer " + localStorage.getItem("access_token")
        }
    })

    if (response.ok) {
        let jsonData = await response.json()
        dispatch(setAllMarkers(jsonData))
        return
    } else if (response.status === 401) {
        history.push("/sign-in")
        dispatch(logOutUser())
        return
    }
}

export const GetRowsThroughWebSocket = (id, history) => async (dispatch) => {

}

export default singleOrderSlice.reducer