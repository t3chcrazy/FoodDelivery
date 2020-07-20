import React from 'react'
import {View, Text} from 'react-native'

function Placeholder({route}) {
    console.log(route.name)
    return (
        <View style = {{flex: 1, padding: 20}}>
            <Text style = {{fontSize: 40, fontWeight: "bold"}}>{route.name}</Text>
        </View>
    )
}

export default Placeholder