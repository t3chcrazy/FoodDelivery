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
            <TouchableWithoutFeedback onPress = {action} hitSlop = {{top: 20, left: 20, right: 20, bottom: 20}}>
                <Image source = {icon} style = {{width: size, height: size}} />
            </TouchableWithoutFeedback>
        </View>
    )
}

export default IconButton