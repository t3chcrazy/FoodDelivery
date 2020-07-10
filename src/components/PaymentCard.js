import React, {memo, useEffect} from 'react'
import {View, ImageBackground, Image, StyleSheet, TouchableWithoutFeedback, Animated} from 'react-native'

const styles = StyleSheet.create({
    container: {
        width: 76,
        height: 76,
        borderRadius: 10,
        position: "relative",
        marginVertical: 5.5
    },
    checkmark: {
        position: "absolute",
        right: -3,
        top: -6
    }
})

function PaymentCard({isSelected, image, action = null}) {
    const scale = new Animated.Value(0)
    useEffect(() => {
        if (isSelected) {
            Animated.timing(scale, {
                toValue: 1,
                duration: 250,
                useNativeDriver: true
            }).start()
        }
    }, [isSelected])
    return (
        <TouchableWithoutFeedback onPress = {action}>
            <View style = {styles.container}>
                <ImageBackground source = {image} style = {{...styles.container, resizeMode: "cover"}}>
                    {isSelected? 
                    <Animated.View style = {{...styles.checkmark, transform: [{scale: scale}]}}>
                        <Image source = {require("../assets/img/checkmark.png")} />
                    </Animated.View>: null}
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default memo(PaymentCard)