import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import { base_url } from '../config/AppConfig'

export const authenticateUser = data => {
    return axios.post(`${base_url}/api/login`, data)
}

export const logoutUser = () => {
    AsyncStorage.removeItem("userToken")
    .catch(error => console.log("Error occured with logging out", error))
}