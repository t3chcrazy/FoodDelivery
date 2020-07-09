import React from 'react'
import {View, Text, StyleSheet, useWindowDimensions} from 'react-native'

const styles = StyleSheet.create({
    container: {
        borderColor: "#C6C6C6",
        borderRadius: 3,
        paddingHorizontal: 10,
        borderWidth: StyleSheet.hairlineWidth,
        alignItems: "center",
        paddingVertical: 2.5
    },
    filterText: {
        color: "#C6C6C6",
        fontSize: 10
    }
})

function Filter({filter, fraction}) {
    const {width} = useWindowDimensions()
    return (
        <View style = {{...styles.container, width: fraction*width}}>
            <Text style = {styles.filterText}>
                {filter}
            </Text>
        </View>
    )
}

export default Filter