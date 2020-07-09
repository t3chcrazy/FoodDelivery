import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    rating: {
        backgroundColor: "#3D037E",
        paddingHorizontal: 4,
        borderRadius: 4,
    },
    ratingText: {
        color: "#fff",
        
    },
})

function Ratings({rating, size = "sm"}) {
    return (
        <View style = {styles.rating}>
            <Text style = {{...styles.ratingText, fontSize: size === "sm"? 10: 15}}>
                {rating}
            </Text>
        </View>
    )
}

export default Ratings