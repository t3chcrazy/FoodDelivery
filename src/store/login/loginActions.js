import { LOGIN_SUCCESS, LOGIN_ERROR, LOGIN_IDLE, LOGOUT_SUCCESS } from './loginTypes.js'
import { authenticateUser } from '../../services/authService'
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
import { base_url } from '../../config/AppConfig.js'

export const loginSuccessful = token => ({
    type: LOGIN_SUCCESS,
    payload: token
})

export const loginFailed = error => ({
    type: LOGIN_ERROR,
    payload: error
})

export const loginIdle = () => ({
    type: LOGIN_IDLE
})

export const logoutSuccessful = () => ({
    type: LOGOUT_SUCCESS
})

export const loginUser = (email, password) => {
    return dispatch => {
        axios.post("https://reqres.in/api/login", {email: email, password: password})
        .then(response => {
            const token = response.data.token
            AsyncStorage.setItem("userToken", token)
            .then(() => {
                dispatch(loginSuccessful(token))
            })
        })
        .catch(error => {
            dispatch(loginFailed(error))
            setTimeout(() => {
                dispatch(loginIdle())
            }, 1000)
        })
    }
}

export const logoutUser = () => {
    return dispatch => {
        AsyncStorage.removeItem("userToken", () => {
            console.log("Reached here")
            dispatch(logoutSuccessful())
        })
    }
}