import { StyleSheet, View, KeyboardAvoidingView, TextInput } from 'react-native'
import { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Input, Button, Text } from '@ui-kitten/components'
import { auth } from "../../firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';


const RegisterPortal = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [info, setInfo] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.navigate("Home");
      }
    })
    return unsubscribe;
  }, [])


  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user.email)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setInfo(errorMessage)
        // ..
      });
  }

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

<Text>Test</Text>
       
      </View>
    </KeyboardAvoidingView>
  )
}

export default RegisterPortal

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