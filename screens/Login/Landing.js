import { StyleSheet, View, KeyboardAvoidingView, Image, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react'
import { Text } from '@ui-kitten/components'
import LandingImage from "../../assets/landing.png"
import auth from '@react-native-firebase/auth';

const Landing = () => {
    const navigation = useNavigation();

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    function onAuthStateChanged(user) {
        setUser(user);
        if (user) {
            navigation.navigate("Home")
        }
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    if (initializing) return null;

    if (!user) {
        return (
            <KeyboardAvoidingView
                styles={styles.container}
                behaviour="padding">
                <View style={styles.mainContainer}>
                    <Text
                        style={styles.title}
                        category='h2'
                    >
                        RiffMatch
                    </Text>
                    <Image source={LandingImage} style={styles.landingImage}></Image>
                    <Text
                        style={styles.landingText}>
                        Let's link you up with musicians in the area!
                    </Text>
                    <View>
                        <Pressable onPress={() => navigation.navigate("RegisterPortal")} style={styles.registerButton}><Text style={styles.registerButtonText}>Register</Text></Pressable>
                        <Pressable onPress={() => navigation.navigate("LoginPortal")} style={styles.loginButton}><Text style={styles.loginButtonText}>Sign In</Text></Pressable>
                        <Text style={styles.policy}>By signing up you accept the Terms of Service and Privacy Policy.</Text>
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

export default Landing

const styles = StyleSheet.create({
    mainContainer: {
        padding: 15,
        backgroundColor: "white",
        height: "100%"
    },
    title: {
        marginTop: 20,
        marginBottom: 40,
        textAlign: "center",
        marginTop: 100
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
    landingImage: {
        marginTop: 50,
        marginBottom: 50,
        width: 200,
        height: 200,
        marginLeft: 80,
        resizeMode: 'contain'
    },
    registerButton: {
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#004cff',
        padding: 18,
        borderRadius: 100,
        backgroundColor: "#004cff",
        marginTop: 50,
    },
    loginButton: {
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'black',
        padding: 18,
        borderRadius: 100,
        marginTop: 10,
        marginBottom: 10
    },
    policy: {
        textAlign: "center",
        lineHeight: 25,
        fontSize: 10
    },
    loginInput: {
        marginBottom: 15
    },
})