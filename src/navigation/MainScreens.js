import React from 'react'
import AutoDetect from '../screens/AutoDetect'
import MainPage from '../screens/MainPage'
import RestaurantMenu from '../screens/RestaurantMenu'
import Checkout from '../screens/Checkout'
import CartSummary from '../screens/CartSummary'
import {createStackNavigator} from '@react-navigation/stack'
import { useSelector } from 'react-redux'
import Login from '../screens/Login'
import Register from '../screens/Register'

const Stack  = createStackNavigator()

function MainScreens() {
    const isLoggedIn = useSelector(state => state.isLoggedIn)
    return (
        <Stack.Navigator screenOptions = {{
            header: props => null,
        }} initialRouteName = "MainPage">
            <Stack.Screen component = {AutoDetect} name = "AutoDetect" />
            <Stack.Screen component = {MainPage} name = "MainPage" />
            <Stack.Screen component = {RestaurantMenu} name = "Menu" />
            <Stack.Screen component = {Login} name = "Login" />
            {isLoggedIn?
            <> 
                <Stack.Screen component = {Checkout} name = "Checkout" />
                <Stack.Screen component = {CartSummary} name = "Summary" />
            </>
            :
            <>
                <Stack.Screen component = {Register} name = "Register" />
            </>}
        </Stack.Navigator>
    )
}



export default MainScreens