import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 0,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logInUser: (state, action) => {
            if (action.payload === true) {
                state.value = 1
            }
            console.log(state.value)
        },
        logOutUser: (state, action) => {
            state.value += action.payload
            console.log(state.value)
        },
    },
})

// Action creators are generated for each case reducer function
export const { logInUser, logOutUser } = authSlice.actions


export const loginAsync = () => (dispatch) => {
    setTimeout(() => {
        dispatch(logOutUser(2))
    }, 1000)
}

export default authSlice.reducer
