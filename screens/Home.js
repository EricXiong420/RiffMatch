import { StyleSheet, Text, View } from 'react-native'
import { useState, useEffect } from 'react'
import { Button } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/core';
import { auth, app } from "../firebase"
import { getDoc, doc, getFirestore } from 'firebase/firestore';


const Home = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({});
  const [ready, setReady] = useState(false);

  const getUserData = async () => {
    const db = getFirestore(app);
    const docRef = doc(db, "users", auth.currentUser?.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setUserData(docSnap.data())
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  useEffect(() => {
    getUserData();
  }, [])


  const handleSignout = () => {
    auth.signOut().then(() => {
      navigation.navigate("Landing");
    })
  }

  return (
    <View>
      <Text>Welcome: {userData.first_name} {userData.last_name}</Text>
      <Text>Gender: {userData.gender}</Text>
      <Text>Email: {auth.currentUser?.email}</Text>
      <Button onPress={handleSignout}>Signout</Button>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})