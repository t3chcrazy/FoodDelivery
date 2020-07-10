import React, {useState} from 'react'
import {View, Text, TextInput, ImageBackground, StyleSheet, useWindowDimensions, TouchableWithoutFeedback, KeyboardAvoidingView, PermissionsAndroid, BackHandler, Alert} from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

const styles = StyleSheet.create({
    imageCover: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        paddingTop: 97
    },
    input: {
        paddingVertical: 10,
        backgroundColor: "transparent",
        height: 34,
        width: "100%",
        color: "#D2D7DC",
        borderBottomWidth: 1,
        borderBottomColor: "#D2D7DC"
    },
    formControl: {
        justifyContent: "space-between",
        marginBottom: 28,
        width: "100%",
        alignItems: "center",
        paddingHorizontal: 10
    },
    form: {
        alignItems: "center",
        paddingHorizontal: 48
    },
    formText: {
        color: "#D2D7DC",
        fontSize: 10,
        marginBottom: 4,
        alignSelf: "flex-start"
    },
    button: {
        borderRadius: 4,
        borderColor: "#fff",
        borderWidth: 1,
        paddingHorizontal: 39,
        paddingVertical: 11,
        alignSelf: "center"
    },
    buttonText: {
        fontSize: 12,
        color: "#fff"
    }
})


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

function Register({navigation}) {
    const [name, setName] = useState()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {height} = useWindowDimensions()

    useFocusEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBack)
        return () => BackHandler.removeEventListener("hardwareBackPress", handleBack)
    }, [])

    const handleRegister = () => {
        if (name && email && password) {
            navigation.navigate("Login")
        }
    }

    return (
        <View style = {{flex: 1}}>
            <ImageBackground source = {require("../assets/img/loginBackground.jpg")} style = {styles.imageCover}>
                <KeyboardAvoidingView behavior = "height">
                    <View style = {{...styles.form, height: height/2}}>
                        <View style = {styles.formControl}>
                            <Text style = {styles.formText}>Name</Text>
                            <TextInput 
                                value = {name} 
                                onChangeText = {text => setName(text)} 
                                placeholder = "Enter your name" 
                                keyboardType = "name-phone-pad" 
                                placeholderTextColor = "#FFF"
                                textContentType = "name"
                                style = {styles.input}
                                autoFocus = {true}
                            />
                        </View>
                        <View style = {styles.formControl}>
                            <Text style = {styles.formText}>Email</Text>
                            <TextInput 
                                value = {email} 
                                onChangeText = {text => setEmail(text)} 
                                placeholder = "Enter your email" 
                                keyboardType = "email-address" 
                                placeholderTextColor = "#FFF"
                                textContentType = "emailAddress"
                                style = {styles.input}
                            />
                        </View>
                        <View style = {styles.formControl}>
                            <Text style = {styles.formText}>Password</Text>
                            <TextInput
                                value = {password}
                                onChangeText = {text => setPassword(text)}
                                secureTextEntry = {true}
                                textContentType = "password"
                                placeholderTextColor = "#FFF"
                                placeholder = "Enter your password"
                                style = {styles.input}
                            />
                        </View>
                        <TouchableWithoutFeedback onPress = {handleRegister}>
                            <View style = {styles.button}>
                                <Text style = {styles.buttonText}>
                                    Register
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </KeyboardAvoidingView>
            </ImageBackground>
        </View>
    )
}

export default Register