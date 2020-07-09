import React, {useEffect, useRef} from 'react'
import {View, Animated, StyleSheet, ImageBackground, Image, Easing} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

const {timing, Value, loop} = Animated

const styles = StyleSheet.create({
    root: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center"
    },
    logo: {
        position: "absolute",
        width: 112,
        height: 112,
    }
})

const LOGO_SIZE = 105

function SplashScreen({navigation}) {
    const progressVal = useRef(new Value(0)).current
    const rotateVal = progressVal.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"]
    })
    useEffect(() => {
        const anim = loop(timing(progressVal, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
            easing: Easing.linear
        }))
        anim.start()
        setTimeout(() => {
            navigation.navigate("Login")
            anim.stop()
        }, 2000)
    }, [])
    return (
        <View style = {{flex: 1}}>
            <ImageBackground source = {require("../assets/img/splashscreen.png")} style = {styles.root}>
                <View style = {styles.logo}>
                    <Image source = {require("../assets/img/logo.png")} style = {{width: LOGO_SIZE, height: LOGO_SIZE}} />
                </View>
                <Animated.View style = {{...styles.logo, transform: [{rotate: rotateVal}]}}>
                    <Image source = {require("../assets/img/whitecurve.png")} />
                </Animated.View>
                
            </ImageBackground>
        </View>
    )
}

export default SplashScreen