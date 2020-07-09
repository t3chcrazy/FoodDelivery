import { LOGIN_SUCCESS, LOGIN_ERROR, LOGIN_IDLE, LOGOUT_SUCCESS } from './loginTypes'

const initialState = {
    isLoggedIn: false,
    error: "",
    token: ""
}

const loginReducer = (state = false, action) => {
    switch (action.type) {
        case LOGOUT_SUCCESS:
            return {
                isLoggedIn: false,
                error: "",
                token: ""
            }
        case LOGIN_SUCCESS:
            return {
                isLoggedIn: true,
                token: action.payload,
                error: ""
            }
        case LOGIN_ERROR:
            return {
                isLoggedIn: false,
                error: action.payload,
                token: ""
            }
        case LOGIN_IDLE:
            return initialState
        default: return state
    }
}

export default loginReducer