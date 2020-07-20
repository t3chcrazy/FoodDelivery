import React, {useState, useCallback, useEffect} from 'react'
import {View, Text, ImageBackground, ScrollView, StyleSheet, Switch, SectionList, Image, TouchableWithoutFeedback, Alert} from 'react-native'
import menuData from '../data/menuData'
import Ratings from '../components/Ratings'
import Reviews from '../components/Reviews'
import MenuItem from '../components/MenuItem'
import BottomTab from '../components/BottomTab'
import { useFocusEffect, useRoute } from '@react-navigation/native'
import { SPACING, MENU_HEGHT, CART_SIZE } from '../config/Constants'
import { useSelector } from 'react-redux'


const styles = StyleSheet.create({
    imageCover: {
        flex: 3,
    },
    scrollContainer: {
        flex: 5,
        transform: [
            {
                translateY: -20
            }
        ],
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
    },
    cover: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        resizeMode: "cover"
    },
    backButton: {
        alignSelf: "flex-start",
        marginLeft: SPACING,
        marginTop: SPACING
    },
    heartButton: {
        alignSelf: "flex-end",
        backgroundColor: "#fff",
        marginBottom: 30,
        borderRadius: 20,
        padding: 10,
        marginRight: SPACING
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 25
    },
    headerText: {
        fontSize: 25,
        fontWeight: "bold"
    },
    categoryText: {
        fontSize: 12,
        color: "#C6C6C6"
    },
    criteriaContainer: {
        flexDirection: "row",
        marginBottom: 20
    },
    criteria: {
        flexDirection: "row",
        width: 100,
        alignItems: "center",
    },
    criteriaText: {
        fontSize: 12,
        marginRight: 5
    },
    sectionHeaderText: {
        fontWeight: "bold",
        fontSize: 15,
        color: "#3D037E",
        marginBottom: 10,
        marginTop: 5
    },
    menu: {
        position: "absolute",
        bottom: MENU_HEGHT+7,
        right: 20,
        borderRadius: 10,
        flexDirection: "row",
        paddingHorizontal: 7,
        paddingVertical: 3,
        borderColor: "#3D037E",
        zIndex: 3,
        borderWidth: 1,
        alignItems: "center",
        backgroundColor: "#fff"
    },
    checkOutTab: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    tabText: {
        color: "#fff",
        borderLeftWidth: 1,
    }
})

function RestaurantMenu({navigation}) {
    const[isVeg, setVeg] = useState(false)
    const [quant, setQuant] = useState(0)
    const [price, setPrice] = useState(0)
    const [items, setItems] = useState(() => menuData)
    const isLoggedIn = useSelector(state => state.isLoggedIn)

    const {name, category, rating} = useRoute().params

    useFocusEffect(useCallback(() => {
        const parent = navigation.dangerouslyGetParent()
        if (parent) {
            parent.setOptions({
                tabBarVisible: false
            })
        }
        return () => {
            if (parent) {
                parent.setOptions({
                    tabBarVisible: true
                })
            }
        }
    }), [navigation.dangerouslyGetParent])

    const handleCheckoutClick = () => {
        if (isLoggedIn) {
            navigation.navigate("Checkout")
        }
        else {
            navigation.navigate("Login")
        }
    }

    useEffect(() => {
        if (isVeg) {
            setItems(menuData.map(section => {
                const newSection = {...section}
                newSection.data = section.data.filter(it => it.isVeg)
                return newSection
            }))
        }
        else {
            console.log("All items selected")
            setItems(menuData)
        }
    }, [isVeg])

    return (
        <View style = {{flex: 1, backgroundColor: "#fff"}}>
            <BottomTab height = {MENU_HEGHT}>
                <View style = {styles.checkOutTab}>
                    <View>
                        <Text style = {styles.tabText}>{quant === 0? "No items in cart": `${quant} items`}</Text>
                        <Text style = {styles.tabText}>₹ {price}</Text>
                    </View>
                    <TouchableWithoutFeedback onPress = {handleCheckoutClick}>
                        <View style = {{flexDirection: "row", alignItems: "center"}}>
                            <View style = {{paddingRight: 6}}>
                                <Image source = {require("../assets/img/cart.png")} style = {{width: CART_SIZE, height: CART_SIZE}} />
                            </View>
                            <Text style = {{...styles.tabText, borderLeftColor: "#fff", paddingLeft: 6}}>View cart</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </BottomTab>
            <View style = {styles.menu}>
                <Image source = {require("../assets/img/hammenu.png")} />
                <Text>
                    Menu
                </Text>
            </View>
            <View style = {styles.imageCover}>
                <ImageBackground source = {require("../assets/img/pizza.png")} style = {{flex: 1}}>
                    <View style = {styles.cover}>
                        <TouchableWithoutFeedback onPress = {() => navigation.goBack()}>
                            <View style = {styles.backButton}>
                                <Image source = {require("../assets/img/back.png")} />
                            </View>
                        </TouchableWithoutFeedback>
                        <View style = {styles.heartButton}>
                            <Image source = {require("../assets/img/heart.png")} />
                        </View>
                    </View>
                </ImageBackground>
            </View>
            <View style = {styles.scrollContainer}>
                <ScrollView showsVerticalScrollIndicator = {false}>
                    <View>
                        <View style = {styles.header}>
                            <Text style = {styles.headerText}>{name}</Text>
                            <Ratings rating = {rating} size = "md" />
                        </View>
                        <View>
                            <Text style = {styles.categoryText}>
                                {category}
                            </Text>
                        </View>
                        <Reviews reviews = {1290} />
                        <View style = {styles.criteriaContainer}>
                            <View style = {styles.criteria}>
                                <Text style = {styles.criteriaText}>
                                    Veg Only
                                </Text>
                                <Switch 
                                    trackColor = {{false: "#767577", true: "#badc58"}}
                                    thumbColor = {isVeg? "#6ab04c": "#f4f3f4"}
                                    onValueChange = {() => setVeg(prev => !prev)}
                                    value = {isVeg}
                                />
                            </View>
                        </View>
                        <SectionList
                            sections = {items}
                            keyExtractor = {(item, i) => i}
                            renderItem = {({item}) => <MenuItem quant = {quant} setQuant = {setQuant} total = {price} setTotal = {setPrice} menuitem = {item} />}
                            renderSectionHeader = {({section: {title}}) => <Text style = {styles.sectionHeaderText}>{title}</Text>}
                            extraData = {isVeg}
                        />
                    </View>
                    <View style = {{height: MENU_HEGHT+20, width: "100%"}}>

                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default RestaurantMenu