import React, {useEffect, useRef, useState, useMemo} from 'react'
import {View, Text, ImageBackground, Image, StyleSheet, useWindowDimensions} from 'react-native'
import BoughtItem from '../components/BoughtItem'
import BottomTab from '../components/BottomTab'
import MapView, {Marker} from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'


const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#D2D7DC"
    },
    summary: {
        backgroundColor: "#FFF",
        zIndex: 2,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    status: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: "#3D037E",
        paddingVertical: 13,
        height: 150,
        alignItems: "flex-start",
        transform: [
            {
                translateY: -20
            }
        ]
    },
    boughtitems: {
        backgroundColor: "#FFF",
        paddingHorizontal: 28,
        paddingVertical: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    billing: {
        paddingHorizontal: 28,
        backgroundColor: "#FFF"
    },
    billingPanel: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 2.2
    },
    billingText: {
        color: "#6B5B7D",
        fontSize: 10
    },
    total: {
        borderBottomWidth: 1,
        borderBottomColor: "#CECECE",
        borderTopColor: "#CECECE",
        borderTopWidth: 1,
        paddingVertical: 9,
    },
    deliverytab: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    tabText: {
        fontSize: 10,
        color: "#D2D7DC"
    },
    driverIcon: {
        position: "absolute",
        top: 50,
        left: 50,
    },
    mapContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
})

const latlng = (lat, lng) => ({
    latitude: lat,
    longitude: lng
})

const latDelta = 0.05
const lngDelta = 0.04

function CartSummary({route, navigation}) {
    const {height: winHeight} = useWindowDimensions()
    const mapRef = useRef()
    const panelHeight = 0.55*winHeight
    const mapHeight = 0.45*winHeight
    const {latitude, longitude} = useMemo(() => route.params.latlng, [route.params])

    useEffect(() => {
        setTimeout(() => {
            mapRef.current.fitToCoordinates([latlng(latitude, longitude), latlng(latitude + latDelta, longitude - lngDelta)])
        }, 500)
    }, [])
    
    return (
        <View style = {styles.root}>
            <BottomTab height = {58}>
                <View style = {styles.deliverytab}>
                    <View style = {{flexDirection: "row"}}>
                        <Image source = {require("../assets/img/customericon.png")} />
                        <View style = {{marginLeft: 11.37}}>
                            <Text style = {styles.tabText}>DELIVERY AT</Text>
                            <Text style = {styles.tabText}>Rammurthy Nagar, Bangalore-560016</Text>
                        </View>
                    </View>
                    <View style = {{justifyContent: "center", alignItems: "center"}}>
                        <Text style = {styles.tabText}>
                            Change
                        </Text>
                    </View>
                </View>
            </BottomTab>
            <View style = {{height: mapHeight, position: "relative"}}>
                <View style = {styles.mapContainer}>
                    <MapView 
                        initialRegion = {{
                            latitude: latitude,
                            longitude: longitude,
                            latitudeDelta: 40,
                            longitudeDelta: 40
                        }}
                        style = {styles.map}
                        ref = {mapRef}
                    >
                        <Marker 
                            coordinate = {latlng(latitude, longitude)}
                            image = {require("../assets/img/pin.png")} 
                        />
                        <Marker
                            coordinate = {latlng(latitude + latDelta, longitude - lngDelta)}
                            image = {require("../assets/img/drivericon.png")}
                        />
                        {/* <MapViewDirections
                            origin = {latlng(latitude, longitude)}
                            destination = {latlng(latitude + latDelta, longitude - lngDelta)}
                            apikey = "xxx"
                            strokeColor = "#3D037E"
                        /> */}
                    </MapView>
                </View>
            </View>
            <View style = {{...styles.status, height: panelHeight}}>
                <Image source = {require("../assets/img/driver.png")} />
                <View style = {{width: 186}}>
                    <Text style = {{fontSize: 20, color: "#FFF"}}>
                        Yeeey! Your Order is on the way
                    </Text>
                </View>
            </View>
            <View style = {{...styles.summary, height: panelHeight, position: "relative", top: 64 - panelHeight}}>
                <View style = {styles.boughtitems}>
                    <BoughtItem name = "Paneer and Onion" isVeg = {true} price = {198} desc = "Creamy Paneer Onion" />
                    <BoughtItem name = "Chicken and Onion" isVeg = {false} price = {95} desc = "Juicy chicken and onion" />
                </View>
                <View style = {styles.billing}>
                    <Text style = {{fontSize: 15, color: "#2A2C3A"}}>
                        Bill Details
                    </Text>
                    <View style = {styles.billingPanel}>
                        <Text style = {styles.billingText}>
                            Item Total
                        </Text>
                        <Text style = {styles.billingText}>
                            ₹ 290
                        </Text>
                    </View>
                    <View style = {styles.billingPanel}>
                        <Text style = {{fontSize: 10, color: "#13C617"}}>
                            Delivery
                        </Text>
                        <Text style = {{fontSize: 10, color: "#13C617"}}>
                            FREE
                        </Text>
                    </View>
                    <View style = {[styles.total, styles.billingPanel]}>
                        <Text style = {styles.billingText}>
                            Taxes and Charges
                        </Text>
                        <Text style = {styles.billingText}>
                            ₹ 30.00
                        </Text>
                    </View>
                    <View style = {styles.billingPanel}>
                        <Text style = {{fontSize: 12, color: "#3D037E"}}>
                            Total Pay
                        </Text>
                        <Text style = {{fontSize: 12, color: "#3D037E"}}>
                            ₹ 330
                        </Text>
                    </View>
                    <View style = {{height: 58}}>

                    </View>
                </View>
            </View>
        </View>
    )
}

export default CartSummary