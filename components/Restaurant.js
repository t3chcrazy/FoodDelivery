import React, {memo} from 'react'
import {View, Text, Image, StyleSheet, TouchableWithoutFeedback} from 'react-native'
import Ratings from './Ratings'
import FoodBackground from './FoodBackground'

const styles = StyleSheet.create({
    main: {
        flexDirection: "row",
        flex: 1,
        height: 76,
        marginVertical: 6
    },
    restImage: {
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderWidth: 2,
        width: 76,
        height: 76
    },
    details: {
        flex: 4,
        justifyContent: "center",
        alignItems: "flex-start",
        paddingLeft: 10
    },
    name: {
        fontSize: 15,
        color: "#2A2C3A"
    },
    category: {
        fontSize: 10,
        color: "#D2D7DC"
    },
    cuisine: {
        color: "#6B5B7D",
        fontSize: 10
    },
    secondDetails: {
        flex: 2,
        alignItems: "flex-end",
        justifyContent: "space-around",
    },
    rating: {
        backgroundColor: "#3D037E",
        paddingHorizontal: 4,
        borderRadius: 2
    },
    ratingText: {
        color: "#fff",
        fontSize: 10
    },
    delivery: {
        flexDirection: "row",
        alignItems: "center"
    },
    deliveryTextWrapper: {
        borderLeftWidth: StyleSheet.hairlineWidth,
        borderLeftColor: "#D2D7DC",
        paddingLeft: 4
    },
    deliveryText: {
        color: "#D2D7DC",
        fontSize: 10
    }
})

function Restaurant({restaurant, handlePress}) {
    const {isBest, name, category, cuisine, rating, deliveryTime, image} = restaurant
    return (
        <TouchableWithoutFeedback onPress = {handlePress}>
            <View style = {styles.main}>
                {/* <View style = {{...styles.restImage, borderTopLeftRadius: isBest? 0: 10}}>
                </View> */}
                <FoodBackground image = {image} isBest = {isBest} />
                <View style = {styles.details}>
                    <Text style = {styles.name}>{name}</Text>
                    <Text style = {styles.category}>{category}</Text>
                    <Text style = {styles.cuisine}>{cuisine}</Text>
                </View>
                <View style = {styles.secondDetails}>
                    <Ratings rating = {rating} />
                    <View style = {styles.delivery}>
                        <View style = {{paddingRight: 4}}>
                            <Image source = {require("../assets/img/Time.png")} />
                        </View>
                        <View style = {styles.deliveryTextWrapper}>
                            <Text style = {styles.deliveryText}>{deliveryTime} min</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default memo(Restaurant)