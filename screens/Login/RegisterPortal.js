import { StyleSheet, View, KeyboardAvoidingView, TextInput } from 'react-native'
import { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Input, Button, Text, Select, SelectItem, IndexPath } from '@ui-kitten/components'
import { auth, app } from "../../firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, getFirestore, setDoc } from 'firebase/firestore';

const genders = [
  'male',
  'female',
  'other',
];

const RegisterPortal = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState(new IndexPath(0));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cfmPassword, setCfmPassword] = useState('');
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
    if (password != cfmPassword) {
      setInfo("Passwords do not match!");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          // Signed in 
          const db = getFirestore(app)

          const docRef = await setDoc(doc(db, "users", email.toLowerCase()), {
            first_name: firstName,
            last_name: lastName,
            gender: genders[gender - 1],
            created: new Date()
          }).catch(err => {
            console.error(err)
          });
          console.log("Document written with ID: ", docRef.id);

          const user = userCredential.user;
          console.log(user.email)

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setInfo(errorMessage)
          // ..
        });
    }

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
          label='First Name'
          placeholder='First Name'
          value={firstName}
          style={styles.loginInput}
          onChangeText={nextValue => setFirstName(nextValue)}
        />
        <Input
          label='Last Name'
          placeholder='Last Name'
          value={lastName}
          style={styles.loginInput}
          onChangeText={nextValue => setLastName(nextValue)}
        />
        <Input
          label='Email'
          placeholder='Email'
          value={email}
          style={styles.loginInput}
          onChangeText={nextValue => setEmail(nextValue)}
        />
        <Select
          selectedIndex={gender}
          onSelect={index => setGender(index)}
          value={genders[gender - 1]}
          label="Gender"
        >
          <SelectItem title='Male' />
          <SelectItem title='Female' />
          <SelectItem title='Other' />
        </Select>

        <Input
          placeholder='Password'
          label='Password'
          value={password}
          secureTextEntry={true}
          style={styles.loginInput}
          onChangeText={nextValue => setPassword(nextValue)}
        />
        <Input
          placeholder='Confirm Password'
          label='Confirm Password'
          value={cfmPassword}
          secureTextEntry={true}
          style={styles.loginInput}
          onChangeText={nextValue => setCfmPassword(nextValue)}
        />
        <Text status='danger'>{info}</Text>

        <Button onPress={handleSignup}>Register</Button>
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