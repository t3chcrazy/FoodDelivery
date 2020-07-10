import React, {useState, memo} from 'react'
import {View, Text, StyleSheet, TouchableWithoutFeedback, ToastAndroid} from 'react-native'
import FoodBackground from './FoodBackground'
import Stars from './Stars'

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flex: 1,
        height: 76,
        marginVertical: 8
    },
    details: {
        flex: 4,
        justifyContent: "space-evenly",
        alignItems: "flex-start",
        paddingLeft: 10
    },
    name: {
        fontSize: 15,
        color: "#2A2C3A",
        fontWeight: "bold"
    },
    desc: {
        fontSize: 8,
        color: "#D2D7DC",
        alignSelf: "flex-start"
    },
    price: {
        fontSize: 10,
        color: "#3D037E",
    },
    counterContainer: {
        justifyContent: "center",
        alignItems: "flex-end",
        flex: 2,
    },
    counter: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "stretch",
        width: 50,
        borderRadius: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "#D2D7DC"
    },
    countButton: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    }
})

function MenuItem({menuitem}) {
    const [count, setCount] = useState(0)
    const {name, desc, price, stars, isBest, image} = menuitem
    const clickLeft = () => {
        if (count > 0) {
            setCount(count-1)
        }
        else {
            ToastAndroid.showWithGravity("Quantity of an item can't be less than 0", 2000, ToastAndroid.BOTTOM)
        }
    }
    return (
        <View style = {styles.container}>
            <FoodBackground image = {image} isBest = {isBest} />
            <View style = {styles.details}>
                <Text style = {styles.name}>
                    {name}
                </Text>
                <Text style = {styles.desc}>
                    {desc}
                </Text>
                <Stars stars = {stars} />
                <Text style = {styles.price}>
                    ₹ {price}
                </Text>
            </View>
            <View style = {styles.counterContainer}>
                <View style = {styles.counter}>
                    <TouchableWithoutFeedback onPress = {() => clickLeft()}>
                        <View style = {styles.countButton}>
                            <Text>-</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style = {{flex: 1, justifyContent: "center", alignItems: "center"}}>
                        <Text>
                            {count}
                        </Text>
                    </View>
                    <TouchableWithoutFeedback onPress = {() => setCount(count+1)} style = {styles.countButton}>
                        <View style = {styles.countButton}>
                            <Text>+</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </View>
    )
}

export default MenuItem