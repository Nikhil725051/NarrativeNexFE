import { callAPI } from "../../utils/api"
import { logIn, signUp } from "./authSlice"


export const signUpThunk = (payload) => (dispatch) => {
    callAPI({
        payload,
        dispatch,
        method: 'POST',
        apiEndpoint: '/auth/signup',
        apiStatusKey: 'signUp',
        dataAction: signUp
    })
}

export const logInThunk = (payload) => (dispatch) => {
    callAPI({
        payload,
        dispatch,
        method: 'POST',
        apiEndpoint: '/auth/login',
        apiStatusKey: 'logIn',
        dataAction: logIn
    })
}

