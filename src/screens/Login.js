import React, {useState, useEffect} from 'react'
import {View, Text, TextInput, ImageBackground, StyleSheet, useWindowDimensions, TouchableWithoutFeedback, KeyboardAvoidingView, PermissionsAndroid, BackHandler, Alert, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import { loginUser } from '../store/login/loginActions'
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
    },
    newUser: {
        alignSelf: "flex-end",
        marginVertical: 10
    }
})


function Login({navigation, isLoggedIn, error, loginUser}) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {height} = useWindowDimensions()

    useFocusEffect(() => {
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
    }, [])

    useEffect(() => {
        if (isLoggedIn) {
            navigation.navigate("AutoDetect")
        }
    }, [isLoggedIn])
    
    const handleLogin = () => {
        loginUser(email, password)
    }

    const redirectToRegister = () => {
        navigation.navigate("Register")
    }

    return (
        <View style = {{flex: 1}}>
            <ImageBackground source = {require("../assets/img/loginBackground.jpg")} style = {styles.imageCover}>
                <KeyboardAvoidingView behavior = "height">
                    <View style = {{...styles.form, height: height/2}}>
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
                                autoFocus = {true}
                                autoCapitalize = "none"
                            />
                            {error? 
                            <Text style = {{color: "red", fontSize: 12, alignSelf: "flex-start", fontWeight: "bold"}}>
                                Invalid email
                            </Text>: null}
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
                        <TouchableOpacity onPress = {redirectToRegister}>
                            <View style = {styles.newUser}>
                                <Text style = {{color: "#fff", textDecorationLine: "underline"}}>
                                    New user? Register here!
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableWithoutFeedback onPress = {handleLogin}>
                            <View style = {styles.button}>
                                <Text style = {styles.buttonText}>
                                    Login
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </KeyboardAvoidingView>
            </ImageBackground>
        </View>
    )
}

const mapStateToProps = state => ({
    isLoggedIn: state.isLoggedIn,
    error: state.error
})

const mapDispatchToProps = dispatch => ({
    loginUser: (email, password) => dispatch(loginUser(email, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)