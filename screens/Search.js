import React from 'react'
import {View, Text, TextInput, useWindowDimensions, StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: "center",
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        color: "#C9C9C9",
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "#C9C9C9",
        width: "100%",
        marginVertical: 10,
        fontSize: 15,
    }
})

function Search() {
    const {width: deviceWidth} = useWindowDimensions()
    return (
        <View style = {styles.root}>
            <View style = {{width: 0.9*deviceWidth}}>
                <TextInput
                    style = {{...styles.input}}
                    placeholder = "Search for restaurants and food"
                    autoFocus = {true}
                />
                <View style = {{marginVertical: 10}}>
                    <Text style = {{fontWeight: "bold", fontSize: 18}}>Recent searches</Text>
                </View>
            </View>
        </View>
    )
}

export default Search