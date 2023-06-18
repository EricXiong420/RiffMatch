import { Pressable, Image, StyleSheet } from "react-native";
import { useEffect } from "react";
import auth from "@react-native-firebase/auth";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

const GoogleButton = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "774297545230-2ac056bcn210ssqd6n38a3hoafgvurjq.apps.googleusercontent.com",
      offlineAccess: true,
    });
  }, []);

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    try {
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        return;
        // user cancelled the login flow
      } else {
        console.warn(error);
      }
    }
  }

  return (
    <Pressable style={styles.socialButtons} onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}>
        <Image style={styles.googleSignin} source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png' }}></Image>
    </Pressable>
  );
};

export default GoogleButton

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
    googleSignin: {
        width: 30,
        height: 30,
    }
})