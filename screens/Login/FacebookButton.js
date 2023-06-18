import { Pressable, Image, StyleSheet } from "react-native";
import auth from '@react-native-firebase/auth';
import { Settings, LoginManager, AccessToken } from 'react-native-fbsdk-next';

const FacebookButton = () => {
    async function onFacebookButtonPress() {
        Settings.initializeSDK();
        console.log("facebook!!!!")
        // Attempt login with permissions
        const result = await LoginManager.logInWithPermissions(["public_profile", "email"]);
        if (result.isCancelled) {
            return;
            //throw "User cancelled the login process";
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
    <Pressable style={styles.socialButtons} onPress={() => onFacebookButtonPress().then(() => console.log('Signed in with Facebook!'))}>
        <Image style={styles.facebookSignin} source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png' }}></Image>
    </Pressable>
    );
}

export default FacebookButton

const styles = StyleSheet.create({
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
    facebookSignin: {
        width: 30,
        height: 30,
    }
})