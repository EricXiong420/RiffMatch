import { StyleSheet, View, KeyboardAvoidingView, Image, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react'
import { Text } from '@ui-kitten/components'
import LandingImage from "../../assets/login/landing-art.png"
import Logo from "../../assets/login/logo.png"
import auth from '@react-native-firebase/auth';

const Landing = () => {
    const navigation = useNavigation();

    return (
        <KeyboardAvoidingView
            styles={styles.container}
            behaviour="padding">
            <View style={styles.mainContainer}>
                <Image source={Logo} style={styles.logo}></Image>
                <Image source={LandingImage} style={styles.landingImage}></Image>

                <View style={styles.buttons}>
                    <Pressable onPress={() => navigation.navigate("RegisterPortal")} style={styles.registerButton}><Text style={styles.registerButtonText}>Register</Text></Pressable>
                    <Pressable onPress={() => navigation.navigate("LoginPortal")} style={styles.loginButton}><Text style={styles.loginButtonText}>Sign In</Text></Pressable>
                    <Text style={styles.policy}>By signing up you accept the Terms of Service and Privacy Policy.</Text>
                </View>
            </View>
        </KeyboardAvoidingView>
    );

}

export default Landing

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "white",
        height: "100%"
    },
    landingText: {
        textAlign: "center",
        fontSize: 25,
        padding: 20,
    },
    registerButtonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold'
    },
    loginButtonText: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
    logo: {
        marginTop: '20%',
        marginBottom: 40,
        width: 280,
        height: 200,
        alignSelf: 'center',
        resizeMode: 'contain'
    },
    landingImage: {
        marginBottom: 50,
        width: "115%",
        marginLeft: -30,
        height: 200,
        resizeMode: 'contain'
    },
    registerButton: {
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#36383b',
        padding: 18,
        borderRadius: 100,
        backgroundColor: "#36383b",
        marginTop: 50,
        width: "95%",
    },
    loginButton: {
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'black',
        padding: 18,
        borderRadius: 100,
        marginTop: 10,
        marginBottom: 10,
        width: "95%",
    },
    policy: {
        textAlign: "center",
        lineHeight: 25,
        fontSize: 10
    },
    loginInput: {
        marginBottom: 15
    },
    buttons: {
        position: 'absolute',
        bottom: '5%',
        alignSelf: 'center'
    }
})