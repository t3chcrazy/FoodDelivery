import React from 'react'
import {View, StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        backgroundColor: "#3D037E",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: "100%",
        zIndex: 3,
        justifyContent: "center",
        paddingHorizontal: 20
    }
})

function BottomTab({children, height}) {
    return (
        <View style = {{...styles.container, height: height}}>
            {children}
        </View>
    )
}

export default BottomTab