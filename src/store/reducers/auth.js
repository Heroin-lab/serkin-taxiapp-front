import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoginStatus: false,
    accessToken: "",
    refreshToken: "",
    alertError: "",
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logInUser: (state, action) => {
            state.accessToken = action.payload.access_token
            state.refreshToken = action.payload.refresh_token
            state.isLoginStatus = true
            localStorage.setItem("access_token", state.accessToken)
            localStorage.setItem("refresh_token", state.refreshToken)
            localStorage.setItem("isUserLogin", state.isLoginStatus)
        },
        logOutUser: () => {
            localStorage.removeItem("access_token")
            localStorage.removeItem("refresh_token")
            localStorage.removeItem("isUserLogin")
        },
        createErrorAlert: (state, action) => {
            state.alertError = action.payload
        },
        stateUpdater: (state) => {
            state.accessToken = localStorage.getItem("access_token")
            state.refreshToken = localStorage.getItem("refresh_token")
            state.isLoginStatus = localStorage.getItem("isUserLogin")
        }
    },
})

// Action creators are generated for each case reducer function
export const { logInUser, logOutUser, createErrorAlert, stateUpdater} = authSlice.actions


export const loginAsync = (data) => async (dispatch) => {
    let response = await fetch("http://localhost:7777/auth/sign-in", {
        mode: "cors",
        method: "POST",
        headers: {
            "Accept":"*/*",
            "Content-type":"application/json"
        },
        body: JSON.stringify({login: data.login, password: data.password})
    })
    if (response.ok) {
        let jsonInfo = await response.json()
        dispatch(logInUser(jsonInfo))
        return true
    } else {
        dispatch(createErrorAlert("Wrong login or password!"))
        return false
    }
}

export const registerAsync = (data) => async (dispatch) => {
    let response = await fetch("http://localhost:7777/auth/sign-up", {
        mode: "cors",
        method: "POST",
        headers: {
            "Accept":"*/*",
            "Content-type":"application/json"
        },
        body: JSON.stringify({login: data.login, password: data.password})
    })
    if (response.ok) {
        let jsonInfo = await response.json()
        dispatch(logInUser(jsonInfo))
        return true
    } else if (response.status === 500) {
        dispatch(createErrorAlert("User with this login already exist!"))
        return false
    }
}

export const validator = (data) => (dispatch) => {
    let loginPattern = /^[a-zA-Z](.[a-zA-Z0-9_-]*)$/;
    let passPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;

    if (!data.login) {
        dispatch(createErrorAlert("Login field is empty!"))
        return false
    }
    if (data.login.length < 3) {
        dispatch(createErrorAlert("Login is too short!"))
        return false
    }
    if (data.login.length > 17) {
        dispatch(createErrorAlert("Login is too long!"))
        return false
    }
    if (!loginPattern.test(data.login)) {
        dispatch(createErrorAlert("Login must contain only latin letters!"))
        return false
    }
    if (!data.password) {
        dispatch(createErrorAlert("Password field is empty!"))
        return false
    }
    if (data.password.length < 6) {
        dispatch(createErrorAlert("Password is too short!"))
        return false
    }
    if (data.password.length > 20) {
        dispatch(createErrorAlert("Password is too long!"))
        return false
    }
    if (!passPattern.test(data.password)) {
        dispatch(createErrorAlert("Password must contain only latin letters and numbers"))
        return false
    }

    return true
}

export default authSlice.reducer
