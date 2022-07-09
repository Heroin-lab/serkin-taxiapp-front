import {createSlice} from "@reduxjs/toolkit";
import {logOutUser} from "./auth";
import {useHistory} from "react-router-dom";

const initialState = {
    allDriverInfo: [],
    alertMessage: "",
}

export const driversSlice = createSlice({
    name: 'drivers',
    initialState,
    reducers: {
        setAllDriversInfo: (state, action) => {
            state.allDriverInfo = action.payload.data
        },
        setAlertMessage: (state, action) => {
            state.alertMessage = action.payload
        },
        clearAlertMessage: (state) => {
            state.alertMessage = ""
        }
    }
})

export const { setAllDriversInfo, setAlertMessage, clearAlertMessage } = driversSlice.actions

export const LoadAllDriversInfo = (history) => async (dispatch) => {
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
        dispatch(setAllDriversInfo(jsonData))
        return
    } else if (response.status === 401) {
        history.push('/sign-in')
        dispatch(logOutUser())
        return
    }
}

export const CreateCabMan = (objectData, history) => async (dispatch) => {
    if (!EditValidator(objectData)) return

    let response = await fetch("http://localhost:7777/api/cab-man", {
        mode: "cors",
        method: "POST",
        headers: {
            "Accept":"*/*",
            "Authorization": "Bearer " + localStorage.getItem("access_token")
        },
        body: JSON.stringify( {
            first_name: objectData.first_name,
            second_name: objectData.second_name,
            vehicle_number: objectData.vehicle_number,
            image: 'https://gamebomb.ru/files/galleries/001/4/44/387699.jpg'
        })
    })
    if (response.ok) {
        return true
    } else if (response.status === 401) {
        history.push('/sign-in')
        dispatch(logOutUser())
        return false
    }
}

export const UpdateCabMan = (objectData, history) => async (dispatch) => {
    if (!EditValidator(objectData)) return

    let response = await fetch("http://localhost:7777/api/cab-man/" + objectData.id, {
        mode: "cors",
        method: "PUT",
        headers: {
            "Accept":"*/*",
            "Authorization": "Bearer " + localStorage.getItem("access_token")
        },
        body: JSON.stringify( {
            first_name: objectData.first_name,
            second_name: objectData.second_name,
            vehicle_number: objectData.vehicle_number,
            image: objectData.image
        })
    })
    if (response.ok) {
        let jsonData = await response.json()
        if (jsonData.id !== objectData.id) {dispatch(setAlertMessage("Can`t update this cab man!"))}
        return true
    } else if (response.status === 401) {
        history.push('/sign-in')
        dispatch(logOutUser())
        return false
    }
}

export const DeleteCanMan = (id, history) => async (dispatch) => {
    let response = await fetch("http://localhost:7777/api/cab-man/" + id, {
        mode: "cors",
        method: "DELETE",
        headers: {
            "Accept":"*/*",
            "Authorization": "Bearer " + localStorage.getItem("access_token")
        }
    })
    if (response.ok) {
        let jsonData = await response.json()
        if (jsonData.id !== id) {dispatch(setAlertMessage("Can`t delete this cab man!"))}
        return true
    } else if (response.status === 401) {
        history.push('/sign-in')
        dispatch(logOutUser())
        return false
    }
}

export const EditValidator = (dataObject) => (dispatch) => {
    let namePattern = /^[a-z ,.'-]+$/i
    let carNumberPattern = /^[A-Z]{2}\s\d{4}(?<!0{4})\s[A-Z]{2}$/

    if (!dataObject.first_name) {
        dispatch(setAlertMessage("First name field is empty!"))
        return false
    }
    if (dataObject.first_name.length < 3) {
        dispatch(setAlertMessage("First name is too short!"))
        return false
    }
    if (dataObject.first_name.length > 16) {
        dispatch(setAlertMessage("First name is too long!"))
        return false
    }
    if (!namePattern.test(dataObject.first_name)) {
        dispatch(setAlertMessage("Invalid first name!"))
        return false
    }

    if (!dataObject.second_name) {
        dispatch(setAlertMessage("Second name field is empty!"))
        return false
    }
    if (dataObject.second_name.length < 3) {
        dispatch(setAlertMessage("Second name is too short!"))
        return false
    }
    if (dataObject.second_name.length > 16) {
        dispatch(setAlertMessage("Second name is too long!"))
        return false
    }
    if (!namePattern.test(dataObject.second_name)) {
        dispatch(setAlertMessage("Invalid second name!"))
        return false
    }

    if (!dataObject.vehicle_number) {
        dispatch(setAlertMessage("Vehicle number is empty!"))
        return false
    }
    if (dataObject.vehicle_number < 10) {
        dispatch(setAlertMessage("Vehicle number is too short!"))
        return false
    }
    if (dataObject.vehicle_number > 10) {
        dispatch(setAlertMessage("Vehicle number is too long!"))
        return false
    }
    if (!carNumberPattern.test(dataObject.vehicle_number)) {
        dispatch(setAlertMessage("Invalid vehicle number!"))
        return false
    }

    return true
}

// export const GetOneCabManInfo = (id) => async (dispatch) => {
//     let response = await fetch("http://localhost:7777/api/cab-man/" + id, {
//         mode: "cors",
//         method: "GET",
//         headers: {
//             "Accept":"*/*",
//             "Authorization": "Bearer " + localStorage.getItem("access_token")
//         }
//     })
//     if (response.ok) {
//         let jsonData = await response.json()
//         dispatch(setOneDriversInfo(jsonData))
//         return
//     } else if (response.status === 401) {
//         history.push('/sign-in')
//         dispatch(logOutUser())
//         return
//     }
// }

export default driversSlice.reducer