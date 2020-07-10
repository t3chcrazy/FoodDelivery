import React from 'react'
import {View, ImageBackground, Text, StyleSheet, useWindowDimensions} from 'react-native'

const styles = StyleSheet.create({
    cover: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        flexWrap: "wrap",
        borderRadius: 15,
        textAlign: "left"
    },
    textBox: {
        marginLeft: 18,
    },
    coverText: {
        fontSize: 25,
        color: "#fff",
        fontWeight: "bold",
        letterSpacing: 2,
    }
})

function CarouselItem({image, text}) {
    const {width} = useWindowDimensions()
    return (
        <ImageBackground source = {image} style = {{width: 0.9*width, ...styles.cover}} imageStyle = {{borderRadius: 10}}>
            <View style = {styles.textBox}>
                <Text style = {styles.coverText}>{text}</Text>
            </View>
        </ImageBackground>
    )
}

export default CarouselItem