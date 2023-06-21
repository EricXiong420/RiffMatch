import { StyleSheet, Text, View } from 'react-native'
import { useState, useEffect } from 'react'
import { Button } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/core';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useAuth } from '../contexts/AuthContext';


const Home = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({});
  const [initializing, setInitializing] = useState(true);

  const { user, firstTimeUser } = useAuth();

  useEffect(() => {
    if (user) {
      firestore().collection('users').doc(user.email)
        .onSnapshot(document => {
          if (!document.exists) {
            navigation.navigate("CreateProfileBasic");
          } else {
            setUserData({ ...document.data(), email: user.email });
          }
        });
    }
    if (initializing) setInitializing(false);
  }, []);

  const handleSignout = () => {
    auth()
      .signOut()
      // .then(() => navigation.navigate("Landing"));
  }

  return (
    <View>
      <Text>Welcome: {userData.firstName} {userData.lastName}</Text>
      <Text>Gender: {userData.gender}</Text>
      <Text>Email: {userData.email}</Text>
      <Text>{String(firstTimeUser === null)} </Text>
      <Button onPress={handleSignout}>Signout</Button>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})