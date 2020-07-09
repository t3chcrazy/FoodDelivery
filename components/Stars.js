import React from 'react'
import {View, Image, StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: 150,
        justifyContent: "flex-start",
    }
})

function Stars({stars}) {
    return (
        <View style = {styles.container}>
            {new Array(stars).fill(0).map(c => <Image source = {require("../assets/img/star.png")} />)}
            {new Array(5-stars).fill(0).map(c => <Image source = {require("../assets/img/inactivestar.png")} />)}
        </View>
    )
}

export default Stars