import { StyleSheet, View, KeyboardAvoidingView, TextInput } from 'react-native'
import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Button } from '@ui-kitten/components'
import auth from '@react-native-firebase/auth';
import {
    GoogleSignin,
    GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

const LoginPortal = () => {
    const navigation = useNavigation();

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

    return (
        <KeyboardAvoidingView
            styles={styles.container}
            behaviour="padding">
            <View style={styles.mainContainer}>

                {/* <Button onPress={googleAuth} style={styles.loginButton}>Google</Button> */}
                <GoogleSigninButton onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}></GoogleSigninButton>

                <Button onPress={() => navigation.navigate("Login")} style={styles.loginButton}>Email</Button>
            </View>
        </KeyboardAvoidingView>
    )
}

export default LoginPortal

const styles = StyleSheet.create({
    mainContainer: {
        padding: 15
    },
    title: {
        marginTop: 20,
        marginBottom: 40
    },
    loginInput: {
        marginBottom: 15
    },
    loginButton: {
        marginTop: 20
    }
})