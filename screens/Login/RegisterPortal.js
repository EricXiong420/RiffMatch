import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TextInput,
  Image,
  Text,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../contexts/AuthContext";
import ChevronBackButton from "../Misc/ChevronBackButton";
import Logo from "../../assets/login/logo.png";
import FacebookButton from "./FacebookButton.js";
import GoogleButton from "./GoogleButton";

const RegisterPortal = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cfmPassword, setCfmPassword] = useState("");
  const navigation = useNavigation();

  const { handleSignup, loading, errMsg, user } = useAuth();
  console.log(user);

  return (
    <KeyboardAvoidingView styles={styles.container} behaviour="padding">
      <View style={styles.mainContainer}>
        <ChevronBackButton></ChevronBackButton>
        <Image source={Logo} style={styles.logo}></Image>

        <Text style={styles.welcomeText}>Welcome!</Text>

        <TextInput
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          textContentType="emailAddress"
          style={styles.loginInput}
        ></TextInput>
        <TextInput
          autoCapitalize="none"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          textContentType="password"
          style={styles.loginInput}
        ></TextInput>
        <TextInput
          autoCapitalize="none"
          secureTextEntry={true}
          value={cfmPassword}
          onChangeText={setCfmPassword}
          placeholder="Confirm Password"
          textContentType="password"
          style={styles.loginInput}
        ></TextInput>

        {loading === true ? ( // logic for greying out Register button, and loading
          <ActivityIndicator />
        ) : email !== "" && password !== "" && cfmPassword !== "" ? (
          <Pressable onPress={() => handleSignup(email, password, cfmPassword)} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Register</Text>
          </Pressable>
        ) : (
          <Text style={[styles.loginButton, styles.invalidLoginButtonText]}>
            Register
          </Text>
        )}
        <Text style={styles.errMsg}>{errMsg}</Text>
        <Text style={styles.otherSignInText}>- OR -</Text>
        <View style={styles.socialLogins}>
          <GoogleButton />
          <Pressable style={styles.socialButtons}>
            <Image
              style={styles.googleSignin}
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/391px-Apple_logo_black.svg.png",
              }}
            ></Image>
          </Pressable>
          <FacebookButton />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterPortal;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 15,
  },
  loginInput: {
    marginBottom: 15,
  },
  loginButton: {
    marginTop: 20,
  },
  buttonBack: {
    fontSize: 40,
  },
  welcomeText: {
    textAlign: "center",
    fontSize: 30,
    fontFamily: "Cormorant Garamond",
    fontWeight: "bold",
    marginBottom: 40,
    marginTop: -20,
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
  },
  loginButtonText: {
    textAlign: "right",
    fontFamily: "Cormorant Garamond",
    fontSize: 25,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  invalidLoginButtonText: {
    textAlign: "right",
    fontFamily: "Cormorant Garamond",
    fontSize: 25,
    fontWeight: "600",
    textDecorationLine: "underline",
    color: "#bdbdbd",
  },
  otherSignInText: {
    fontFamily: "Cormorant Garamond",
    textAlign: "center",
    fontSize: 20,
  },
  logo: {
    marginBottom: 40,
    width: 280,
    height: 200,
    marginLeft: 50,
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
});
