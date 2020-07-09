import React from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 5
    },
    name: {
        fontSize: 15,
        color: "#2A2C3A"
    },
    desc: {
        color: "#D2D7DC",
        fontSize: 10
    },
    price: {
        color: "#3D037E",
        fontSize: 12
    }
})

function BoughtItem({isVeg, name, desc, price}) {
    return (
        <View style = {styles.container}>
            <View style = {{flexDirection: "row"}}>
                <View style = {{marginTop: 4, marginRight: 15}}>
                    {isVeg? 
                    <Image source = {require("../assets/img/veg.png")} />
                    : <Image source = {require("../assets/img/nonveg.png")} />}
                </View>
                <View>
                    <Text style = {styles.name}>{name}</Text>
                    <Text style = {styles.desc}>{desc}</Text>
                </View>
            </View>
            <View>
                <Text style = {styles.price}>
                    ₹ {price}
                </Text>
            </View>
        </View>
    )
}

export default BoughtItem