import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#C6C6C6",
        paddingHorizontal: 6,
        paddingVertical: 2,
        marginTop: 6,
        marginBottom: 10,
        alignSelf: "flex-start",
        borderRadius: 3
    },
    containerText: {
        color: "#fff",
        fontSize: 12
    }
})

function Reviews({reviews}) {
    return (
        <View style = {styles.container}>
            <Text style = {styles.containerText}>
                {reviews} reviews
            </Text>
        </View>
    )
}

export default Reviews