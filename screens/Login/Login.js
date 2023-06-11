import { StyleSheet, View, KeyboardAvoidingView, TextInput } from 'react-native'
import { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Input, Button, Text } from '@ui-kitten/components'
import auth from '@react-native-firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [info, setInfo] = useState('');
  const navigation = useNavigation();
  const [initializing, setInitializing] = useState(true);

  function onAuthStateChanged(user) {
    if (user) {
      navigation.navigate("Home")
    }
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; 
  }, []);

  if (initializing) return null;

  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setInfo('');
        navigation.navigate("Home");
      })
      .catch(error => {
        setInfo(error.message);
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

        <Input
          label='Email'
          placeholder='Email'
          value={email}
          style={styles.loginInput}
          onChangeText={nextValue => setEmail(nextValue)}
        />
        <Input
          placeholder='Password'
          label='Password'
          value={password}
          secureTextEntry={true}
          style={styles.loginInput}
          onChangeText={nextValue => setPassword(nextValue)}
        />
        <Text status='danger'>{info}</Text>
        <Button onPress={handleLogin} style={styles.loginButton}>Login</Button>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Login

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