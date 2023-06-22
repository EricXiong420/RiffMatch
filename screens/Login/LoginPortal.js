import { ActivityIndicator, StyleSheet, View, KeyboardAvoidingView, Pressable, Text, Image, TextInput } from 'react-native'
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
        <KeyboardAvoidingView
            styles={styles.container}
            behaviour="padding">
            <View style={styles.mainContainer}>
                <ChevronBackButton></ChevronBackButton>
                <Image source={Logo} style={styles.logo}></Image>

                <Text style={styles.welcomeText}>Welcome Back!</Text>
                <TextInput autoCapitalize='none' value={email} onChangeText={setEmail} placeholder='Email' textContentType='emailAddress' style={styles.loginInput}></TextInput>
                <TextInput autoCapitalize='none' secureTextEntry={true} value={password} onChangeText={setPassword} placeholder='Password' textContentType='password' style={styles.loginInput}></TextInput>

                {loading === true 
                ? <ActivityIndicator /> 
                : <Pressable onPress={() => handleLogin(email, password)}
                    disabled={incompleteForm}
                    style={({pressed}) => [{
                        opacity: pressed ? 0.4 : 1
                    }, styles.loginButton]}>
                    <Text style={incompleteForm ? styles.invalidLoginButtonText : styles.loginButtonText}>Login</Text>
                </Pressable>
                }
                <Text style={styles.errMsg}>{errMsg}</Text>
                <Text style={styles.otherSignInText}>- OR -</Text>
                <View style={styles.socialLogins}>
                    <GoogleButton />
                    <Pressable style={styles.socialButtons}>
                        <Image style={styles.googleSignin} source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/391px-Apple_logo_black.svg.png' }}></Image>
                    </Pressable>
                    <FacebookButton />
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default LoginPortal

const styles = StyleSheet.create({
    mainContainer: {
        padding: 15,
        backgroundColor: "white",
        height: "100%"
    },
    backButton: {
        marginTop: 50
    },
    buttonBack: {
        fontSize: 40
    },
    welcomeText: {
        textAlign: 'center',
        fontSize: 30,
        fontFamily: "Cormorant Garamond",
        fontWeight: "bold",
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
        textAlign: 'right'
    },
    loginButtonText: {
        textAlign: 'right',
        fontFamily: "Cormorant Garamond",
        fontSize: 25,
        fontWeight: '600',
        textDecorationLine: 'underline'
    },
    invalidLoginButtonText: {
        textAlign: 'right',
        fontFamily: "Cormorant Garamond",
        fontSize: 25,
        fontWeight: '600',
        textDecorationLine: 'underline',
        color: "#bdbdbd"
    },
    otherSignInText: {
        fontFamily: "Cormorant Garamond",
        textAlign: 'center',
        fontSize: 20
    },
    logo: {
        marginBottom: 40,
        width: 280,
        height: 200,
        marginLeft: 50,
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
    }
})