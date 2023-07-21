import { ActivityIndicator, StyleSheet, View, KeyboardAvoidingView, Pressable, Text, Image, TextInput, ScrollView } from 'react-native'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import Logo from "../../assets/login/logo.png"
import ChevronBackButton from '../Misc/ChevronBackButton';
import GoogleButton from './GoogleButton';
import FacebookButton from './FacebookButton';
import { useAuth } from '../../contexts/AuthContext';

const LoginPortal = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { handleLogin, errMsg, loading } = useAuth();

    const incompleteForm = (email === "" || password === "");

    return (
        <ScrollView
            styles={styles.container}
            behaviour="padding">
            <View style={styles.mainContainer}>
                <ChevronBackButton></ChevronBackButton>
                <Image source={Logo} style={styles.logo}></Image>

                <Text style={styles.welcomeText}>Welcome Back!</Text>
                <TextInput testID='loginEmailInput' autoCapitalize='none' value={email} onChangeText={setEmail} placeholder='Email' textContentType='emailAddress' style={styles.loginInput}></TextInput>
                <TextInput testID='loginPasswordInput' autoCapitalize='none' secureTextEntry={true} value={password} onChangeText={setPassword} placeholder='Password' textContentType='password' style={styles.loginInput}></TextInput>

                <View style={styles.buttonGroup}>
                    <Pressable style={{flex: 1}} onPress={() => navigation.navigate("ForgotPassword")}>
                        <Text style={styles.fpBtnText}>Forgot Password?</Text>
                    </Pressable>
                {loading === true 
                ? <ActivityIndicator /> 
                : <Pressable testID='loginButton' onPress={() => handleLogin(email, password)}
                    disabled={incompleteForm}
                    style={({pressed}) => [{
                        opacity: pressed ? 0.4 : 1
                    }, styles.loginButton]}>
                    <Text style={incompleteForm ? styles.invalidLoginButtonText : styles.loginButtonText}>Login</Text>
                </Pressable>
                }
                </View>
                
                <Text testID='loginErrorText' style={styles.errMsg}>{errMsg}</Text>
                <Text style={styles.otherSignInText}>- OR -</Text>
                <View style={styles.socialLogins}>
                    <GoogleButton />
                    <Pressable style={styles.socialButtons}>
                        <Image style={styles.googleSignin} source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/391px-Apple_logo_black.svg.png' }}></Image>
                    </Pressable>
                    <FacebookButton />
                </View>
            </View>
        </ScrollView>
    )
}

export default LoginPortal

const styles = StyleSheet.create({
    mainContainer: {
        padding: 15,
        backgroundColor: "white",
        minHeight: "100%",
    },
    backButton: {
        marginTop: 10
    },
    buttonBack: {
        fontSize: 40
    },
    welcomeText: {
        textAlign: 'center',
        fontSize: 30,
        fontFamily: "CormorantGaramond-Bold",
        marginBottom: 40
    },
    loginInput: {
        marginBottom: 15,
        borderWidth: 2,
        borderColor: "#36383b",
        fontWeight: "bold",
        fontSize: 16,
        height: 50,
        paddingLeft: 20,
        borderRadius: 10,
    },
    loginButton: {
        marginTop: 5,
        textAlign: 'right',
        alignSelf: 'flex-end'
    },
    loginButtonText: {
        textAlign: 'right',
        fontFamily: "CormorantGaramond-Bold",
        fontSize: 25,
        textDecorationLine: 'underline',
    },
    invalidLoginButtonText: {
        textAlign: 'right',
        fontFamily: "CormorantGaramond-Bold",
        fontSize: 25,
        textDecorationLine: 'underline',
        color: "#bdbdbd"
    },
    otherSignInText: {
        fontFamily: "CormorantGaramond-Regular",
        textAlign: 'center',
        fontSize: 20
    },
    logo: {
        marginBottom: 40,
        width: 240,
        height: 160,
        alignSelf: 'center',
        resizeMode: 'contain'
    },
    errMsg: {
        color: "red",
        marginTop: 20,
        marginBottom: 20
    },
    socialLogins: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    socialButtons: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        width: 52,
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'center'
    },
    googleSignin: {
        width: 30,
        height: 30,
    },
    buttonGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    fpBtnText: {
        textAlign: 'left',
        fontFamily: "CormorantGaramond-Bold",
        fontSize: 15,
        textDecorationLine: 'underline'
    }
})