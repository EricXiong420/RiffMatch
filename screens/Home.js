import { StyleSheet, Text, View } from 'react-native'
import { useState, useEffect } from 'react'
import { Button } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/core';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({});
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = async (user) => {
    
    if (user) {
      const data = await firestore().collection('users').doc(user.email).get();
      AsyncStorage.setItem('@currentUserEmail', user.email)
      if (data._data.firstName == "") {
        navigation.navigate("CreateProfileBasic")
      }
      setUserData({ ...data._data, email: user.email })
    }
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const handleSignout = () => {
    auth()
      .signOut()
      // .then(() => navigation.navigate("Landing"));
  }

  return (
    <View>
      <Text>Welcome: {userData.first_name} {userData.last_name}</Text>
      <Text>Gender: {userData.gender}</Text>
      <Text>Email: {userData.email}</Text>
      <Button onPress={handleSignout}>Signout</Button>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})