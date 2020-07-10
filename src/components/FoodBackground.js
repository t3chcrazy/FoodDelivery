import React, {memo} from 'react'
import {View, Text, StyleSheet, ImageBackground} from 'react-native'

const styles = StyleSheet.create({
    imageContainer: {
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        width: 76,
        height: 76
    },
    image: {
        resizeMode: "cover",
        flex: 1,
    },
    bestSeller: {
        width: 45,
        height: 16,
        borderBottomRightRadius: 10,
        backgroundColor: "#3D037E",
        alignItems: "center",
        paddingTop: 2
    },
    bestText: {
        color: "#fff",
        fontSize: 8
    }
})

function FoodBackground({image, isBest}) {
    return (
        <View style = {{...styles.imageContainer, borderTopLeftRadius: isBest? 0: 10}}>
            <ImageBackground source = {image} style = {styles.image}>
                {isBest?
                <View style = {styles.bestSeller}>
                    <Text style = {styles.bestText}>
                        Best seller
                    </Text>
                </View>: null}
            </ImageBackground>
        </View>
    )
}

export default memo(FoodBackground)