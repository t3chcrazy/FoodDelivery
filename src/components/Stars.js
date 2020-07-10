import React from 'react'
import {View, Image, StyleSheet} from 'react-native'
import { STAR_SIZE } from '../config/Constants'



const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: 150,
        justifyContent: "flex-start",
    },
    star: {
        width: STAR_SIZE,
        height: STAR_SIZE
    }
})

function Stars({stars}) {
    return (
        <View style = {styles.container}>
            {new Array(stars).fill(0).map(c => <Image source = {require("../assets/img/star.png")} style = {styles.star} />)}
            {new Array(5-stars).fill(0).map(c => <Image source = {require("../assets/img/inactivestar.png")} style = {styles.star} />)}
        </View>
    )
}

export default Stars