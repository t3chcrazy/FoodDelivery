import React, {useState, useCallback, useEffect} from 'react'
import {View, Text, TextInput, useWindowDimensions, StyleSheet, TouchableOpacity, Image} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import Restaurant from '../components/Restaurant'
import restData from '../data/restData'
import { FlatList } from 'react-native-gesture-handler'


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
    },
    restaurantList: {
        marginTop: 10
    },
})

function Search({navigation}) {
    const [searches, setSearches] = useState(null)
    const [filtered, setFiltered] = useState(null)
    const [filterShops, setFilterShops] = useState(() => restData)
    const [filter, setFilter] = useState("")
    const {width: deviceWidth} = useWindowDimensions()

    const flatlistHeader = () => (
        <View style = {{width: 0.9*deviceWidth}}>
            <TextInput
                style = {{...styles.input}}
                placeholder = "Search for restaurants and food"
                autoFocus = {true}
                value = {filter}
                onChangeText = {text => setFilter(text)}
                blurOnSubmit = {false}
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
                        <Image source = {require("../assets/img/redirect.png")} style = {{width: 30, height: 30}} />
                        <Text style = {styles.recentSearch} key = {i}>{shop.name}</Text>
                    </View>
                </TouchableOpacity>)}
            </View>
        </View>
    )

    const renderRestaurant = ({item}) => <Restaurant restaurant = {item} handlePress = {() => navigation.navigate("Menu", {name: item.name, category: item.category, rating: item.rating})} />

    useFocusEffect(useCallback(() => {
        AsyncStorage.getItem("recentSearches", (error, result) => {
            const searchResults = JSON.parse(result)
            setSearches(searchResults)
            setFiltered(searchResults)
        })
    }, []))

    useEffect(() => {
        if (searches !== null) {
            setFiltered(searches.filter(shop => shop.name.toLowerCase().startsWith(filter.toLowerCase())))
        }
        setFilterShops(restData.filter(shop => shop.name.toLowerCase().startsWith(filter.toLowerCase())))
    }, [filter])

    return (
        <View style = {styles.root}>
            <FlatList
                keyExtractor = {item => item.name}
                renderItem = {renderRestaurant}
                data = {filterShops}
                style = {{width: 0.9*deviceWidth, ...styles.restaurantList}}
                removeClippedSubviews = {true}
                initialNumToRender = {7}
                getItemLayout = {(data, index) => (
                    {length: 76, offset: 76*index, index}
                )}
                extraData = {filter}
                ListHeaderComponent = {flatlistHeader}
            />
        </View>
    )
}

export default Search