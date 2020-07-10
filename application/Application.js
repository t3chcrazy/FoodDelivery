import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import SplashScreen from '../screens/SplashScreen'
import TabScreens from '../navigation/TabsScreen'

const Stack  = createStackNavigator()

function Application() {
    
    return (
        <NavigationContainer>
            {/* <Stack.Navigator screenOptions = {{
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
                <Stack.Screen component = {Register} name = "Register" />
            </>
            }
            </Stack.Navigator> */}
            <Stack.Navigator screenOptions = {{
                header: props => null
            }}>
                <Stack.Screen component = {SplashScreen} name = "Splash" />
                <Stack.Screen component = {TabScreens} name = "Tabs" />
            </Stack.Navigator>
      </NavigationContainer>
    )
}

export default Application