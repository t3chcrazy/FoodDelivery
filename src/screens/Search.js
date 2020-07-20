import React, {useState, useCallback, useEffect} from 'react'
import {View, Text, TextInput, useWindowDimensions, StyleSheet, TouchableOpacity, Image} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { useFocusEffect } from '@react-navigation/native'

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
    },
    recentSearch: {
        fontWeight: "bold",
        marginVertical: 5,
        marginRight: 10,
    }
})

function Search({navigation}) {
    const [searches, setSearches] = useState(null)
    const [filtered, setFiltered] = useState(null)
    const [filter, setFilter] = useState("")
    const {width: deviceWidth} = useWindowDimensions()

    useEffect(() => {
        AsyncStorage.getItem("recentSearches", (error, result) => {
            const searchResults = JSON.parse(result)
            setSearches(searchResults)
            setFiltered(searchResults)
        })
    }, [])

    useFocusEffect(() => {
        console.log("hello")
        // AsyncStorage.getItem("recentSearches", (error, result) => {
        //     const searchResults = JSON.parse(result)
        //     setSearches(searchResults)
        //     setFiltered(searchResults)
        // })
    }, [])

    useEffect(() => {
        if (searches !== null) {
            setFiltered(searches.filter(shop => shop.name.toLowerCase().includes(filter.toLowerCase())))
        }
    }, [filter])

    return (
        <View style = {styles.root}>
            <View style = {{width: 0.9*deviceWidth}}>
                <TextInput
                    style = {{...styles.input}}
                    placeholder = "Search for restaurants and food"
                    autoFocus = {true}
                    value = {filter}
                    onChangeText = {text => setFilter(text)}
                />
                <View style = {{marginVertical: 10}}>
                    <Text style = {{fontWeight: "bold", fontSize: 18}}>Recent searches</Text>
                </View>
                <View>
                    {filtered === null? null: 
                    filtered.map((shop, i) => 
                    typeof shop === 'string'? null: 
                    <TouchableOpacity onPress = {() => navigation.navigate("Menu", {name: shop.name, category: shop.category, rating: shop.rating})}>
                        <View style = {{flexDirection: "row", justifyContent: "flex-start"}}>
                            <Text style = {styles.recentSearch} key = {i}>{shop.name}</Text>
                            <Image source = {require("../assets/img/redirect.png")} style = {{width: 30, height: 30}} />
                        </View>
                    </TouchableOpacity>)}
                </View>
            </View>
        </View>
    )
}

export default Search