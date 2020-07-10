import React from 'react'
import {TouchableWithoutFeedback, StyleSheet, Image, View} from 'react-native'

const styles = StyleSheet.create({
    button: {
        marginHorizontal: 15,
    }
})

function IconButton({size, icon, hasMargin = false, action = null}) {
    return (
        <View style = {hasMargin? styles.button: null}>
            <TouchableWithoutFeedback onPress = {action}>
                <Image source = {icon} style = {{width: size, height: size}} />
            </TouchableWithoutFeedback>
        </View>
    )
}

export default IconButton