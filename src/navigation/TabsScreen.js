import React from 'react'
import {Image, StyleSheet} from 'react-native'
import Search from '../screens/Search'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MainScreens from './MainScreens'
import { useSelector } from 'react-redux'
import Placeholder from '../screens/Placeholder'

const Tabs = createBottomTabNavigator()

const ICON_SIZE = 25

const styles = StyleSheet.create({
    icon: {
        width: ICON_SIZE,
        height: ICON_SIZE
    }
})

function TabScreens() {

    const isLoggedIn = useSelector(state => state.isLoggedIn)

    return (
        <Tabs.Navigator
            tabBarOptions = {{activeTintColor: "#f1f2f6", inactiveBackgroundColor: "#fff", activeBackgroundColor: "#636e72"}}
            screenOptions = {({ route }) => ({
                tabBarIcon: () => {
                    switch (route.name) {
                        case "MainScreens":
                            return <Image style = {styles.icon} source = {require("../assets/img/home.png")} />
                        case "Search":
                            return <Image style = {styles.icon} source = {require("../assets/img/search.png")} />
                        case "Offers":
                            return <Image style = {styles.icon} source = {require("../assets/img/offers.png")} />
                        case "Profile":
                            return <Image style = {styles.icon} source = {require("../assets/img/login.png")} />
                    }
                }
            })}
        >
            <Tabs.Screen component = {MainScreens} name = "MainScreens" options = {{title: "Main"}} />
            <Tabs.Screen component = {Search} name = "Search" />
            <Tabs.Screen component = {Placeholder} name = "Offers" />
            <Tabs.Screen component = {Placeholder} name = "Profile" />
        </Tabs.Navigator>
    )
}

export default TabScreens