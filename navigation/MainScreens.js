import React from 'react'
import AutoDetect from '../screens/AutoDetect'
import MainPage from '../screens/MainPage'
import RestaurantMenu from '../screens/RestaurantMenu'
import Checkout from '../screens/Checkout'
import CartSummary from '../screens/CartSummary'
import {createStackNavigator} from '@react-navigation/stack'
import { useSelector } from 'react-redux'

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
            {isLoggedIn?
            <> 
                <Stack.Screen component = {Checkout} name = "Checkout" />
                <Stack.Screen component = {CartSummary} name = "Summary" />
            </>
            : null}
        </Stack.Navigator>
    )
}



export default MainScreens