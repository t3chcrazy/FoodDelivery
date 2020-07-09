import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import MainPage from '../screens/MainPage'
import RestaurantMenu from '../screens/RestaurantMenu'
import Login from '../screens/Login'
import Checkout from '../screens/Checkout'
import CartSummary from '../screens/CartSummary'
import SplashScreen from '../screens/SplashScreen'
import AutoDetect from '../screens/AutoDetect'
import { connect } from 'react-redux'

const Stack  = createStackNavigator()

function Application({isLoggedIn}) {
    
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions = {{
            header: (props) => null
            }}>
            {isLoggedIn?
            <>
                <Stack.Screen component = {AutoDetect} name = "AutoDetect" />
                <Stack.Screen component = {MainPage} name = "Main" />
                <Stack.Screen component = {RestaurantMenu} name = "Menu" />
                <Stack.Screen component = {Checkout} name = "Checkout" />
                <Stack.Screen component = {CartSummary} name = "Summary" />
            </>
            :
            <>
                <Stack.Screen component = {SplashScreen} name = "Splash" />
                <Stack.Screen component = {Login} name = "Login" />
            </>
            }
            </Stack.Navigator>
      </NavigationContainer>
    )
}

const mapStateToProps = state => ({
    isLoggedIn: state.isLoggedIn
})

export default connect(mapStateToProps)(Application)