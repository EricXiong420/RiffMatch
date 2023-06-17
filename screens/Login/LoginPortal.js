import { ActivityIndicator, StyleSheet, View, KeyboardAvoidingView, Pressable, Text, Image, TextInput } from 'react-native'
import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import Logo from "../../assets/login/logo.png"
import auth from '@react-native-firebase/auth';
import {
    GoogleSignin,
} from '@react-native-google-signin/google-signin';
import { Settings, LoginManager, AccessToken } from 'react-native-fbsdk-next';
import ChevronBackButton from '../Misc/ChevronBackButton';

const LoginPortal = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});
    const [errMsg, setErrMsg] = useState('');

    const handleLogin = async () => {
        setLoading(true);
        await auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                setErrMsg('');
            })
            .catch(error => {
                // Displaying the same message for wrong password and user not found
                // because we don't want an attacker to be able to figure out what
                // email has been registered
                    if (error.code === "auth/invalid-email") {
                        setErrMsg("Invalid email address: " + email);
                    } else if (error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
                        setErrMsg("Incorrect email or password")
                    } else {
                        setErrMsg(error.message);
                    }
                }
            );
        setLoading(false);
        setEmail("");
        setPassword("");
    }

    useEffect(() => {
        GoogleSignin.configure({
            webClientId:
                '774297545230-2ac056bcn210ssqd6n38a3hoafgvurjq.apps.googleusercontent.com',
            offlineAccess: true,
        });
    }, []);

    async function onGoogleButtonPress() {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
    }

    async function onFacebookButtonPress() {
        Settings.initializeSDK();
        console.log("facebook!!!!")
        // Attempt login with permissions
        const result = await LoginManager.logInWithPermissions(["public_profile", "email"]);
        if (result.isCancelled) {
            throw "User cancelled the login process";
        }

        // Once signed in, get the users AccessToken
        const data = await AccessToken.getCurrentAccessToken();
        if (!data) {
            throw "Something went wrong obtaining access token";
        }

        // Create Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(facebookCredential);

    }

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

                {loading === true ? <ActivityIndicator /> 
                : (email !== "" && password !== "") ? 
                <Pressable onPress={handleLogin} style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </Pressable>
                : <Text style={[styles.loginButton, styles.invalidLoginButtonText]}>Login</Text>}
                <Text style={styles.errMsg}>{errMsg}</Text>
                <Text style={styles.otherSignInText}>- OR -</Text>
                <View style={styles.socialLogins}>
                    <Pressable style={styles.socialButtons} onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}>
                        <Image style={styles.googleSignin} source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png' }}></Image>
                    </Pressable>
                    <Pressable style={styles.socialButtons}>
                        <Image style={styles.googleSignin} source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/391px-Apple_logo_black.svg.png' }}></Image>
                    </Pressable>
                    <Pressable style={styles.socialButtons} onPress={() => onFacebookButtonPress().then(() => console.log('Signed in with Facebook!'))}>
                        <Image style={styles.googleSignin} source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png' }}></Image>
                    </Pressable>
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