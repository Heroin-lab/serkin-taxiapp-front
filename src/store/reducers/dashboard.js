import { createSlice } from '@reduxjs/toolkit'
import {useHistory} from "react-router-dom";
import {logOutUser} from "./auth";

const initialState = {
    created: 0,
    inProgress: 0,
    done: 0,
    total: 0,
}

export const dashSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        dashInfo: (state, action) => {
            state.created = action.payload.created
            state.inProgress = action.payload.in_progress
            state.done = action.payload.done
            state.total = action.payload.total
        }
    },
})

export const { dashInfo } = dashSlice.actions

export const getDashInfo = () => async (dispatch) => {
    const history = useHistory()

    let response = await fetch("http://localhost:7777/api/dash-info", {
        mode: "cors",
        method: "GET",
        headers: {
            "Accept":"*/*",
            "Authorization": "Bearer " + localStorage.getItem("access_token")
        },
    })
    if (response.ok) {
        let jsonInfo = await response.json()
        dispatch(dashInfo(jsonInfo))
        return
    } else if (response.status === 401) {
        history.push("/sign-in")
        dispatch(logOutUser())
        return
    }
}

export default dashSlice.reducer