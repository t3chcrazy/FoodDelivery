import React, {useState, useRef, useEffect, useCallback} from 'react'
import {View, Text, StyleSheet, useWindowDimensions, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, PermissionsAndroid, ActivityIndicator} from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import MapView, {Marker} from 'react-native-maps'
import { useFocusEffect } from '@react-navigation/native'
import { FRACTION, SEARCH_ICON } from '../config/Constants'
import IconButton from '../components/IconButton'
import Geocoder from 'react-native-geocoding'

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: "flex-end"
    },
    mapWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    details: {
        position: "relative",
        transform: [
            {
                translateY: -20
            }
        ]
    },
    status: {
        flex: 1,
        backgroundColor: "#3D037E",
        paddingHorizontal: 37,
        paddingTop: 30,
        flexDirection: "row",
        width: "100%",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        
    },
    statusText: {
        color: "#fff",
        fontSize: 12,
        marginLeft: 10
    },
    location: {
        padding: 20,
        borderRadius: 20,
        position: "absolute",
        top: 78,
        backgroundColor: "#fff",
        zIndex: 2,
        width: "100%",
    },
    delivery: {
        paddingBottom: 18,
        borderBottomWidth: 2,
        borderBottomColor: "#CECECE"
    },
    inputWrapper: {
        borderWidth: 1,
        borderColor: "#CECECE",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 18,
        height: 40,
    },
    input: {
        borderWidth: 0,
        color: "#CECECE"
    },
    myLocation: {
        marginTop: 9
    },
    currentLocation: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10
    },
    magnifyWrapper: {
        flex: 1,
        borderLeftWidth: 1,
        borderLeftColor: "#C6C6C6",
        height: "70%",
        alignItems: "center",
        justifyContent: "center"
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    confirmButton: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: "#2ecc71",
        borderRadius: 10,
        transform: [
            {
                translateY: -10
            }
        ]
    },
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    backButton: {
        position: "absolute",
        left: 15,
        top: 15,
        zIndex: 100
    }
})

function AutoDetect({navigation}) {
    // const [location, setLocation] = useState(null)
    const [isDetected, setDetected] = useState(false)
    const [location, setLocation] = useState(null)
    const {height: winHeight} = useWindowDimensions()
    const [coords, setCoords] = useState([])
    const mapRef = useRef()

    const handlePress = () => {
        requestAnimationFrame(() => {
            navigation.navigate("MainPage", {coordinates: coords})
        })
    }

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

    useEffect(() => {
        // TODO: Get proper API key after setting up billing account
        Geocoder.init("------")
        async function getPermissions() {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "Location access permission",
                    message: "Food delivery app needs to access your location",
                    buttonPositive: "Ok",
                    buttonNegative: "Cancel"
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                Geolocation.getCurrentPosition(info => {
                    console.log(info)
                    const {latitude, longitude} = info.coords
                    Geocoder.from(latitude, longitude)
                    .then(json => {
                        const addressComponent = json.results[0].address_components[0]
                        setLocation(addressComponent)
                    })
                    .catch(error => console.log(error))
                    setCoords([latitude, longitude])
                    setTimeout(() => {
                        mapRef.current.animateToRegion({
                            latitude: latitude,
                            longitude: longitude,
                            latitudeDelta: 1,
                            longitudeDelta: 1
                        })
                        setDetected(true)
                    }, 1000)
                },
                (error) => console.log("Error occured", error),
                {maximumAge: 15000,
                enableHighAccuracy: true, timeout: 15000})
            }
            else {
                await getPermissions()
            }
        }
        getPermissions()
    }, [])

    return (
        <View style = {styles.root}>
            {coords.length === 0?
            <View style = {styles.overlay}>
                <ActivityIndicator size = "large" color = "green" />
                <Text>
                    Getting coordinates...
                </Text>
            </View>: 
            <>
                <View style = {styles.backButton}>
                    <IconButton icon = {require("../assets/img/backWhite.png")} size = {40} hasMargin = {false} action = {() => navigation.goBack()} />
                </View>
                <View style = {{height: winHeight*FRACTION}}>
                    <View style = {styles.mapWrapper}>
                        <MapView
                            initialRegion = {{
                                latitude: coords[0],
                                longitude: coords[1],
                                latitudeDelta: 5,
                                longitudeDelta: 5
                            }}
                            style = {styles.map}
                            ref = {mapRef}
                        >
                            <Marker 
                                image = {require("../assets/img/pin.png")}
                                coordinate = {{latitude: coords[0], longitude: coords[1], latitudeDelta: 5, longitudeDelta: 5}}
                            />
                        </MapView>
                    </View>
                </View>
                <KeyboardAvoidingView>
                    <View style = {{height: (1-FRACTION)*winHeight, ...styles.details}}>
                        <View style = {styles.status}>
                            <Image source = {require("../assets/img/loading.png")} />
                            {isDetected?
                            <View style = {{flexDirection: "row", alignSelf: "flex-start", justifyContent: "space-between", width: "100%"}}>
                                <Text style = {styles.statusText}>
                                    Location detected!
                                </Text>
                                <TouchableOpacity onPress = {handlePress}>
                                    <View style = {styles.confirmButton}>
                                        <Text style = {{fontSize: 12, color: "#fff"}}>
                                            Confirm location
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>: 
                            <Text style = {styles.statusText}>
                                Auto detecting your location...
                            </Text>}
                        </View>
                        <View style = {{...styles.location, height: winHeight}}>
                            <View style = {styles.delivery}>
                                <Text style = {{fontSize: 15, marginBottom: 15}}>
                                    Select your delivery location
                                </Text>
                                <View style = {styles.inputWrapper}>
                                    <TextInput
                                        placeholder = "Search your location"
                                        style = {{flex: 8, marginLeft: 10}}
                                    />
                                    <View style = {styles.magnifyWrapper}>
                                        <Image source = {require("../assets/img/magnify.png")} style = {{width: SEARCH_ICON, height: SEARCH_ICON}} />
                                    </View>
                                </View>
                            </View>
                            <View style = {styles.myLocation}>
                                <Text>Your location</Text>
                                <View style = {styles.currentLocation}>
                                    <View style = {{flexDirection: "row", alignItems: "center"}}>
                                        <Image source = {require("../assets/img/check.png")} />
                                        <Text style = {{fontSize: 12, color: "#3D037E", marginLeft: 8}}>{location === null? "Loading...": location}</Text>
                                    </View>
                                    <TouchableOpacity onPress = {handlePress}>
                                        <View>
                                            <Text style = {{color: "red"}}>Change</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </>}
        </View>
    )
}

export default AutoDetect