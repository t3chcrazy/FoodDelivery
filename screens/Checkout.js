import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Image, TouchableWithoutFeedback, PermissionsAndroid} from 'react-native'
import {useRoute} from '@react-navigation/native'
import PaymentCard from '../components/PaymentCard'
import Geolocation from 'react-native-geolocation-service'

const paymentImages = [
    require("../assets/img/paytm.png"),
    require("../assets/img/phonepe.png"),
    require("../assets/img/paypal.png"),
    require("../assets/img/googlepay.png"),
    require("../assets/img/visa.png"),
    require("../assets/img/mastercard.png"),
    require("../assets/img/stripe.png"),
    require("../assets/img/payu.png")
]

const styles = StyleSheet.create({
    header: {
        paddingLeft: 20,
        paddingTop: 38,
        alignSelf: "flex-start"
    },
    processing: {
        flex: 2,
        alignItems: "center",
        width: 140,
        marginTop: 20
    },
    processingText: {
        color: "#2A2C3A",
        fontSize: 20,
        textAlign: "center",
        fontWeight: "bold",
        marginTop: 34
    },
    checkoutImage: {
        flex: 3,
    },
    payment: {
        flex: 3,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 30
    },
    confirmButton: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#3D037E",
        alignSelf: "flex-end",
        marginBottom: 10,
        marginRight: 10,
    }
})

function Checkout({navigation}) {
    const [selected, setSelected] = useState(0)
    const route = useRoute()

    const handlePress = i => {
        setSelected(i)
    }
    return (
        <View style = {{flex: 1, alignItems: "center"}}>
            <TouchableWithoutFeedback onPress = {() => navigation.goBack()}>
                <View style = {styles.header}>
                    <Image source = {require("../assets/img/back.png")} />
                </View>
            </TouchableWithoutFeedback>
            <View style = {styles.processing}>
                <Image source = {require("../assets/img/processing.png")} />
                <Text style = {styles.processingText}>
                    Processing Your Payment
                </Text>
            </View>
            <View style = {styles.checkoutImage}>
                <Image source = {require("../assets/img/checkout.png")} />
            </View>
            <View style = {styles.payment}>
                {paymentImages.map((p, i) => 
                <PaymentCard key = {i} image = {p} isSelected = {selected === i} action = {() => handlePress(i)} />
                )}
            </View>
            <TouchableWithoutFeedback onPress = {() => navigation.navigate("Summary", {latlng: {latitude: route.params.coordinates[0], longitude: route.params.coordinates[1]}})}>
                <View style = {styles.confirmButton}>
                    <Text style = {{color: "#3D037E"}}>Confirm Payment</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default Checkout