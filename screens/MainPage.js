import React, {useState, useRef, useEffect} from 'react'
import {View, Text, ScrollView, SafeAreaView, StyleSheet, TextInput, Image, useWindowDimensions, FlatList, TouchableOpacity} from 'react-native'
import IconButton from '../components/IconButton'
import CarouselItem from '../components/CarouselItem'
import Filter from '../components/Filter'
import restData from '../data/restData'
import Restaurant from '../components/Restaurant'
import BottomTab from '../components/BottomTab'
import DrawerLayout from 'react-native-drawer-layout'
import {useRoute} from '@react-navigation/native'
import { connect } from 'react-redux'
import { logoutUser } from '../src/store/login/loginActions'


const MENU_HEIGHT = 58

const carouselArray = [
    {
        title: "Discover new tasting experience",
        icon: require("../assets/img/carousel1.png")
    },
    {
        title: "Super fast delivery",
        icon: require("../assets/img/carousel2.png")
    },
    {
        title: "Restaurants with the best hygiene",
        icon: require("../assets/img/carousel3.png")
    },
    {
        title: "Schedule your orders",
        icon: require("../assets/img/carousel4.png")
    },
    {
        title: "A variety of cuisines to choose from",
        icon: require("../assets/img/carousel5.png")
    }
]
const PANELS = carouselArray.length

const TAB_ICONS = [
    require("../assets/img/home.png"),
    require("../assets/img/search.png"),
    require("../assets/img/offers.png"),
    require("../assets/img/cart.png")
]

const FILTERS = [
    "Rating 4.0+",
    "Nearest",
    "Best Seller",
    "Veg Only"
]

const INDI_SIZE = 4

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
    profileContainer: {
        height: 344,
        width: 216,
        position: "absolute",
        right: 0,
        top: 30,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        backgroundColor: "#fff"
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
        alignItems: "flex-start",
        justifyContent: "center",
        paddingLeft: 10
    },
    name: {
        height: 13,
        width: 100,
        backgroundColor: "#C6C6C6",
        marginBottom: 7
    },
    userType: {
        height: 8,
        width: 88,
        backgroundColor: "#C6C6C6"
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
    logOut: {
        borderColor: "red",
        padding: 5,
        borderWidth: 2,
        borderRadius: 5,
        marginRight: 15
    }
})

function MainPage({navigation, logoutUser}) {
    const [active, setActive] = useState(0)
    const {width} = useWindowDimensions()
    const route = useRoute()
    const panelWidth = 0.9*width
    const drawerRef = useRef()
    const OFFSET = 30
    const clickProfile = () => {
        drawerRef.current.openDrawer()
    }
    const renderRestaurant = ({item}) => <Restaurant restaurant = {item} handlePress = {() => navigation.navigate("Menu", {name: item.name, category: item.category, rating: item.rating, coordinates: route.params.coordinates})} />
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
    const UserProfile = () => (
        <View style = {styles.profileContainer}>
            <View style = {styles.profile}>
                <View style = {{marginVertical: 11}}>
                    <Image source = {require("../assets/img/back.png")} />
                </View>
                <View style = {styles.summary}>
                    <View style = {styles.avatar}>
                    </View>
                    <View style = {styles.user}>
                        <View style = {styles.name}>
                        </View>
                        <View style = {styles.userType}>
                        </View>
                    </View>
                </View>
            </View>
            <View style = {{paddingLeft: 20}}>
                {new Array(6).fill(0).map(c => <View style = {styles.userContent}></View>)}
            </View>
            <View style = {styles.settingsContainer}>
                <TouchableOpacity onPress = {logoutUser}>
                    <View style = {styles.logOut}>
                        <Text style = {{color: "red"}}>
                            Logout
                        </Text>
                    </View>
                </TouchableOpacity>
                {/* <View style = {styles.userContent}></View> */}
                <Image source = {require("../assets/img/settings.png")} />
            </View>
        </View>
    )
    return (
        <DrawerLayout
            ref = {drawerRef}
            drawerWidth = {width}
            drawerPosition = {"right"}
            renderNavigationView = {() => UserProfile()}
            drawerBackgroundColor = "rgba(0, 0, 0, 0.5)"
        >
            <View style = {{flex: 1, alignItems: "center"}}>
                <BottomTab height = {MENU_HEIGHT}>
                    <View style = {styles.mainPageTab}>
                        {TAB_ICONS.map(t => <Image source = {t} />)}
                    </View>
                </BottomTab>
                <ScrollView showsVerticalScrollIndicator = {false} contentContainerStyle = {{width: 0.9*width, alignItems: "center"}}>
                    <View style = {{width: 0.9*width, ...styles.header}}>
                        <View style = {{position: "absolute", left: 0}}>
                            <IconButton size = {20} icon = {require("../assets/img/menu.png")} />
                        </View>
                        <Image style = {{alignSelf: "center", width: 56, height: 54}} source = {require("../assets/img/logo.png")} />
                        <View style = {styles.customize}>
                            <IconButton hasMargin = {true} size = {20} icon = {require("../assets/img/settings.png")} />
                            <IconButton size = {20} icon = {require("../assets/img/profile.png")} action = {clickProfile} />
                        </View>
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
                            <Image source = {require("../assets/img/search.png")} />
                        </View>
                        <TextInput style = {styles.searchInput} placeholder = "Search food you like" />
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
                        data = {restData}
                        style = {{width: 0.9*width, ...styles.restaurantList}}
                        removeClippedSubviews = {true}
                        initialNumToRender = {7}
                        getItemLayout = {(data, index) => (
                            {length: 76, offset: 76*index, index}
                        )}
                    />
                    <View style = {{height: MENU_HEIGHT+6, width: "100%", backgroundColor: "#f0f0f0"}}>

                    </View>
                </ScrollView>
            </View>
        </DrawerLayout>
    )
}

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser())
})

export default connect(null, mapDispatchToProps)(MainPage)