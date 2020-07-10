import React from 'react'
import {TouchableOpacity, Text, StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        backgroundColor: "#e74c3c",
        padding: 10,
        width: 200,
        alignItems: "center",
        elevation: 3
    },
    buttonText: {
        fontSize: 20,
        color: "#fff"
    }
})

function RoleButton({text, action}) {
    return (
        <TouchableOpacity style = {styles.button} onPress = {action}>
            <Text style = {styles.buttonText}>
                {text}
            </Text>
        </TouchableOpacity>
    )
}

export default RoleButton