import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Settings, LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { GoogleSignin, statusCodes, } from "@react-native-google-signin/google-signin";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [firstTimeUser, setFirstTimeUser] = useState(false);
    const [loadingInitial, setLoadingInitial] = useState(true);

    useEffect(() => {
        setLoadingInitial(true);
        const subscriber = auth().onAuthStateChanged((user) => {
            setUser(user);
            firestore().collection("users").doc(user?.email).get().then(document => setFirstTimeUser(!document.exists));
            setLoading(false);
            setLoadingInitial(false);
        })
        return subscriber;
    }, [])

    const handleSignup = async (email, password, cfmPassword) => {
      setLoading(true);
      if (password != cfmPassword) {
        setErrMsg("Passwords do not match!");
      } else {
        // Attempt to create account in firebase auth
        await auth()
          .createUserWithEmailAndPassword(email, password)
          .catch((error) => {
            if (error.code === "auth/invalid-email") {
              setErrMsg("Invalid email address: " + email);
            } else if (error.code === "auth/email-already-in-use") {
              setErrMsg("Email already in use");
            } else if (error.code === "auth/weak-password") {
              setErrMsg("The password is too weak");
            } else {
              setErrMsg(error.message);
            }
          });
      }
      setLoading(false);
    };

    const handleLogin = async (email, password) => {
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
    }

    async function onFacebookButtonPress() {
        setLoading(true);
        Settings.initializeSDK();
        // Attempt login with permissions
        const result = await LoginManager.logInWithPermissions(["public_profile", "email"]);
        if (result.isCancelled) {
            setLoading(false);
            return;
            //throw "User cancelled the login process";
        }

        // Once signed in, get the users AccessToken
        const data = await AccessToken.getCurrentAccessToken();
        if (!data) {
            setLoading(false);
            throw "Something went wrong obtaining access token";
        }

        // Create Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(facebookCredential);

    }

    useEffect(() => {
      GoogleSignin.configure({
        webClientId:
          "774297545230-2ac056bcn210ssqd6n38a3hoafgvurjq.apps.googleusercontent.com",
        offlineAccess: true,
      });
    }, []);
  
    async function onGoogleButtonPress() {
      setLoading(true);
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      try {
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();
  
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
        setLoading(false);
        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
      } catch (error) {
        setLoading(false);
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          return;
          // user cancelled the login flow
        } else {
          console.warn(error);
        }
      }
    }

    const memoedValue = useMemo(() => ({
        user,
        loading,
        errMsg,
        firstTimeUser,
        setFirstTimeUser,
        handleSignup,
        onFacebookButtonPress,
        onGoogleButtonPress,
        handleLogin
    }), [user, loading, errMsg, firstTimeUser]);

    return (
        <AuthContext.Provider value={memoedValue}>
            {!loadingInitial && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
  return useContext(AuthContext);
}