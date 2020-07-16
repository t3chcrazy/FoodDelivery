import React, {useState, useRef, useEffect} from 'react'
import {View, Text, ScrollView, StyleSheet, TextInput, Image, useWindowDimensions, FlatList, TouchableOpacity, BackHandler, Alert} from 'react-native'
import IconButton from '../components/IconButton'
import CarouselItem from '../components/CarouselItem'
import Filter from '../components/Filter'
import restData from '../data/restData'
import Restaurant from '../components/Restaurant'
import DrawerLayout from 'react-native-drawer-layout'
import { connect } from 'react-redux'
import { logoutUser } from '../store/login/loginActions'
import { useFocusEffect } from '@react-navigation/native'
import { MENU_HEIGHT, carouselArray, PANELS, FILTERS, INDI_SIZE } from '../config/Constants'
import AsyncStorage from '@react-native-community/async-storage'


const handleBack = () => {
    Alert.alert("Food delivery app", "Do you want to exit?", [
        {
            text: "Cancel",
        },
        {
            text: "Close",
            onPress: () => BackHandler.exitApp()
        }
    ], {cancelable: true})
    return true
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 5,
        position: "relative",
    },
    customize: {
        flexDirection: "row",
        position: "absolute",
        right: 0
    },
    carousel: {
        borderRadius: 5,
        height: 170,
        marginTop: 10,
        position: "relative",
        alignItems: "center"
    },
    indicators: {
        position: "absolute",
        backgroundColor: "transparent",
        bottom: 0,
        width: 50,
        height: 20,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    searchBar: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#D2D7DC",
        flexDirection: "row",
    },
    searchLogo: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    searchInput: {
        flex: 7,
    },
    searchFilter: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        borderWidth: 0,
    },
    filterSection: {
        marginVertical: 5,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    restaurantList: {
        marginTop: 10
    },
    mainPageTab: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    indicator: {
        width: INDI_SIZE,
        height: INDI_SIZE,
        borderRadius: 2,
        backgroundColor: "#D2D7DC"
    },
    drawer: {
        backgroundColor: "red",
        height: 400
    },
    // profileContainer: {
    //     height: 344,
    //     width: 216,
    //     position: "absolute",
    //     right: 0,
    //     top: 30,
    //     borderTopLeftRadius: 10,
    //     borderBottomLeftRadius: 10,
    //     backgroundColor: "#fff"
    // },
    profileContainer: {
        backgroundColor: "#dfe6e9",
        height: "100%",
        width: "90%"
    },
    profile: {
        paddingLeft: 23,
        alignItems: "flex-start",
        marginBottom: 23
    },
    summary: {
        flexDirection: "row",
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#C6C6C6"
    },
    user: {
        justifyContent: "center",
        paddingLeft: 10
    },
    name: {
        height: 13,
        width: 100,
        backgroundColor: "#C6C6C6",
        marginBottom: 7
    },
    userContent: {
        backgroundColor: "#C6C6C6",
        width: 88,
        height: 8,
        marginVertical: 11,
        marginRight: 8
    },
    settingsContainer: {
        paddingLeft: 23,
        paddingTop: 10,
        borderTopColor: "#C6C6C6",
        borderTopWidth: 2,
        flexDirection: "row",
        alignItems: "center"
    },
    logButton: {
        padding: 5,
        borderRadius: 5,
        borderWidth: 2,
        marginRight: 15
    },
    logOut: {
        borderColor: "red",
    },
    logIn: {
        borderColor: "green"
    },
    drawerOption: {
        paddingBottom: 5,
    },
    drawerOptionText: {
        fontSize: 20,
        fontWeight: "bold",
    }
})

function MainPage({navigation, logoutUser, isLoggedIn}) {
    const [active, setActive] = useState(0)
    const [filter, setFilter] = useState("")
    const [filterShops, setFilterShops] = useState(restData)
    const {width} = useWindowDimensions()
    const panelWidth = 0.9*width
    const drawerRef = useRef()
    const OFFSET = 30
    const clickProfile = () => {
        drawerRef.current.openDrawer()
    }

    const renderRestaurant = ({item}) => <Restaurant restaurant = {item} handlePress = {() => navigation.navigate("Menu", {name: item.name, category: item.category, rating: item.rating})} />
    
    const debugScroll = e => {
        let activeTab = -1
        const offset = e.nativeEvent.contentOffset.x
        if (offset >= (PANELS-1)*panelWidth-OFFSET) {
            activeTab = PANELS-1
        }
        else if (offset >= (PANELS-2)*panelWidth-OFFSET) {
            activeTab = PANELS-2
        }
        else if (offset >= (PANELS-3)*panelWidth-OFFSET) {
            activeTab = PANELS-3
        }
        else if (offset >= (PANELS-4)*panelWidth-OFFSET) {
            activeTab = PANELS-4
        }
        else if (offset >= 0) {
            activeTab = 0
        }
        setActive(activeTab)
    }

    const redirectLogin = () => {
        drawerRef.current.closeDrawer()
        navigation.navigate("Login")
    }

    const redirectCheckout = () => {
        if (isLoggedIn) {
            navigation.navigate("Checkout")
        }
        else {
            Alert.alert("Please login to access the checkout menu!")
        }
    }

    const handleRestSubmit = e => {
        console.log("Enter button is pressed", filter)
        if (filterShops.length !== 0) {
            AsyncStorage.getAllKeys((error, keys) => {
                if (keys.indexOf("recentSearches") === -1) {
                    const searches = JSON.stringify([filterShops[0]])
                    AsyncStorage.setItem("recentSearches", searches, error => {
                        if (!error) {
                            console.log(`Filter was set sucessfully`)
                        }
                    })
                }
                else {
                    AsyncStorage.getItem("recentSearches", (error, result) => {
                        const savedSearches = JSON.parse(result)
                        if (savedSearches.indexOf(filterShops[0]) === -1) {
                            savedSearches.push(filterShops[0])
                            AsyncStorage.setItem("recentSearches", JSON.stringify(savedSearches), error => {
                                if (!error) {
                                    console.log("Saved successfully")
                                }
                            })
                        }
                    })
                }
            })
        }
    }

    useFocusEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBack)
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", handleBack)
        }
    }, [])

    useEffect(() => {
        return () => {
            AsyncStorage.removeItem("recentSearches", error => {
                if (!error) {
                    console.log("Searches removed successfully")
                }
            })
        }
    }, [])

    useEffect(() => {
        setFilterShops(restData.filter(rest => rest.name.toLowerCase().includes(filter.toLowerCase())))
    }, [filter])

    const UserProfile = () => (
        <View style = {styles.profileContainer}>
            <View style = {styles.profile}>
                <View style = {{marginVertical: 11}}>
                    <IconButton action = {() => drawerRef.current.closeDrawer()} size = {25} icon = {require("../assets/img/back.png")} />
                </View>
                <View style = {styles.summary}>
                    {/* <View style = {styles.avatar}>
                    </View> */}
                    <IconButton hasMargin = {false} icon = {require("../assets/img/user.png")} size = {48} />
                    <View style = {styles.user}>
                        <View>
                            <Text style = {{fontSize: 16, fontWeight: "bold"}}>{isLoggedIn? "John Doe": "New User?"}</Text>
                        </View>
                        <View>
                            <Text>{isLoggedIn? "johndoe@gmail.com": "Click below to login!"}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style = {{paddingLeft: 20}}>
                <TouchableOpacity onPress = {() => navigation.navigate("AutoDetect")}>
                    <View style = {styles.drawerOption}>
                        <Text style = {styles.drawerOptionText}>
                            Map
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress = {redirectCheckout}>
                    <View style = {styles.drawerOption}>
                        <Text style = {styles.drawerOptionText}>
                            Checkout
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style = {styles.settingsContainer}>
                {isLoggedIn? 
                <TouchableOpacity onPress = {logoutUser}>
                    <View style = {[styles.logOut, styles.logButton]}>
                        <Text style = {{color: "red"}}>
                            Logout
                        </Text>
                    </View>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress = {redirectLogin}>
                    <View style = {[styles.logButton, styles.logIn]}>
                        <Text style = {{color: "green"}}>Login</Text>
                    </View>
                </TouchableOpacity>}
                {/* <View style = {styles.userContent}></View> */}
            </View>
        </View>
    )
    return (
        <DrawerLayout
            ref = {drawerRef}
            drawerWidth = {width}
            drawerPosition = {"left"}
            renderNavigationView = {() => UserProfile()}
        >
            <View style = {{flex: 1, alignItems: "center"}}>
                <ScrollView showsVerticalScrollIndicator = {false} contentContainerStyle = {{width: 0.9*width, alignItems: "center"}}>
                    <View style = {{width: 0.9*width, ...styles.header}}>
                        <View style = {{position: "absolute", left: 0}}>
                            <IconButton size = {20} icon = {require("../assets/img/menu.png")} action = {clickProfile} />
                        </View>
                        <Image style = {{alignSelf: "center", width: 56, height: 54}} source = {require("../assets/img/logo.png")} />
                    </View>
                    <View style = {{width: 0.9*width, marginHorizontal: 0.05*width, ...styles.carousel}}>
                        <ScrollView horizontal = {true} pagingEnabled scrollEventThrottle = {16} onScroll = {debugScroll}>
                            {carouselArray.map((c, i) => <CarouselItem key = {i} image = {c.icon} text = {c.title} />)}
                        </ScrollView>
                        <View style = {styles.indicators}>
                            {new Array(carouselArray.length).fill(0).map((c, i) => <View style = {{...styles.indicator, backgroundColor: active === i? "#fff": "#D2D7DC"}} />)}
                        </View>
                    </View>
                    <View style = {{ ...styles.searchBar}}>
                        <View style = {styles.searchLogo}>
                            <Image source = {require("../assets/img/search.png")} style = {{width: 27, height: 27}} />
                        </View>
                        <TextInput 
                            style = {styles.searchInput} 
                            placeholder = "Search restaurants you like"
                            value = {filter}
                            onChangeText = {text => setFilter(text)}
                            onSubmitEditing = {handleRestSubmit}
                        />
                        <View style = {styles.searchFilter}>
                            <Image source = {require("../assets/img/filter.png")} />
                        </View>
                    </View>
                    <View style = {{width: 0.9*width, ...styles.filterSection}}>
                        {FILTERS.map((f, i) => <Filter key = {i} filter = {f} fraction = {0.2} />)}
                    </View>
                    <FlatList
                        keyExtractor = {item => item.name}
                        renderItem = {renderRestaurant}
                        data = {filterShops}
                        style = {{width: 0.9*width, ...styles.restaurantList}}
                        removeClippedSubviews = {true}
                        initialNumToRender = {7}
                        getItemLayout = {(data, index) => (
                            {length: 76, offset: 76*index, index}
                        )}
                        extraData = {filter}
                    />
                    <View style = {{height: MENU_HEIGHT+6, width: "100%", backgroundColor: "#f0f0f0"}}>

                    </View>
                </ScrollView>
            </View>
        </DrawerLayout>
    )
}

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser()),
})

const mapStateToProps = state => ({
    isLoggedIn: state.isLoggedIn
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)