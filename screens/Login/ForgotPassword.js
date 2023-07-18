import {
  ActivityIndicator,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Pressable,
  Text,
  Image,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Logo from "../../assets/login/logo.png";
import ChevronBackButton from "../Misc/ChevronBackButton";
import GoogleButton from "./GoogleButton";
import FacebookButton from "./FacebookButton";
import { useAuth } from "../../contexts/AuthContext";

import auth from "@react-native-firebase/auth";

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");

  const handleForgotPassword = () => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert(
          "Password Reset",
          "A reset link has been sent to your email!",
          [
            {
              text: "OK",
              onPress: () => {
                navigation.navigate("Landing")
              },
            },
          ],
          { cancelable: false }
        );
      }).catch((errMsg) => {
        Alert.alert(
            "Error",
            "Please enter your email in the correct format!",
            [
              {
                text: "OK",
                onPress: () => {
                },
              },
            ],
            { cancelable: false }
          );
      });
  };

  return (
    <ScrollView styles={styles.container} behaviour="padding">
      <View style={styles.mainContainer}>
        <ChevronBackButton></ChevronBackButton>
        <Image source={Logo} style={styles.logo}></Image>

        <Text style={styles.welcomeText}>Reset Password!</Text>
        <TextInput
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          textContentType="emailAddress"
          style={styles.loginInput}
        ></TextInput>

          <Pressable
            onPress={handleForgotPassword}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.4 : 1,
              },
              styles.loginButton,
            ]}
          >
            <Text style={styles.loginButtonText}>Reset</Text>
          </Pressable>
      </View>
    </ScrollView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 15,
    backgroundColor: "white",
    minHeight: "100%",
  },
  backButton: {
    marginTop: 10,
  },
  buttonBack: {
    fontSize: 40,
  },
  welcomeText: {
    textAlign: "center",
    fontSize: 30,
    fontFamily: "CormorantGaramond-Bold",
    marginBottom: 40,
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
    textAlign: "right",
    alignSelf: "flex-end",
  },
  loginButtonText: {
    textAlign: "right",
    fontFamily: "CormorantGaramond-Bold",
    fontSize: 25,
    textDecorationLine: "underline",
  },
  invalidLoginButtonText: {
    textAlign: "right",
    fontFamily: "CormorantGaramond-Bold",
    fontSize: 25,
    textDecorationLine: "underline",
    color: "#bdbdbd",
  },
  otherSignInText: {
    fontFamily: "CormorantGaramond-Regular",
    textAlign: "center",
    fontSize: 20,
  },
  logo: {
    marginBottom: 40,
    width: 240,
    height: 160,
    alignSelf: "center",
    resizeMode: "contain",
  },
  errMsg: {
    color: "red",
    marginTop: 20,
    marginBottom: 20,
  },
  socialLogins: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  socialButtons: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    width: 52,
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
  },
  googleSignin: {
    width: 30,
    height: 30,
  },
  buttonGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  fpBtnText: {
    textAlign: "left",
    fontFamily: "CormorantGaramond-Bold",
    fontSize: 15,
    textDecorationLine: "underline",
  },
});
